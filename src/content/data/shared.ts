import type { ContentRepository } from '../schema'

export const sharedContent = {
  capabilities: [
    { id: 'embedded-firmware', category: 'embedded' },
    { id: 'privacy-aware-design', category: 'security' },
    { id: 'technical-governance', category: 'architecture' },
    { id: 'laravel-api', category: 'backend' },
    { id: 'sanctum-authentication', category: 'security' },
    { id: 'containerized-delivery', category: 'delivery' },
    { id: 'node-api', category: 'backend' },
    { id: 'sqlite-persistence', category: 'backend' },
    { id: 'automated-testing', category: 'quality' },
  ],
  projects: [
    {
      id: 'homeedge-ai-platform',
      capabilityIds: ['embedded-firmware', 'privacy-aware-design', 'technical-governance'],
      evidence: [
        {
          id: 'homeedge-mvp-scope',
          type: 'documentation',
          url: 'https://github.com/pianic2/homeedge-ai-platform/blob/main/README.md',
        },
        {
          id: 'homeedge-architecture-governance',
          type: 'documentation',
          url: 'https://github.com/pianic2/homeedge-ai-platform/blob/main/README.md',
        },
        {
          id: 'homeedge-product-vision',
          type: 'documentation',
          url: 'https://github.com/pianic2/homeedge-ai-platform/blob/main/docs/product/product-vision.md',
        },
        {
          id: 'homeedge-stakeholder-review',
          type: 'report',
          url: 'https://niccolopiazzi01.atlassian.net/wiki/spaces/IEHAP/overview',
        },
      ],
      links: [
        {
          id: 'homeedge-github',
          kind: 'repository',
          url: 'https://github.com/pianic2/homeedge-ai-platform',
        },
      ],
      assetIds: [],
      featured: true,
      order: 0,
      origin: 'personal-long-term',
      visualVariant: 'signal-yellow',
    },
    {
      id: 'its-library-api-laravel',
      capabilityIds: ['laravel-api', 'sanctum-authentication', 'containerized-delivery'],
      evidence: [
        {
          id: 'library-rest-endpoints',
          type: 'documentation',
          url: 'https://github.com/pianic2/its-php-libreria/blob/main/README.md',
        },
        {
          id: 'library-docker-setup',
          type: 'documentation',
          url: 'https://github.com/pianic2/its-php-libreria/blob/main/README.md',
        },
        {
          id: 'library-validation-tests',
          type: 'documentation',
          url: 'https://github.com/pianic2/its-php-libreria/blob/main/README.md',
        },
      ],
      links: [
        {
          id: 'library-github',
          kind: 'repository',
          url: 'https://github.com/pianic2/its-php-libreria',
        },
      ],
      assetIds: [],
      featured: true,
      order: 1,
      origin: 'its-training',
      visualVariant: 'studio-pink',
    },
    {
      id: 'node-list-manager',
      capabilityIds: ['node-api', 'sqlite-persistence', 'automated-testing'],
      evidence: [
        {
          id: 'node-server-source',
          type: 'repository',
          url: 'https://github.com/pianic2/todo-list-manager-node/blob/main/src/server.js',
        },
        {
          id: 'node-package-manifest',
          type: 'documentation',
          url: 'https://github.com/pianic2/todo-list-manager-node/blob/main/README.md',
        },
        {
          id: 'node-automated-tests',
          type: 'test',
          url: 'https://github.com/pianic2/todo-list-manager-node/blob/main/.github/workflows/ci.yml',
        },
      ],
      links: [
        {
          id: 'node-github',
          kind: 'repository',
          url: 'https://github.com/pianic2/todo-list-manager-node',
        },
      ],
      assetIds: [],
      featured: true,
      order: 2,
      origin: 'its-training',
      visualVariant: 'electric-cyan',
    },
  ],
  assets: [],
} satisfies Pick<ContentRepository, 'capabilities' | 'projects' | 'assets'>
