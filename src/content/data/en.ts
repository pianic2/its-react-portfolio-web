import type { SiteContent } from '../schema'
import { englishProfileContactLegalContent } from './profile-contact-legal.en'
import { englishSupportingContent } from './supporting.en'

export const englishContent = {
  locale: 'en',
  identity: { name: 'Niccolò Piazzi', descriptor: 'Full Stack Developer in training' },
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
    headline: 'I build useful digital products.',
    introduction:
      'I design and build software that connects people, data and physical devices — from web APIs to smart-home systems.',
    training: {
      prefix: 'I am currently training as a Full Stack Developer at ',
      linkLabel: 'ITS Prodigi',
      suffix:
        ', where I am strengthening my skills through practical projects designed around real technical problems.',
      url: 'https://www.itsprodigi.it/',
    },
    primaryCta: { kind: 'internal', page: 'projects', label: 'Explore my projects' },
    secondaryCta: { kind: 'external', url: 'https://github.com/pianic2', label: 'View GitHub' },
    contactCta: { kind: 'internal', page: 'contact', label: 'Let’s talk' },
    metadata: {
      title: 'Niccolò Piazzi | Software development portfolio',
      description:
        'I build projects that connect code, devices and people — from smart-home sensors to web APIs. Every project explains what works today, what still needs to be built and why the technical choices matter.',
    },
  },
  homePage: {
    hero: {
      eyebrow: 'FULL STACK DEVELOPER IN TRAINING',
      title: 'I build projects to understand how things really work.',
      description: {
        prefix: 'I’m Niccolò, a Full Stack Development student at ',
        linkLabel: 'ITS Prodigi',
        suffix:
          '. I work on web applications, backend systems and connected devices, turning what I learn into practical projects.',
        url: 'https://www.itsprodigi.it/',
      },
      primaryCtaLabel: 'View my projects',
      methodCtaLabel: 'See how I work',
      githubCtaLabel: 'Look at GitHub',
    },
    learning: {
      eyebrow: 'WHAT I’M LEARNING',
      title: 'From code to a complete product.',
      description:
        'During my ITS training, I’m learning how frontend, backend, databases and delivery tools fit together. In my projects I try to go beyond “it works”, paying attention to structure, testing, documentation and usability.',
      items: [
        {
          id: 'frontend',
          title: 'Frontend',
          description:
            'Responsive interfaces built with React and TypeScript, designed to remain clear and usable on mobile.',
        },
        {
          id: 'backend',
          title: 'Backend',
          description:
            'APIs, authentication, validation and data persistence, using different tools depending on the project.',
        },
        {
          id: 'product-design',
          title: 'Product design',
          description:
            'Defining the MVP, organising the work and documenting the decisions that shape the project.',
        },
        {
          id: 'devops',
          title: 'DevOps',
          description:
            'Build, test and deployment automation with CI/CD workflows, containerization and reproducible infrastructure.',
        },
        {
          id: 'data',
          title: 'Data',
          description:
            'Design and management of SQL and NoSQL databases, with a focus on data modeling, integrity and performance.',
        },
        {
          id: 'stack',
          title: 'Preferred Stack',
          description:
            'React, TypeScript, Django, Spring Boot, Expo, PostgreSQL, Docker, GitHub Actions, Azure and Linux.',
        },
      ],
    },
    selectedProjects: {
      eyebrow: 'SELECTED PROJECTS',
      title: 'Three projects from different stages of my journey.',
      description:
        'During the Full Stack Dev. course at ITS Prodigi, I developed several projects for my portfolio, including "Library API" (a REST backend with Laravel) and a "ToDo list" in Node.js. On the other hand, HomeEdge is an on-going personal project where I’m exploring smart-home systems, embedded development and long-term product design.',
    },
    skills: {
      eyebrow: 'TOOLS AND SKILLS',
      title: 'Different tools for different projects.',
      description:
        'Not every problem needs the same stack to be resolved. These are the parts I am currently working on most often.',
      groups: [
        {
          id: 'frontend',
          title: 'Frontend',
          stack: [
            { text: 'React', icon: 'devicon:react' },
            { text: 'React Native', icon: 'devicon:reactnative' },
            { text: 'Expo', icon: 'devicon:expo' },
            { text: 'TypeScript', icon: 'devicon:typescript' },
            { text: 'Material UI', icon: 'mdi:material-ui' },
            { text: 'accessibility', icon: 'mdi:accessibility' },
            { text: 'responsive design', icon: 'mdi:design' },
          ],
        },
        {
          id: 'backend',
          title: 'Backend',
          stack: [
            { text: 'Java', icon: 'devicon:java' },
            { text: 'Spring Boot', icon: 'devicon:spring' },
            { text: 'PHP', icon: 'devicon:php' },
            { text: 'Laravel', icon: 'devicon:laravel' },
            { text: 'Node.js', icon: 'devicon:nodejs' },
            { text: 'Express', icon: 'devicon:javascript' },
            { text: 'REST API', icon: 'mdi:api' },
          ],
        },
        {
          id: 'data',
          title: 'Data',
          description: 'PostgreSQL, MySQL, SQLite, validation and relationship modelling.',
          stack: [
            { text: 'PostgreSQL', icon: 'devicon:postgresql' },
            { text: 'MySQL', icon: 'devicon:mysql' },
            { text: 'SQLite', icon: 'devicon:sqlite' },
          ],
        },
        {
          id: 'delivery',
          title: 'Delivery',
          description:
            'Git, GitHub Actions, Docker, automated testing and technical documentation.',
          stack: [
            { text: 'Git', icon: 'devicon:git' },
            { text: 'GitHub Actions', icon: 'devicon:github' },
            { text: 'Docker', icon: 'devicon:docker' },
            { text: 'Technical Documentation', icon: 'material-symbols:docs' },
            { text: 'Automated Testing', icon: 'streamline-ultimate:ab-testing-monitors' },
          ],
        },
        {
          id: 'embedded',
          title: 'Embedded',
          description: 'ESP32-C3, C firmware, environmental sensors and edge-first design.',
          stack: [
            { text: 'ESP32', icon: 'mdi:react' },
            { text: 'C', icon: 'devicon:c' },
            { text: 'Sensors', icon: 'mdi:proximity-sensors' },
            { text: 'Edge', icon: 'carbon:iot-connect' },
          ],
        },
      ],
      labels: {
        skillCtaLabel: 'View my skill',
      },
    },
    process: {
      eyebrow: 'MY APPROACH',
      title: 'Understand first, then build.',
      description:
        'When I start a project, I try to avoid two common mistakes: writing code before the problem is clear and adding complexity that is not actually needed.',
      steps: [
        {
          id: 'define-problem',
          number: '01',
          title: 'Define the problem',
          description:
            'I clarify who the project is for, what it really needs to do and which limits it must respect.',
        },
        {
          id: 'first-result',
          number: '02',
          title: 'Choose a useful first result',
          description:
            'I identify a smaller version that can be built, tested and used as a concrete starting point.',
        },
        {
          id: 'small-increments',
          number: '03',
          title: 'Work in small increments',
          description: 'I keep code, tests and documentation aligned while the project grows.',
        },
        {
          id: 'check-claims',
          number: '04',
          title: 'Check what I claim',
          description:
            'I distinguish clearly between what works, what is documented and what is still planned.',
        },
      ],
      ctaLabel: 'Read about my approach',
    },
    contact: {
      eyebrow: 'CONTACT',
      title: 'I’m looking for opportunities to learn, contribute and challenge myself.',
      description:
        'I’m open to internships, junior opportunities, educational projects and collaborations in software development.',
      contactCtaLabel: 'Contact me',
      githubCtaLabel: 'Open GitHub',
    },
  },
  ...englishProfileContactLegalContent,
  ...englishSupportingContent,
  projectsPage: {
    hero: {
      eyebrow: 'MY PROJECTS',
      title: 'What I built and what I learned.',
      description:
        'This page brings together three projects with very different goals: a personal product that is still evolving and two projects developed during my ITS training.',
      supportingText:
        'Each project explains where it started, what has been built, its current stage and where to inspect the work.',
    },
    guide: {
      title: 'Projects with different goals',
      description:
        'The badge on each card explains where the project comes from. HomeEdge is a personal project I intend to keep developing; the other two were created through ITS assignments and exercises.',
      note: 'The evidence status explains whether a feature can already be inspected in code or documentation, or whether it represents a future direction.',
    },
    comparison: {
      eyebrow: 'COMPARISON',
      title: 'What changes from one project to another?',
      description: 'Each project pushed me to focus on a different kind of problem.',
      questions: {
        type: 'What kind of project is it?',
        learning: 'What am I exploring?',
        difficulty: 'What is the main challenge?',
      },
      projects: [
        {
          projectId: 'homeedge-ai-platform',
          type: 'A long-term personal product.',
          learning: 'Embedded systems, smart homes, architecture and responsible data use.',
          difficulty:
            'Growing different parts of the system without losing clarity about its current limits.',
        },
        {
          projectId: 'its-library-api-laravel',
          type: 'A complete backend developed during my ITS training.',
          learning: 'REST APIs, authentication, relational databases and Docker.',
          difficulty:
            'Keeping data, relationships, validation rules and protected operations consistent.',
        },
        {
          projectId: 'node-list-manager',
          type: 'A small and focused educational backend.',
          learning: 'Express, SQLite, route organisation and testing.',
          difficulty: 'Avoiding unnecessary complexity in a problem that can remain simple.',
        },
      ],
    },
    journey: {
      eyebrow: 'A LEARNING JOURNEY',
      title: 'These are not perfect projects. They are projects that are helping me grow.',
      description:
        'Each one focuses on a different part of development: starting from an idea, modelling data, building a backend, integrating hardware and documenting decisions. They also show limitations and work that still needs to be done.',
    },
    finalCta: {
      title: 'Want to see the work behind the projects?',
      description:
        'Open a project page, inspect the repositories or read more about how I organise my work.',
      homeEdgeLabel: 'Open HomeEdge',
      methodLabel: 'Read about my approach',
      contactLabel: 'Contact me',
    },
  },
  projectExperience: {
    home: {
      eyebrow: 'SELECTED PROJECTS',
      title: 'Three projects from different stages of my journey.',
      introduction:
        'The Library API and the Node.js project were developed during my ITS course. HomeEdge is my personal project, where I’m exploring smart-home systems, embedded development and long-term product design.',
      supportingText: 'PERSONAL PROJECT · ITS PROJECT',
    },
    projects: {
      eyebrow: 'PROJECT INDEX',
      title: 'Projects built for learning and for the long term.',
      introduction:
        'The ITS projects demonstrate how I respond to defined educational requirements. HomeEdge shows how I approach an independent product that must evolve through research, decisions, implementation and continuous review.',
      supportingText:
        'Open a project to understand the problem, the implemented solution, its current stage and the evidence available today.',
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
      projectOriginLabels: {
        'personal-long-term': 'PERSONAL PROJECT',
        'its-training': 'ITS PROJECT',
      },
      whatIWorkedOnLabel: 'What I worked on',
      futureImprovementLabel: 'What I would improve',
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
    evidenceTypeLabels: {
      repository: 'Repository',
      'pull-request': 'Pull request',
      documentation: 'Documentation',
      test: 'Test',
      demo: 'Demo',
      screenshot: 'Screenshot',
      report: 'Report',
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
      question:
        'How can a room provide useful information without turning the home into an opaque system?',
      supportingText:
        'The project is still at an early stage, but it is not intended as a one-off experiment. I plan to keep developing it, adding backend and mobile capabilities only after their boundaries have been properly tested.',
      whatIWorkedOn:
        'I defined the product vision, the MVP boundaries, the repository structure, the technical governance and the hardware validation path.',
      futureImprovement:
        'The next goal is to turn the hardware decisions and tests into a working node and gradually connect it to a backend and a mobile application.',
      originDescription:
        'HomeEdge is not a one-off course assignment. It is the project I use to explore embedded systems, product architecture and responsible technical governance over the long term.',
      narrative: {
        cardSummary:
          'HomeEdge starts with small ESP32-C3 nodes that measure temperature and humidity, detect local presence and report whether a door is open or closed.',
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
        transparency:
          'The project is managed transparently across GitHub, Jira and Confluence. GitHub contains the technical source of truth, Jira tracks planned and completed work, and Confluence presents project context and review material to stakeholders.',
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
          text: 'Backend, mobile and AI capabilities remain future directions rather than completed features.',
          status: 'demonstrated',
          evidenceIds: ['homeedge-architecture-governance'],
        },
        {
          id: 'product-vision-boundaries',
          text: 'The Product Vision explains what HomeEdge is intended to become, which capabilities belong to the current MVP and which ideas remain outside its present scope.',
          status: 'demonstrated',
          evidenceIds: ['homeedge-product-vision'],
        },
        {
          id: 'project-progress-stakeholder-review',
          text: 'HomeEdge uses Jira to track work and review status, while Confluence provides a stakeholder-facing space for project context, reports and review material.',
          status: 'demonstrated',
          evidenceIds: ['homeedge-stakeholder-review'],
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
        {
          evidenceId: 'homeedge-product-vision',
          label: 'Product vision and MVP boundaries',
          description:
            'The Product Vision explains what HomeEdge is intended to become, which capabilities belong to the current MVP and which ideas remain outside its present scope.',
          linkLabel: 'Read the Product Vision',
        },
        {
          evidenceId: 'homeedge-stakeholder-review',
          label: 'Project progress and stakeholder review',
          description:
            'HomeEdge uses Jira to track work and review status, while Confluence provides a stakeholder-facing space for project context, reports and review material.',
          linkLabel: 'Open the HomeEdge stakeholder space',
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
      eyebrow: 'LARAVEL · REST API',
      detailEyebrow: 'LARAVEL · REST API · DIGITAL LIBRARY',
      ctaLabel: 'Discover the Library API',
      question:
        'How can books, authors and categories be organised in a backend that is easy to run and maintain?',
      supportingText:
        'This project helped me work on the relationship between API design, database entities and protected write operations.',
      whatIWorkedOn:
        'I worked on the API structure, the relationships between books, authors and categories, authentication and the reproducibility of the Docker environment.',
      futureImprovement:
        'A possible next step would be adding a frontend interface and expanding file and permission management.',
      narrative: {
        cardSummary:
          'A Laravel API for managing a digital library, including token authentication, data validation, MySQL and Docker support.',
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
      eyebrow: 'NODE.JS · EXPRESS · SQLITE',
      detailEyebrow: 'NODE.JS · EXPRESS · SQLITE',
      ctaLabel: 'Discover the Node.js project',
      question: 'How complex does a backend need to be to manage lists and tasks?',
      supportingText:
        'The goal was not to create a large architecture, but to keep the code understandable and the project easy to verify.',
      whatIWorkedOn:
        'I organised the routes, SQLite persistence and tests, keeping the project small and readable.',
      futureImprovement:
        'I could extend input validation and add a simple browser interface for using the backend.',
      narrative: {
        cardSummary:
          'A compact Express and SQLite project with separated routes and automated tests for its main behaviour.',
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
