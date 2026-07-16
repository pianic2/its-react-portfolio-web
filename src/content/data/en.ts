import type { SiteContent } from '../schema'

export const englishContent = {
  locale: 'en',
  identity: { name: 'Niccolò Piazzi', descriptor: 'Full-stack developer and systems designer' },
  navigation: [
    { page: 'home', label: 'Home' },
    { page: 'projects', label: 'Projects' },
    { page: 'skills', label: 'Skills' },
    { page: 'method', label: 'Method' },
    { page: 'profile', label: 'Profile' },
    { page: 'contact', label: 'Contact' },
    { page: 'privacy', label: 'Privacy' },
  ],
  portfolio: {
    headline: 'Software development portfolio',
    introduction: 'Technical projects described through public evidence and explicit limitations.',
    primaryCta: { kind: 'internal', page: 'contact', label: 'Contact' },
    secondaryCta: { kind: 'external', url: 'https://github.com/pianic2', label: 'GitHub' },
    metadata: {
      title: 'Niccolò Piazzi | Software development portfolio',
      description: 'Bilingual software portfolio with claims linked to public evidence.',
    },
  },
  projectExperience: {
    home: {
      eyebrow: 'Selected work',
      title: 'Three systems, three distinct constraints',
      introduction:
        'A focused selection of embedded, Laravel and Node.js work, with every statement tied to public repository evidence.',
      allProjectsLabel: 'Explore all projects',
    },
    projects: {
      eyebrow: 'Project index',
      title: 'Evidence before adjectives',
      introduction:
        'Three technical projects presented through their documented scope, current limits and inspectable source material.',
    },
    detail: {
      backLabel: 'Back to projects',
      claimsTitle: 'Claims and evidence',
      repositoryLabel: 'Open repository',
      readProjectLabel: 'Read project',
    },
  },
  common: {
    projectLabel: 'Project',
    repositoryLabel: 'Repository',
    evidenceLabel: 'Evidence',
    unknownProjectTitle: 'Project not found',
    unknownProjectDescription: 'The requested slug does not match a published project.',
    placeholderDescription: 'This page will be composed from the validated content layer.',
    claimStatusLabels: {
      verified: 'Verified',
      demonstrated: 'Demonstrated',
      declared: 'Declared',
      planned: 'Planned',
    },
  },
  capabilities: [
    { capabilityId: 'embedded-firmware', label: 'Embedded firmware' },
    { capabilityId: 'technical-governance', label: 'Technical governance' },
    { capabilityId: 'laravel-api', label: 'Laravel API' },
    { capabilityId: 'containerized-delivery', label: 'Containerized delivery' },
    { capabilityId: 'node-api', label: 'Node.js API' },
    { capabilityId: 'automated-testing', label: 'Automated testing' },
  ],
  projects: [
    {
      projectId: 'homeedge-ai-platform',
      slug: 'homeedge-ai-platform',
      title: 'HomeEdge AI Platform',
      eyebrow: 'ESP32-C3 and technical governance',
      summary:
        'A Sprint 0 repository for an edge-first smart home platform with explicit MVP boundaries.',
      sections: [
        {
          id: 'scope',
          label: 'Documented scope',
          body: 'The room/door MVP node is defined for temperature, humidity, local non-identifying presence and door open or closed state.',
        },
        {
          id: 'limits',
          label: 'Limitations',
          body: 'Backend, mobile and AI services are [UNVALIDATED] target directions, not demonstrated or production-ready services.',
        },
      ],
      claims: [
        {
          id: 'sprint-zero-boundary',
          text: 'The README documents the ESP32-C3 MVP node boundary and included signals.',
          status: 'demonstrated',
          evidenceIds: ['homeedge-readme'],
        },
        {
          id: 'target-services-unvalidated',
          text: 'Backend, mobile and AI boundaries remain explicitly [UNVALIDATED].',
          status: 'demonstrated',
          evidenceIds: ['homeedge-readme'],
        },
      ],
      evidence: [{ evidenceId: 'homeedge-readme', label: 'README and MVP boundaries' }],
      links: [{ linkId: 'homeedge-github', label: 'GitHub repository' }],
      assets: [],
      metadata: {
        title: 'HomeEdge AI Platform',
        description:
          'Sprint 0 edge-first smart home repository with MVP boundaries and [UNVALIDATED] markers.',
        noIndex: false,
      },
    },
    {
      projectId: 'its-library-api-laravel',
      slug: 'its-library-api-laravel',
      title: 'ITS Library API in Laravel',
      eyebrow: 'Laravel and REST APIs',
      summary:
        'An educational Laravel API for books, authors, categories and token authentication.',
      sections: [
        {
          id: 'scope',
          label: 'Documented scope',
          body: 'The repository documents REST endpoints for books, authors and categories, with public reads and write operations protected by Laravel Sanctum.',
        },
        {
          id: 'delivery',
          label: 'Local execution',
          body: 'Docker Compose defines the Laravel application, MySQL and phpMyAdmin; the README documents local bootstrap and test commands.',
        },
      ],
      claims: [
        {
          id: 'rest-resources',
          text: 'The repository documents REST resources for books, authors and categories.',
          status: 'demonstrated',
          evidenceIds: ['library-readme'],
        },
        {
          id: 'local-containers',
          text: 'The documented local setup uses Docker Compose with Laravel and MySQL.',
          status: 'demonstrated',
          evidenceIds: ['library-readme'],
        },
      ],
      evidence: [{ evidenceId: 'library-readme', label: 'README, API and local setup' }],
      links: [{ linkId: 'library-github', label: 'GitHub repository' }],
      assets: [],
      metadata: {
        title: 'ITS Library API in Laravel',
        description:
          'Educational Laravel REST API for a library, with authentication and a local Docker setup.',
        noIndex: false,
      },
    },
    {
      projectId: 'node-list-manager',
      slug: 'node-list-manager',
      title: 'ITS Node.js Project',
      eyebrow: 'Node.js, Express and SQLite',
      summary: 'A list and task backend with modular Express routes and SQLite persistence.',
      sections: [
        {
          id: 'scope',
          label: 'Demonstrated scope',
          body: 'The server mounts dedicated list and nested-item routes, exposes health checks and centralizes error handling.',
        },
        {
          id: 'quality',
          label: 'Test contract',
          body: 'The manifest configures Jest and includes Supertest; the application source exports the Express app for tests.',
        },
      ],
      claims: [
        {
          id: 'express-route-modules',
          text: 'The Express server mounts route modules for lists and nested items.',
          status: 'demonstrated',
          evidenceIds: ['node-server-source'],
        },
        {
          id: 'sqlite-test-stack',
          text: 'The manifest declares better-sqlite3, Jest and Supertest.',
          status: 'demonstrated',
          evidenceIds: ['node-package-manifest'],
        },
      ],
      evidence: [
        { evidenceId: 'node-server-source', label: 'Express server source' },
        { evidenceId: 'node-package-manifest', label: 'npm manifest and dependencies' },
      ],
      links: [{ linkId: 'node-github', label: 'GitHub repository' }],
      assets: [],
      metadata: {
        title: 'ITS Node.js Project',
        description:
          'Node.js backend with Express, modular routes, SQLite and a Jest test contract.',
        noIndex: false,
      },
    },
  ],
} satisfies SiteContent
