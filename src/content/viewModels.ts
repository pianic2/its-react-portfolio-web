import type { ContentRepository, Language } from './schema'

export function buildProjectViewModel(
  repository: ContentRepository,
  language: Language,
  projectId: string,
) {
  const core = repository.projects.find((project) => project.id === projectId)
  const localized = repository.locales[language].projects.find(
    (project) => project.projectId === projectId,
  )
  if (!core || !localized) return null

  const capabilityCopy = new Map(
    repository.locales[language].capabilities.map((capability) => [
      capability.capabilityId,
      capability,
    ]),
  )
  const evidenceCopy = new Map(
    localized.evidence.map((evidence) => [evidence.evidenceId, evidence]),
  )
  const linkCopy = new Map(localized.links.map((link) => [link.linkId, link]))
  const assetCopy = new Map(localized.assets.map((asset) => [asset.assetId, asset]))
  const statusLabels = repository.locales[language].common.claimStatusLabels

  return {
    id: core.id,
    projectId: core.id,
    number: String(core.order + 1).padStart(2, '0'),
    slug: localized.slug,
    title: localized.title,
    eyebrow: localized.eyebrow,
    summary: localized.summary,
    sections: localized.sections,
    metadata: localized.metadata,
    featured: core.featured,
    order: core.order,
    visualVariant: core.visualVariant,
    capabilities: core.capabilityIds.map((capabilityId) => ({
      id: capabilityId,
      category: repository.capabilities.find((capability) => capability.id === capabilityId)
        ?.category,
      ...capabilityCopy.get(capabilityId),
    })),
    claims: localized.claims.map((claim) => ({
      ...claim,
      statusLabel: statusLabels[claim.status],
    })),
    evidence: core.evidence.map((evidence) => ({
      ...evidence,
      ...evidenceCopy.get(evidence.id),
    })),
    links: core.links.map((link) => ({
      ...link,
      ...linkCopy.get(link.id),
    })),
    assets: core.assetIds.map((assetId) => ({
      ...repository.assets.find((asset) => asset.id === assetId),
      ...assetCopy.get(assetId),
    })),
  }
}

export type ProjectViewModel = NonNullable<ReturnType<typeof buildProjectViewModel>>
