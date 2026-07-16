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
    eyebrow: 'SOFTWARE, HARDWARE AND REAL PROBLEMS',
    headline: 'I turn complex ideas into useful, understandable products.',
    introduction:
      'I build projects that connect code, devices and people — from smart-home sensors to web APIs. Every project explains what works today, what still needs to be built and why the technical choices matter.',
    primaryCta: { kind: 'internal', page: 'projects', label: 'Explore the projects' },
    secondaryCta: { kind: 'external', url: 'https://github.com/pianic2', label: 'View GitHub' },
    contactCta: { kind: 'internal', page: 'contact', label: 'Let’s talk' },
    metadata: {
      title: 'Niccolò Piazzi | Software development portfolio',
      description:
        'I build projects that connect code, devices and people — from smart-home sensors to web APIs. Every project explains what works today, what still needs to be built and why the technical choices matter.',
    },
  },
  projectExperience: {
    home: {
      eyebrow: 'SELECTED PROJECTS',
      title: 'Three projects. Three concrete problems to solve.',
      introduction:
        'A smart-home platform, a digital library API and a Node.js backend. Together they show how I approach different problems, choose appropriate tools and make the result understandable and verifiable.',
    },
    projects: {
      eyebrow: 'PROJECT INDEX',
      title: 'Start with the problem, not the technology.',
      introduction:
        'These projects are not presented as a list of frameworks. Each one starts from a concrete need and shows the solution, the decisions behind it and the current limits.',
      supportingText:
        'Choose a project to understand what it is for, how it works and what stage it has reached.',
    },
    labels: {
      ideaLabel: 'The idea',
      builtLabel: 'What has been built',
      valueLabel: 'Why it matters',
      stageLabel: 'Where it stands today',
      evidenceLabel: 'What you can verify',
      repositoryLabel: 'Open the repository',
      detailCtaLabel: 'Discover the project',
      projectsCtaLabel: 'Explore all projects',
      backToProjectsLabel: 'Back to projects',
    },
  },
  common: {
    projectLabel: 'Project',
    repositoryLabel: 'Open the repository',
    evidenceLabel: 'What you can verify',
    unknownProjectTitle: 'Project not found',
    unknownProjectDescription: 'The requested slug does not match a published project.',
    placeholderDescription: 'This page will be composed from the validated content layer.',
    claimStatusLabels: {
      verified: 'Verified',
      demonstrated: 'Backed by evidence',
      declared: 'Documented direction',
      planned: 'Planned next step',
    },
  },
  capabilities: [
    { capabilityId: 'embedded-firmware', label: 'ESP32-C3 sensors' },
    { capabilityId: 'privacy-aware-design', label: 'Privacy-aware design' },
    { capabilityId: 'technical-governance', label: 'Technical governance' },
    { capabilityId: 'laravel-api', label: 'Laravel REST API' },
    { capabilityId: 'sanctum-authentication', label: 'Sanctum authentication' },
    { capabilityId: 'containerized-delivery', label: 'Docker and MySQL' },
    { capabilityId: 'node-api', label: 'Node.js and Express' },
    { capabilityId: 'sqlite-persistence', label: 'SQLite persistence' },
    { capabilityId: 'automated-testing', label: 'Automated tests' },
  ],
  projects: [
    {
      projectId: 'homeedge-ai-platform',
      slug: 'homeedge-ai-platform',
      title: 'HomeEdge AI Platform',
      eyebrow: 'SMART HOME · EMBEDDED SYSTEMS',
      detailEyebrow: 'SMART HOME · EDGE COMPUTING · GOVERNANCE',
      ctaLabel: 'Discover HomeEdge',
      narrative: {
        cardSummary:
          'A modular smart-home platform designed to understand what is happening in a room while keeping data collection local, limited and transparent.',
        cardValue:
          'It brings together physical sensors, software architecture and responsible data use in one project.',
        heroSummary:
          'HomeEdge is an experimental smart-home platform built around small room sensors. Its purpose is to collect useful information close to where it is generated, without turning the home into an opaque system.',
        idea: 'Many smart-home products do not clearly explain what they collect, where the information goes or how the system makes decisions. HomeEdge explores a more transparent approach: every device has a limited purpose, every type of data has an explicit boundary and every important choice is documented.',
        built:
          'The current MVP focuses on an ESP32-C3 room and door node. It measures temperature and humidity, detects non-identifying presence locally and reports whether a door is open or closed. The repository also defines the architecture, risks and working rules that guide the next phases.',
        value:
          'The project combines embedded programming, software architecture, mobile-product thinking and responsible technical governance. Its value is not only the sensor node: it also demonstrates how a connected system can grow without hiding its limitations.',
        currentStage:
          'HomeEdge is currently in its initial development phase. The ESP32-C3 node and the MVP boundaries are documented. Backend services, the mobile application and AI-assisted insights are planned directions that have not been demonstrated yet.',
        evidenceIntroduction:
          'The public repository allows visitors to inspect the MVP boundaries, the included sensor signals, the architectural direction and the rules used to prevent unsupported claims.',
      },
      claims: [
        {
          id: 'sprint-zero-boundary',
          text: 'The README documents the ESP32-C3 MVP node boundary and included signals.',
          status: 'demonstrated',
          evidenceIds: ['homeedge-mvp-scope'],
        },
        {
          id: 'target-services-unvalidated',
          text: 'Backend, mobile and AI boundaries remain explicitly [UNVALIDATED].',
          status: 'demonstrated',
          evidenceIds: ['homeedge-architecture-governance'],
        },
      ],
      evidence: [
        {
          evidenceId: 'homeedge-mvp-scope',
          label: 'MVP scope and sensor boundaries',
          description:
            'The repository defines which signals the first room and door node can collect and which types of data remain outside the MVP.',
        },
        {
          evidenceId: 'homeedge-architecture-governance',
          label: 'Architecture and governance',
          description:
            'The documentation explains how technical decisions, risks and future capabilities are reviewed before being presented as completed work.',
        },
      ],
      links: [{ linkId: 'homeedge-github', label: 'GitHub repository' }],
      assets: [],
      metadata: {
        title: 'HomeEdge AI Platform',
        description:
          'HomeEdge is an experimental smart-home platform built around small room sensors. Its purpose is to collect useful information close to where it is generated, without turning the home into an opaque system.',
        noIndex: false,
      },
    },
    {
      projectId: 'its-library-api-laravel',
      slug: 'its-library-api-laravel',
      title: 'ITS Library API',
      eyebrow: 'DIGITAL LIBRARY · LARAVEL API',
      detailEyebrow: 'LARAVEL · REST API · DIGITAL LIBRARY',
      ctaLabel: 'Explore the Library API',
      narrative: {
        cardSummary:
          'A complete educational backend for organising books, authors and categories through a documented and protected REST API.',
        cardValue:
          'It shows how authentication, validation, data relationships and file management work together in a real backend.',
        heroSummary:
          'ITS Library API is an educational backend for managing a digital collection of books, authors and categories through clear and documented endpoints.',
        idea: 'A digital library needs more than a list of titles. It must connect books with their authors and categories, validate incoming information, protect editing operations and provide a setup that another developer can reproduce.',
        built:
          'The API supports public reading and authenticated write operations. It manages books, authors and categories, uses Laravel Sanctum for token-based access, stores data in MySQL and can associate downloadable text files with books. Docker prepares the application and its database locally.',
        value:
          'This project brings together the essential parts of a real backend: authentication, validation, database relationships, file storage, predictable errors, documentation and automated tests.',
        currentStage:
          'The repository documents the available endpoints, request examples, validation rules, local bootstrap and demo credentials. It is an educational API designed for local reproduction, not a hosted commercial library service.',
        evidenceIntroduction:
          'The public documentation shows how to start the application, obtain an access token, use the available endpoints and verify the validation behaviour.',
      },
      claims: [
        {
          id: 'rest-resources',
          text: 'The repository documents REST resources for books, authors and categories.',
          status: 'demonstrated',
          evidenceIds: ['library-rest-endpoints'],
        },
        {
          id: 'local-containers',
          text: 'The documented local setup uses Docker Compose with Laravel and MySQL.',
          status: 'demonstrated',
          evidenceIds: ['library-docker-setup', 'library-validation-tests'],
        },
      ],
      evidence: [
        {
          evidenceId: 'library-rest-endpoints',
          label: 'Documented REST endpoints',
          description:
            'The README lists public and protected operations for books, authors, categories and authentication.',
        },
        {
          evidenceId: 'library-docker-setup',
          label: 'Reproducible Docker setup',
          description:
            'Docker Compose starts the Laravel application, MySQL and the database administration interface with an automated bootstrap process.',
        },
        {
          evidenceId: 'library-validation-tests',
          label: 'Validation and tests',
          description:
            'The project documents its input rules and includes automated tests for important backend behaviour.',
        },
      ],
      links: [{ linkId: 'library-github', label: 'GitHub repository' }],
      assets: [],
      metadata: {
        title: 'ITS Library API',
        description:
          'ITS Library API is an educational backend for managing a digital collection of books, authors and categories through clear and documented endpoints.',
        noIndex: false,
      },
    },
    {
      projectId: 'node-list-manager',
      slug: 'node-list-manager',
      title: 'ITS Node.js Project',
      eyebrow: 'TASK MANAGEMENT · NODE.JS BACKEND',
      detailEyebrow: 'NODE.JS · EXPRESS · SQLITE',
      ctaLabel: 'Explore the Node.js project',
      narrative: {
        cardSummary:
          'A compact backend for managing lists and tasks, built with clear Express routes, persistent SQLite data and automated tests.',
        cardValue:
          'It demonstrates how to keep a small application organised, testable and easy to extend without unnecessary complexity.',
        heroSummary:
          'A compact backend for managing lists and tasks, designed to keep routes understandable, data persistent and behaviour easy to verify.',
        idea: 'Even a small task application can become difficult to maintain when routes, persistence and application behaviour are mixed together. This project focuses on separating those responsibilities from the beginning.',
        built:
          'The backend exposes modular Express routes for lists and tasks, stores its data in SQLite and includes automated tests for the main behaviours.',
        value:
          'The project is intentionally smaller than HomeEdge or the Laravel API. Its value is showing how a focused backend can remain clear and testable without adding architecture that the problem does not require.',
        currentStage:
          'The current repository demonstrates the backend flow, the route organisation, SQLite persistence and automated testing. It is an educational Node.js project rather than a production task-management service.',
        evidenceIntroduction:
          'The public repository makes it possible to inspect the route structure, the persistence implementation and the automated tests.',
      },
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
          evidenceIds: ['node-package-manifest', 'node-automated-tests'],
        },
      ],
      evidence: [
        {
          evidenceId: 'node-server-source',
          label: 'Modular Express routes',
          description:
            'The backend separates the endpoints used to manage lists and tasks into focused route modules.',
        },
        {
          evidenceId: 'node-package-manifest',
          label: 'SQLite persistence',
          description:
            'Application data is stored in a local SQLite database instead of disappearing when the server restarts.',
        },
        {
          evidenceId: 'node-automated-tests',
          label: 'Automated tests',
          description:
            'The test suite verifies the expected behaviour of the main backend operations.',
        },
      ],
      links: [{ linkId: 'node-github', label: 'GitHub repository' }],
      assets: [],
      metadata: {
        title: 'ITS Node.js Project',
        description:
          'A compact backend for managing lists and tasks, designed to keep routes understandable, data persistent and behaviour easy to verify.',
        noIndex: false,
      },
    },
  ],
} satisfies SiteContent
