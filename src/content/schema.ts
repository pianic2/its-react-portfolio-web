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
    type: z.enum([
      'repository',
      'pull-request',
      'documentation',
      'test',
      'demo',
      'screenshot',
      'report',
    ]),
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
  narrative: z.object({
    cardSummary: z.string().min(1),
    cardValue: z.string().min(1),
    heroSummary: z.string().min(1),
    idea: z.string().min(1),
    built: z.string().min(1),
    value: z.string().min(1),
    currentStage: z.string().min(1),
    evidenceIntroduction: z.string().min(1),
  }),
  claims: z.array(claimSchema).min(1),
  evidence: z
    .array(
      z.object({
        evidenceId: stableIdSchema,
        label: z.string().min(1),
        description: z.string().min(1),
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
  z.object({ kind: z.literal('internal'), page: pageIdSchema, label: z.string().min(1) }),
  z.object({ kind: z.literal('external'), url: httpsUrlSchema, label: z.string().min(1) }),
])

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
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    contactCta: ctaSchema,
    metadata: z.object({ title: z.string().min(1), description: z.string().min(1) }),
  }),
  projectExperience: z.object({
    home: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      introduction: z.string().min(1),
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
  }),
  capabilities: z.array(localizedCapabilitySchema).min(1),
  projects: z.array(localizedProjectSchema).min(1),
})

export const contentRepositorySchema = z.object({
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
