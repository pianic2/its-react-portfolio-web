import { z } from 'zod'
export const supportedLanguages = ['it', 'en'] as const
export const publicPageIds = [
  'home',
  'projects',
  'projectDetail',
  'skills',
  'method',
  'profile',
  'contact',
  'privacy',
] as const

export const languageSchema = z.enum(supportedLanguages)
export const pageIdSchema = z.enum(publicPageIds)
export const projectVisualVariantSchema = z.enum(['signal-yellow', 'studio-pink', 'electric-cyan'])
export const projectOriginSchema = z.enum(['personal-long-term', 'its-training'])
export const evidenceTypeSchema = z.enum([
  'repository',
  'pull-request',
  'documentation',
  'test',
  'demo',
  'screenshot',
  'report',
])

const stableIdSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a stable kebab-case identifier.')
const slugSchema = stableIdSchema
const httpsUrlSchema = z
  .string()
  .url()
  .refine((value) => new URL(value).protocol === 'https:', 'External URLs must use HTTPS.')

export const capabilitySchema = z.object({
  id: stableIdSchema,
  category: z.enum([
    'frontend',
    'backend',
    'architecture',
    'delivery',
    'quality',
    'security',
    'product',
    'embedded',
  ]),
})

export const localizedCapabilitySchema = z.object({
  capabilityId: stableIdSchema,
  label: z.string().min(1),
  description: z.string().min(1).optional(),
})

export const externalLinkSchema = z.object({
  id: stableIdSchema,
  kind: z.enum(['repository', 'live-demo', 'documentation', 'jira', 'other']),
  url: httpsUrlSchema,
})

export const localizedExternalLinkSchema = z.object({
  linkId: stableIdSchema,
  label: z.string().min(1),
  accessibilityLabel: z.string().min(1).optional(),
})

export const assetReferenceSchema = z
  .object({
    id: stableIdSchema,
    src: z.string().min(1),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    provenance: z.enum([
      'repository',
      'project-screenshot',
      'original',
      'generated',
      'third-party',
    ]),
    credit: z.string().min(1).optional(),
  })
  .superRefine((asset, context) => {
    if (asset.provenance === 'third-party' && !asset.credit) {
      context.addIssue({
        code: 'custom',
        path: ['credit'],
        message: 'Third-party assets require a credit.',
      })
    }
  })

export const localizedAssetSchema = z
  .object({
    assetId: stableIdSchema,
    alt: z.string(),
    decorative: z.boolean().default(false),
  })
  .superRefine((asset, context) => {
    if (asset.decorative && asset.alt !== '') {
      context.addIssue({
        code: 'custom',
        path: ['alt'],
        message: 'Decorative assets must use an empty alt value.',
      })
    }
    if (!asset.decorative && asset.alt.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['alt'],
        message: 'Informative assets require alternative text.',
      })
    }
  })

export const evidenceSchema = z
  .object({
    id: stableIdSchema,
    type: evidenceTypeSchema,
    url: httpsUrlSchema.optional(),
    assetId: stableIdSchema.optional(),
  })
  .refine((evidence) => evidence.url !== undefined || evidence.assetId !== undefined, {
    message: 'Evidence must reference either a URL or an asset.',
  })

export const claimSchema = z.discriminatedUnion('status', [
  z.object({
    id: stableIdSchema,
    text: z.string().min(1),
    status: z.literal('verified'),
    evidenceIds: z.array(stableIdSchema).min(1),
  }),
  z.object({
    id: stableIdSchema,
    text: z.string().min(1),
    status: z.literal('demonstrated'),
    evidenceIds: z.array(stableIdSchema).min(1),
  }),
  z.object({
    id: stableIdSchema,
    text: z.string().min(1),
    status: z.literal('declared'),
    evidenceIds: z.array(stableIdSchema).default([]),
  }),
  z.object({
    id: stableIdSchema,
    text: z.string().min(1),
    status: z.literal('planned'),
    evidenceIds: z.array(stableIdSchema).max(0).default([]),
  }),
])

export const projectCoreSchema = z
  .object({
    id: stableIdSchema,
    capabilityIds: z.array(stableIdSchema).min(1),
    evidence: z.array(evidenceSchema).min(1),
    links: z.array(externalLinkSchema).min(1),
    assetIds: z.array(stableIdSchema).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().nonnegative(),
    origin: projectOriginSchema,
    visualVariant: projectVisualVariantSchema,
  })
  .superRefine((project, context) => {
    if (project.links.filter((link) => link.kind === 'repository').length !== 1) {
      context.addIssue({
        code: 'custom',
        path: ['links'],
        message: 'Projects require exactly one repository link.',
      })
    }
  })

export const localizedProjectSchema = z.object({
  projectId: stableIdSchema,
  slug: slugSchema,
  title: z.string().min(1),
  eyebrow: z.string().min(1),
  detailEyebrow: z.string().min(1),
  ctaLabel: z.string().min(1),
  question: z.string().min(1),
  supportingText: z.string().min(1),
  whatIWorkedOn: z.string().min(1),
  futureImprovement: z.string().min(1),
  originDescription: z.string().min(1).optional(),
  narrative: z.object({
    cardSummary: z.string().min(1),
    cardValue: z.string().min(1),
    heroSummary: z.string().min(1),
    idea: z.string().min(1),
    built: z.string().min(1),
    value: z.string().min(1),
    currentStage: z.string().min(1),
    evidenceIntroduction: z.string().min(1),
    transparency: z.string().min(1).optional(),
  }),
  claims: z.array(claimSchema).min(1),
  evidence: z
    .array(
      z.object({
        evidenceId: stableIdSchema,
        label: z.string().min(1),
        description: z.string().min(1),
        linkLabel: z.string().min(1).optional(),
      }),
    )
    .min(1),
  links: z.array(localizedExternalLinkSchema).min(1),
  assets: z.array(localizedAssetSchema),
  metadata: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    noIndex: z.boolean().default(false),
  }),
})

export const ctaSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('internal'),
    page: pageIdSchema,
    label: z.string().min(1),
    analyticsId: stableIdSchema.optional(),
  }),
  z.object({
    kind: z.literal('external'),
    url: httpsUrlSchema,
    label: z.string().min(1),
    analyticsId: stableIdSchema.optional(),
  }),
  z.object({
    kind: z.literal('anchor'),
    href: z.string().regex(/^#[a-z0-9]+(?:-[a-z0-9]+)*$/),
    label: z.string().min(1),
    analyticsId: stableIdSchema.optional(),
  }),
])

const editorialItemSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  description: z.string().optional(),
  stack: z
    .array(
      z.object({
        text: z.string().min(1),
        color: z.string().optional(),
        icon: z.string().min(1).optional(),
      }),
    )
    .optional(),
  labels: z
    .object({
      ctaLabel: z.string().optional(),
    })
    .optional(),
})

const editorialSectionSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
})

const pageEvidenceCopySchema = z.object({
  evidenceId: stableIdSchema,
  label: z.string().min(1),
  description: z.string().min(1),
})

const curatedEvidenceIdsSchema = z.array(stableIdSchema).max(2)

const competenceReferenceSchema = z.object({
  id: stableIdSchema,
  kind: z.enum(['certification', 'course', 'reference']),
  label: z.string().min(1),
  issuer: z.string().min(1),
  description: z.string().min(1),
  url: httpsUrlSchema.optional(),
})

const skillsGroupSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  problem: z.string().min(1),
  description: z.string().min(1),
  evidenceTitle: z.string().min(1),
  tools: z.array(z.string().min(1)).min(1),
  evidenceIds: curatedEvidenceIdsSchema,
  references: z.array(competenceReferenceSchema).max(2).default([]),
  cta: ctaSchema,
})

const skillsPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
  }),
  groups: z.array(skillsGroupSchema).min(1),
  labels: z.object({
    pageIndexLabel: z.string().min(1),
    groupsIndexLabel: z.string().min(1),
    evidenceIndexLabel: z.string().min(1),
    contactIndexLabel: z.string().min(1),
    groupsTitle: z.string().min(1),
    evidenceTitle: z.string().min(1),
    referencesTitle: z.string().min(1),
  }),
  closing: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
  }),
})

const methodResourceSchema = z.object({
  id: stableIdSchema,
  label: z.string().min(1),
  url: httpsUrlSchema,
  language: z.enum(['it', 'en']).optional(),
  note: z.string().min(1).optional(),
})

const methodEvidenceLinkSchema = z.object({
  evidenceId: stableIdSchema,
  label: z.string().min(1),
  description: z.string().min(1),
})

const methodExampleSchema = z.object({
  id: stableIdSchema,
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  decision: z.string().min(1),
  result: z.string().min(1),
  evidenceLinks: z.array(methodEvidenceLinkSchema).max(2),
  diagram: z
    .object({
      kind: z.enum(['quality-pipeline', 'content-contract']),
      labels: z.array(z.string().min(1)).min(2),
      title: z.string().min(1),
    })
    .optional(),
  cta: ctaSchema,
})

const methodPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().min(1),
    description: z.string().min(1),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
  }),
  foundations: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    body: z.string().min(1),
    status: z.string().min(1),
    closing: z.string().min(1),
    resources: z.array(methodResourceSchema).min(1),
  }),
  principles: z
    .array(
      z.object({
        id: stableIdSchema,
        number: z.string().regex(/^0[1-5]$/),
        question: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        activities: z.array(z.string().min(1)).min(1),
        output: z.string().min(1),
        visual: z.enum(['problem', 'increment', 'decision', 'verification', 'state']),
        visualLabel: z.string().min(1),
      }),
    )
    .length(5),
  value: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    introduction: z.string().min(1),
    items: z.array(z.string().min(1)).length(6),
    closing: z.string().min(1),
  }),
  tools: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    introduction: z.string().min(1),
    closing: z.string().min(1),
    flowTitle: z.string().min(1),
    resourcesTitle: z.string().optional(),
    resources: z.array(methodResourceSchema).optional(),
    items: z
      .array(
        z.object({
          id: stableIdSchema,
          title: z.string().min(1),
          question: z.string().min(1),
          role: z.string().min(1),
          contents: z.string().min(1),
          example: z.string().min(1),
          link: z
            .object({
              id: stableIdSchema,
              label: z.string().min(1),
              url: httpsUrlSchema,
            })
            .optional(),
        }),
      )
      .length(3),
  }),
  examples: z.array(methodExampleSchema).min(1),
  agenticDelivery: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().min(1),
    responseLabel: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).length(3),
    concepts: z
      .array(
        z.object({
          id: stableIdSchema,
          title: z.string().min(1),
          description: z.string().min(1),
        }),
      )
      .length(7),
    workflowTitle: z.string().min(1),
    workflow: z.array(z.string().min(1)).length(5),
    workflowDescriptions: z.array(z.string().min(1)).length(5),
    closing: z.string().min(1),
    resource: methodResourceSchema,
    resourceTitle: z.string().min(1),
  }),
  labels: z.object({
    examplesTitle: z.string().min(1),
    decisionLabel: z.string().min(1),
    resultLabel: z.string().min(1),
    outputLabel: z.string().min(1),
    evidenceTitle: z.string().min(1),
    resourcesTitle: z.string().min(1),
  }),
  closing: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    microcopy: z.string().min(1),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
  }),
})

const supportingHeroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
})

const localizedProfileSectionSchema = z.object({
  id: stableIdSchema,
  number: z.string().min(1),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  highlights: z.array(z.string().min(1)).min(1),
})

const localizedPrivacySectionSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
})

export const siteContentSchema = z.object({
  locale: languageSchema,
  identity: z.object({
    name: z.string().min(1),
    descriptor: z.string().min(1),
  }),
  navigation: z.array(z.object({ page: pageIdSchema, label: z.string().min(1) })).min(1),
  portfolio: z.object({
    eyebrow: z.string().min(1),
    headline: z.string().min(1),
    introduction: z.string().min(1),
    training: z.object({
      prefix: z.string().min(1),
      linkLabel: z.string().min(1),
      suffix: z.string().min(1),
      url: httpsUrlSchema,
    }),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    contactCta: ctaSchema,
    metadata: z.object({ title: z.string().min(1), description: z.string().min(1) }),
  }),
  homePage: z.object({
    hero: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.object({
        prefix: z.string().min(1),
        linkLabel: z.string().min(1),
        suffix: z.string().min(1),
        url: httpsUrlSchema,
      }),
      primaryCtaLabel: z.string().min(1),
      methodCtaLabel: z.string().min(1),
      githubCtaLabel: z.string().min(1),
    }),
    learning: editorialSectionSchema.extend({ items: z.array(editorialItemSchema).min(1) }),
    selectedProjects: editorialSectionSchema,
    skills: editorialSectionSchema.extend({
      groups: z.array(editorialItemSchema).min(1),
      labels: z.object({ skillCtaLabel: z.string().optional() }),
    }),
    process: editorialSectionSchema.extend({
      steps: z
        .array(
          z.object({
            id: stableIdSchema,
            number: z.string().min(1),
            title: z.string().min(1),
            description: z.string().min(1),
          }),
        )
        .min(1),
      ctaLabel: z.string().min(1),
    }),
    contact: editorialSectionSchema.extend({
      contactCtaLabel: z.string().min(1),
      githubCtaLabel: z.string().min(1),
    }),
  }),
  publicEvidence: z.array(pageEvidenceCopySchema).min(1),
  skillsPage: skillsPageSchema,
  methodPage: methodPageSchema,
  profilePage: z.object({
    hero: supportingHeroSchema,
    sections: z.array(localizedProfileSectionSchema).min(1),
    highlightsLabel: z.string().min(1),
    usefulLinks: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      items: z
        .array(
          z.object({
            id: stableIdSchema,
            label: z.string().min(1),
            description: z.string().min(1),
            url: z.url(),
            ctaLabel: z.string().min(1),
          }),
        )
        .min(1),
    }),
    ctas: z.object({
      projectsLabel: z.string().min(1),
      contactLabel: z.string().min(1),
      githubLabel: z.string().min(1),
    }),
    closing: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  }),
  contactPage: z.object({
    hero: supportingHeroSchema,
    requestsTitle: z.string().min(1),
    guidanceTitle: z.string().min(1),
    formTitle: z.string().min(1),
    formDescription: z.string().min(1),
    appropriateRequests: z.array(z.string().min(1)).min(1),
    messageGuidance: z.array(z.string().min(1)).min(1),
    form: z.object({
      requiredHint: z.string().min(1),
      nameLabel: z.string().min(1),
      nameHelper: z.string().min(1),
      emailLabel: z.string().min(1),
      emailHelper: z.string().min(1),
      messageLabel: z.string().min(1),
      messageHelper: z.string().min(1),
      submitLabel: z.string().min(1),
      submittingLabel: z.string().min(1),
      sendAnotherLabel: z.string().min(1),
      requiredError: z.string().min(1),
      nameLengthError: z.string().min(1),
      emailError: z.string().min(1),
      messageLengthError: z.string().min(1),
      configurationError: z.string().min(1),
      submissionError: z.string().min(1),
      successMessage: z.string().min(1),
      privacyNotice: z.string().min(1),
    }),
    githubLabel: z.string().min(1),
  }),
  privacyPage: z.object({
    hero: supportingHeroSchema,
    updatedLabel: z.string().min(1),
    updatedAt: z.string().min(1),
    intro: z.string().min(1),
    indexLabel: z.string().min(1),
    sections: z.array(localizedPrivacySectionSchema).min(1),
    providerHeading: z.string().min(1),
    providerLabel: z.string().min(1),
    providerUrl: httpsUrlSchema,
    ownerContactHeading: z.string().min(1),
    ownerContactLabel: z.string().min(1),
    ownerContactUrl: httpsUrlSchema,
  }),
  projectsPage: z.object({
    hero: editorialSectionSchema.extend({ supportingText: z.string().min(1) }),
    guide: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      note: z.string().min(1),
    }),
    journey: editorialSectionSchema,
    finalCta: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      methodLabel: z.string().min(1),
      contactLabel: z.string().min(1),
      githubLabel: z.string().min(1),
    }),
  }),
  projectExperience: z.object({
    home: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      introduction: z.string().min(1),
      supportingText: z.string().min(1),
    }),
    projects: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      introduction: z.string().min(1),
      supportingText: z.string().min(1),
    }),
    labels: z.object({
      ideaLabel: z.string().min(1),
      builtLabel: z.string().min(1),
      valueLabel: z.string().min(1),
      stageLabel: z.string().min(1),
      evidenceLabel: z.string().min(1),
      repositoryLabel: z.string().min(1),
      detailCtaLabel: z.string().min(1),
      projectsCtaLabel: z.string().min(1),
      backToProjectsLabel: z.string().min(1),
      projectOriginLabels: z.record(projectOriginSchema, z.string().min(1)),
      whatIWorkedOnLabel: z.string().min(1),
      futureImprovementLabel: z.string().min(1),
    }),
  }),
  common: z.object({
    projectLabel: z.string().min(1),
    repositoryLabel: z.string().min(1),
    evidenceLabel: z.string().min(1),
    unknownProjectTitle: z.string().min(1),
    unknownProjectDescription: z.string().min(1),
    placeholderDescription: z.string().min(1),
    claimStatusLabels: z.record(
      z.enum(['verified', 'demonstrated', 'declared', 'planned']),
      z.string().min(1),
    ),
    evidenceTypeLabels: z.record(evidenceTypeSchema, z.string().min(1)),
  }),
  capabilities: z.array(localizedCapabilitySchema).min(1),
  projects: z.array(localizedProjectSchema).min(1),
})

export const contentRepositorySchema = z.object({
  publicEvidence: z.array(evidenceSchema).min(1),
  capabilities: z.array(capabilitySchema).min(1),
  projects: z.array(projectCoreSchema).min(1),
  assets: z.array(assetReferenceSchema),
  locales: z.record(languageSchema, siteContentSchema),
})

export type SiteContent = z.infer<typeof siteContentSchema>
export type ProjectCore = z.infer<typeof projectCoreSchema>
export type LocalizedProject = z.infer<typeof localizedProjectSchema>
export type ContentRepository = z.infer<typeof contentRepositorySchema>
export type Language = (typeof supportedLanguages)[number]
export type PageId = (typeof publicPageIds)[number]
export type ClaimStatus = LocalizedProject['claims'][number]['status']
export type ProjectVisualVariant = z.infer<typeof projectVisualVariantSchema>
