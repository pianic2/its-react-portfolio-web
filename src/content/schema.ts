import { z } from 'zod'
import { supportedLanguages } from '../routes/routeConfig'

export const languageSchema = z.enum(supportedLanguages)
export const pageIdSchema = z.enum([
  'home',
  'projects',
  'projectDetail',
  'skills',
  'method',
  'profile',
  'contact',
  'privacy',
])

const stableIdSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a stable kebab-case identifier.')
const slugSchema = stableIdSchema
const httpsUrlSchema = z
  .string()
  .url()
  .refine((value) => new URL(value).protocol === 'https:', 'External URLs must use HTTPS.')

export const capabilitySchema = z.object({
  id: stableIdSchema,
  category: z.enum(['frontend', 'backend', 'architecture', 'delivery', 'quality', 'security', 'product', 'embedded']),
  label: z.string().min(1),
  description: z.string().min(1).optional(),
})

export const externalLinkSchema = z.object({
  kind: z.enum(['repository', 'live-demo', 'documentation', 'jira', 'other']),
  url: httpsUrlSchema,
  label: z.string().min(1),
  accessibilityLabel: z.string().min(1).optional(),
})

export const assetReferenceSchema = z
  .object({
    id: stableIdSchema,
    src: z.string().min(1),
    alt: z.string(),
    decorative: z.boolean().default(false),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    provenance: z.enum(['repository', 'project-screenshot', 'original', 'generated', 'third-party']),
    credit: z.string().min(1).optional(),
  })
  .superRefine((asset, context) => {
    if (asset.decorative && asset.alt !== '') {
      context.addIssue({ code: 'custom', path: ['alt'], message: 'Decorative assets must use an empty alt value.' })
    }
    if (!asset.decorative && asset.alt.length === 0) {
      context.addIssue({ code: 'custom', path: ['alt'], message: 'Informative assets require alternative text.' })
    }
    if (asset.provenance === 'third-party' && !asset.credit) {
      context.addIssue({ code: 'custom', path: ['credit'], message: 'Third-party assets require a credit.' })
    }
  })

export const evidenceSchema = z
  .object({
    id: stableIdSchema,
    type: z.enum(['repository', 'pull-request', 'documentation', 'test', 'demo', 'screenshot', 'report']),
    label: z.string().min(1),
    url: httpsUrlSchema.optional(),
    assetId: stableIdSchema.optional(),
    description: z.string().min(1).optional(),
  })
  .refine((evidence) => evidence.url !== undefined || evidence.assetId !== undefined, {
    message: 'Evidence must reference either a URL or an asset.',
  })

export const claimSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('verified'),
    evidenceIds: z.array(stableIdSchema).min(1),
  }),
  z.object({
    status: z.literal('demonstrated'),
    evidenceIds: z.array(stableIdSchema).min(1),
  }),
  z.object({
    status: z.literal('declared'),
    evidenceIds: z.array(stableIdSchema).default([]),
  }),
  z.object({
    status: z.literal('planned'),
    evidenceIds: z.array(stableIdSchema).max(0).default([]),
  }),
])

export const projectCoreSchema = z.object({
  id: stableIdSchema,
  status: z.enum(['active', 'completed', 'maintained', 'archived']),
  capabilityIds: z.array(stableIdSchema).min(1),
  evidence: z.array(evidenceSchema).min(1),
  links: z.array(externalLinkSchema).min(1),
  assetIds: z.array(stableIdSchema).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative(),
})

export const localizedProjectSchema = z.object({
  projectId: stableIdSchema,
  slug: slugSchema,
  title: z.string().min(1),
  eyebrow: z.string().min(1).optional(),
  summary: z.string().min(1),
  problem: z.string().min(1),
  approach: z.string().min(1),
  outcome: z.string().min(1),
  role: z.string().min(1).optional(),
  claim: claimSchema,
  metadata: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    noIndex: z.boolean().default(false),
  }),
})

export const siteContentSchema = z.object({
  locale: languageSchema,
  identity: z.object({
    name: z.string().min(1),
    descriptor: z.string().min(1),
  }),
  navigation: z.array(z.object({ page: pageIdSchema, label: z.string().min(1) })).min(1),
  common: z.object({
    projectLabel: z.string().min(1),
    repositoryLabel: z.string().min(1),
    evidenceLabel: z.string().min(1),
    unknownProjectTitle: z.string().min(1),
    unknownProjectDescription: z.string().min(1),
    placeholderDescription: z.string().min(1),
  }),
  capabilities: z.array(capabilitySchema).min(1),
  projects: z.array(localizedProjectSchema).length(4),
})

export const contentRepositorySchema = z.object({
  projects: z.array(projectCoreSchema).length(4),
  assets: z.array(assetReferenceSchema),
  locales: z.record(languageSchema, siteContentSchema),
})

export type SiteContent = z.infer<typeof siteContentSchema>
export type ProjectCore = z.infer<typeof projectCoreSchema>
export type LocalizedProject = z.infer<typeof localizedProjectSchema>
export type ContentRepository = z.infer<typeof contentRepositorySchema>
export type ClaimStatus = LocalizedProject['claim']['status']
