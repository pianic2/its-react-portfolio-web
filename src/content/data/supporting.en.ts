import type { SiteContent } from '../schema'

export const englishSupportingContent = {
  publicEvidence: [
    {
      evidenceId: 'portfolio-repository',
      label: 'Portfolio source code',
      description: 'Inspect the React application, shared components and localized routes.',
    },
    {
      evidenceId: 'portfolio-quality-workflow',
      label: 'Quality workflow',
      description: 'See the automated formatting, lint, type, content, test and build gates.',
    },
    {
      evidenceId: 'portfolio-content-model',
      label: 'Validated content model',
      description: 'Review the schemas and validation rules that keep the two locales aligned.',
    },
    {
      evidenceId: 'portfolio-pages-documentation',
      label: 'GitHub Pages delivery',
      description: 'Inspect the deployment, nested-route recovery and rollback documentation.',
    },
    {
      evidenceId: 'homeedge-repository',
      label: 'HomeEdge repository',
      description: 'Explore the public source for the connected-systems project.',
    },
    {
      evidenceId: 'homeedge-readme',
      label: 'HomeEdge decisions',
      description: 'Read the MVP boundary, architecture notes and current implementation limits.',
    },
    {
      evidenceId: 'homeedge-product-vision',
      label: 'HomeEdge Product Vision',
      description: 'Inspect the product direction and the boundaries of future work.',
    },
    {
      evidenceId: 'laravel-repository',
      label: 'Laravel API repository',
      description: 'Explore the backend repository developed during ITS training.',
    },
    {
      evidenceId: 'laravel-readme',
      label: 'Laravel API README',
      description: 'Inspect the documented REST resources, authentication and local setup.',
    },
    {
      evidenceId: 'node-repository',
      label: 'Node.js repository',
      description: 'Explore the focused Express and SQLite training project.',
    },
    {
      evidenceId: 'node-server-source',
      label: 'Express route source',
      description: 'Inspect the server entry point and its modular route composition.',
    },
    {
      evidenceId: 'node-ci-workflow',
      label: 'Node.js CI workflow',
      description: 'See the automated checks configured for the Node.js project.',
    },
  ],
  skillsPage: {
    hero: {
      eyebrow: 'APPLIED SKILLS',
      title: 'From a problem to software people can use, understand and verify.',
      description:
        'I work across interfaces, backend systems and connected devices, keeping user experience, application rules and delivery quality aligned. This page is not only a list of technologies: it shows how I can contribute and the public work available to support each claim.',
      primaryCta: {
        kind: 'internal',
        page: 'contact',
        label: 'Let’s discuss your project',
        analyticsId: 'skills-hero-contact',
      },
      secondaryCta: {
        kind: 'external',
        url: 'https://github.com/pianic2',
        label: 'See what I have built',
        analyticsId: 'skills-hero-github',
      },
    },
    groups: [
      {
        id: 'frontend-interfaces',
        title: 'Frontend and interfaces',
        problem:
          'Keep a product easy to use even as its content, actions and application states become more complex.',
        description:
          'I design interfaces that help people understand where they are, what they can do and what will happen next. I organise components, content and behaviour so the product remains consistent across mobile and desktop and can evolve without becoming confusing.',
        evidenceTitle: 'Verifiable interface and structure',
        tools: ['React', 'TypeScript', 'Material UI', 'Vite', 'responsive design', 'accessibility'],
        evidenceIds: ['portfolio-repository', 'portfolio-content-model'],
        references: [],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/its-react-portfolio-web',
          label: 'Explore the portfolio frontend',
          analyticsId: 'skills-frontend-repository',
        },
      },
      {
        id: 'backend-data',
        title: 'APIs, backend and data',
        problem:
          'Keep product rules, data and access behaviour correct as the system gains new features.',
        description:
          'I build APIs and backend logic by translating product rules into explicit responsibilities. Validation, authentication, persistence and data modelling must work together to prevent inconsistent information, unintended access and features that become difficult to change.',
        evidenceTitle: 'Inspectable rules and implementations',
        tools: ['Laravel', 'Sanctum', 'Node.js', 'Express', 'SQLite', 'PostgreSQL', 'MySQL'],
        evidenceIds: ['laravel-readme', 'node-server-source'],
        references: [],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2',
          label: 'Explore the backend projects',
          analyticsId: 'skills-backend-github',
        },
      },
      {
        id: 'connected-embedded',
        title: 'Connected and embedded systems',
        problem:
          'Turn signals from the physical world into useful information without hiding system limits and uncertainty.',
        description:
          'Through HomeEdge, I am working on the connection between firmware, sensors, edge devices and application software. I test real hardware behaviour, document decisions and clearly separate validated results from work that is still in progress: a useful prototype should also explain where it may fail.',
        evidenceTitle: 'Tests, decisions and project state',
        tools: ['ESP32-C3', 'C', 'sensors', 'edge systems'],
        evidenceIds: ['homeedge-repository', 'homeedge-readme'],
        references: [],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/homeedge-ai-platform',
          label: 'Explore the HomeEdge work',
          analyticsId: 'skills-homeedge-repository',
        },
      },
      {
        id: 'delivery-quality',
        title: 'Delivery, quality and documentation',
        problem:
          'Keep code, tests, documentation and project status aligned so the work can be verified and continued.',
        description:
          'I organise development so each change can be traced, reviewed and released through repeatable controls. Version control, automated tests, CI/CD pipelines and documentation reduce late-stage errors and help new contributors understand what changed, why it changed and how it was verified.',
        evidenceTitle: 'Process and automated controls',
        tools: ['Git', 'GitHub Actions', 'Docker', 'automated testing', 'CI/CD'],
        evidenceIds: ['portfolio-quality-workflow', 'portfolio-pages-documentation'],
        references: [],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/its-react-portfolio-web/blob/main/.github/workflows/quality.yml',
          label: 'Inspect the quality pipeline',
          analyticsId: 'skills-quality-workflow',
        },
      },
    ],
    labels: {
      pageIndexLabel: 'On this page',
      groupsIndexLabel: 'Skills',
      evidenceIndexLabel: 'Evidence',
      contactIndexLabel: 'Contact',
      groupsTitle: 'How I can contribute',
      evidenceTitle: 'Verifiable work',
      referencesTitle: 'Training and references',
    },
    closing: {
      title: 'Technology is a tool. Value comes from how it is used.',
      description:
        'I can contribute to a project by building interfaces, backend systems and connected products without losing sight of the people using them, the rules they must respect and the evidence needed to show that they actually work.',
      primaryCta: {
        kind: 'internal',
        page: 'contact',
        label: 'Tell me about the project',
        analyticsId: 'skills-closing-contact',
      },
      secondaryCta: {
        kind: 'external',
        url: 'https://github.com/pianic2',
        label: 'Explore all repositories',
        analyticsId: 'skills-closing-github',
      },
    },
  },
  methodPage: {
    hero: {
      eyebrow: 'HOW I WORK',
      title: 'Direction first. Then speed.',
      subtitle: 'Reduce errors and wasted effort before accelerating development.',
      description:
        'Code is only one part of the work. I first build the context needed to understand what is worth making, why it matters and which limits apply.',
      primaryCta: {
        kind: 'anchor',
        href: '#method-case-homeedge-architecture-decisions',
        label: 'See the method in practice',
        analyticsId: 'method-hero-cases',
      },
      secondaryCta: {
        kind: 'internal',
        page: 'contact',
        label: 'Tell me about the problem',
        analyticsId: 'method-hero-contact',
      },
    },
    foundations: {
      eyebrow: 'AGILE AND SCRUM AS TOOLS',
      title: 'Adapt the process to the problem, not the problem to the process.',
      body: 'I do not apply a method simply because it is well known. I choose the practices that genuinely clarify priorities, gather feedback and keep progress visible. Agile provides principles for working through adaptation and collaboration; Scrum is a framework made of accountabilities, events and artefacts.',
      status: 'Pragmatic approach, continuously evolving',
      closing:
        'In individual projects I do not simulate a complete Scrum team: I apply what makes the work easier to understand.',
      resources: [
        {
          id: 'agile-principles',
          label: 'Read the principles behind the Agile Manifesto',
          url: 'https://agilemanifesto.org/principles.html',
          language: 'en',
        },
        {
          id: 'scrum-guide',
          label: 'Read the Scrum Guide',
          url: 'https://scrumguides.org/scrum-guide.html',
          language: 'en',
        },
      ],
    },
    principles: [
      {
        id: 'govern-the-problem',
        number: '01',
        question: 'What must concretely improve for the people using the product?',
        title: 'Understand what actually needs to be solved',
        description:
          'A project becomes easier to understand when the problem is not confused with an imagined solution. I clarify who needs value, what change we are seeking and which assumptions can still change.',
        activities: ['Define the intended recipient', 'Make constraints and assumptions visible'],
        output: 'A visible goal, recipient, set of constraints and assumptions.',
        visual: 'problem',
        visualLabel: 'Problem and constraints',
      },
      {
        id: 'define-an-increment',
        number: '02',
        question: 'What is the smallest outcome that lets us learn something?',
        title: 'Choose the smallest step that creates learning',
        description:
          'Each phase should produce something that can be observed, tested or discussed. This lets later decisions rely on evidence rather than assumptions alone.',
        activities: ['Reduce the boundary', 'Define completion and expected feedback'],
        output: 'An implementable boundary, completion criterion and expected feedback.',
        visual: 'increment',
        visualLabel: 'Observable increment',
      },
      {
        id: 'make-decisions-explicit',
        number: '03',
        question: 'Which trade-offs are we accepting?',
        title: 'Every important choice should answer one question: why?',
        description:
          'I record alternatives, the decision and its rationale so a choice remains understandable to people who arrive later. A responsible decision does not necessarily remove risk: it makes the accepted risk explicit.',
        activities: ['Compare alternatives', 'Make rationale and residual risk explicit'],
        output: 'Decision, alternatives, rationale and residual risk.',
        visual: 'decision',
        visualLabel: 'Decision and risk',
      },
      {
        id: 'verify-in-short-cycles',
        number: '04',
        question: 'How do we discover early that something does not work?',
        title: 'Find errors early, while they are still cheaper to fix',
        description:
          'I keep implementation, tests, review and documentation close together. Each cycle should make it cheaper to find an error and easier to understand which part of the system is involved.',
        activities: ['Implement in increments', 'Run tests and review close to the change'],
        output: 'Implementation, tests, review and documentation kept close together.',
        visual: 'verification',
        visualLabel: 'Early verification',
      },
      {
        id: 'reconcile-real-state',
        number: '05',
        question: 'How can someone outside the work verify its real state?',
        title: 'Do not say it is done: prove it is done',
        description:
          'Documentation, repository, tests and deployment must describe the same real state. Verification should not depend on memory or informal context.',
        activities: ['Connect evidence to state', 'Reconcile documentation and delivery'],
        output: 'A coherent repository, quality gate, documentation and delivery state.',
        visual: 'state',
        visualLabel: 'Real state',
      },
    ],
    value: {
      eyebrow: 'THE PRACTICAL VALUE OF THE METHOD',
      title: 'Fewer surprises. More clarity. Better decisions.',
      introduction:
        'A good method is not measured by the number of steps. You recognise it by how many misunderstandings, late corrections and opaque decisions it helps avoid.',
      items: [
        'The boundary is discussed while it is still simple to change.',
        'Priorities are clarified before time is invested.',
        'The project does not depend on the memory of the person who built it.',
        'Decisions and risks remain traceable.',
        '“Almost done” is replaced by verifiable criteria.',
        'Reviewers know where to find the evidence.',
      ],
      closing: 'The result is a project that is easier to discuss, verify and correct.',
    },
    tools: {
      eyebrow: 'WORK INFRASTRUCTURE',
      title: 'Not more tools: clearer responsibilities',
      introduction:
        'The problem is not choosing the single best tool. It is preventing the same information from living in five different places and saying five different things.',
      closing:
        'Value does not come from one tool, but from continuity between backlog, decisions, implementation and evidence. A change should be reconstructable from its original reason to the delivered outcome.',
      flowTitle: 'Plan, explain, demonstrate and verify',
      items: [
        {
          id: 'jira',
          title: 'Jira',
          question: 'What needs to happen, and in what order?',
          role: 'The project operating plan',
          contents: 'Activities, priorities, dependencies and state.',
          example: 'A readable backlog and workflow.',
          link: {
            id: 'jira-product',
            label: 'Discover Jira',
            url: 'https://www.atlassian.com/software/jira',
          },
        },
        {
          id: 'confluence',
          title: 'Confluence',
          question: 'How to understand the project?',
          role: 'The readable view for stakeholders and collaborators',
          contents: 'Context, synthesis and understandable decisions.',
          example: 'Documentation that remains navigable over time.',
          link: {
            id: 'confluence-product',
            label: 'Discover Confluence',
            url: 'https://www.atlassian.com/software/confluence',
          },
        },
        {
          id: 'github',
          title: 'GitHub',
          question: 'Where can the work be verified?',
          role: 'The verifiable source of the work',
          contents: 'Code, tests, review, technical decisions and delivery.',
          example: 'Repository, quality workflow and pull requests.',
          link: {
            id: 'github-repository',
            label: 'Verify the repository on GitHub',
            url: 'https://github.com/pianic2/its-react-portfolio-web',
          },
        },
      ],
    },
    examples: [
      {
        id: 'homeedge-architecture-decisions',
        eyebrow: 'REAL CASE 01 — PRODUCT GOVERNANCE',
        title: 'A roadmap is not a feature already built',
        body: 'Ambition and transparency can coexist: I can explain where the project is going without confusing the future with the present.',
        decision:
          'I therefore separated the MVP boundary, accepted architecture decisions, capabilities that have actually been verified and capabilities that remain planned.',
        result:
          'Anyone opening the repository can understand what exists today without reconstructing the project history from conversations or implicit intentions.',
        evidenceLinks: [
          {
            evidenceId: 'homeedge-readme',
            label: 'Inspect scope and decisions',
            description: 'Read the MVP boundary and documented architecture decisions.',
          },
          {
            evidenceId: 'homeedge-product-vision',
            label: 'Read the evolving vision',
            description: 'Distinguish future direction from capabilities already verified.',
          },
        ],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/homeedge-ai-platform/blob/main/README.md',
          label: 'Read the HomeEdge decisions',
          analyticsId: 'method-homeedge-decisions',
        },
      },
      {
        id: 'portfolio-quality-gates',
        eyebrow: 'REAL CASE 02 — QUALITY GATES',
        title: 'Errors should stop before they reach the user',
        body: 'A rule written in a document can be forgotten. An automated rule can stop a regression.',
        decision:
          'The pipeline is therefore not merely technical automation. Formatting, lint, TypeScript, content validation, tests and build are explicit release conditions.',
        result:
          'Publication does not depend on the memory of the person doing the work. Every change follows the same verifiable sequence.',
        evidenceLinks: [
          {
            evidenceId: 'portfolio-quality-workflow',
            label: 'Open the quality workflow',
            description: 'Inspect the gates that precede release.',
          },
          {
            evidenceId: 'portfolio-pages-documentation',
            label: 'Verify the GitHub Pages deploy',
            description: 'Review the publication and route-recovery path.',
          },
        ],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/its-react-portfolio-web/blob/main/.github/workflows/quality.yml',
          label: 'Inspect the Quality workflow',
          analyticsId: 'method-quality-workflow',
        },
      },
      {
        id: 'portfolio-content-contract',
        eyebrow: 'REAL CASE 03 — CONTENT ARCHITECTURE',
        title: 'A bilingual page should not tell two different truths',
        body: 'Even one sentence can introduce a regression: a wrong link, inconsistent data or an unaligned translation changes what the product communicates.',
        decision:
          'The portfolio treats shared data, localized copy, claim status and evidence as entities connected by identifiers and validation rules.',
        result:
          'Content is not considered correct simply because it appears on screen. It must respect relationships, language parity and the real state of the evidence supporting it.',
        evidenceLinks: [
          {
            evidenceId: 'portfolio-content-model',
            label: 'Explore the content model',
            description: 'Read the schemas, identifiers and locale-parity rules.',
          },
          {
            evidenceId: 'portfolio-repository',
            label: 'Open the repository',
            description: 'Verify how the model is used in the code.',
          },
        ],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/its-react-portfolio-web/blob/main/docs/content/irpw-9-content-model.md',
          label: 'Explore the content model',
          analyticsId: 'method-content-model',
        },
      },
    ],
    agenticDelivery: {
      eyebrow: 'HUMAN–AGENT DELIVERY',
      title: 'When producing becomes easier, good decisions matter more',
      subtitle:
        'AI lowers the cost of execution, but it does not remove responsibility. Value shifts towards the quality of instructions, context and verification.',
      responseLabel: 'HOW I RESPOND',
      paragraphs: [
        'I use these terms as operational lenses, not universal standards: intent engineering, context engineering and bounded delegation help make what is entrusted to an agent more precise.',
        'A verification-first workflow keeps tests, review, evidence and security close together. Agentic execution must leave readable traces rather than turn production speed into a shortcut around judgment.',
        'Human accountability and agentic orchestration therefore remain central: the person owns the outcome, while the agent operates within a declared and verifiable boundary.',
      ],
      concepts: [
        {
          id: 'intent-engineering',
          title: 'Intent engineering',
          description: 'Define the result, limits and non-scope precisely before action.',
        },
        {
          id: 'context-engineering',
          title: 'Context engineering',
          description:
            'Provide the agent with the right repository, decisions, rules and current state.',
        },
        {
          id: 'bounded-delegation',
          title: 'Bounded delegation',
          description: 'Delegate execution without delegating responsibility for the outcome.',
        },
        {
          id: 'verification-first-workflows',
          title: 'Verification-first workflows',
          description: 'Decide first how to check the result using tests, review and evidence.',
        },
        {
          id: 'human-accountability',
          title: 'Human accountability',
          description: 'The final decision and risk acceptance remain human.',
        },
        {
          id: 'traceable-agent-execution',
          title: 'Traceable agent execution',
          description: 'Make what the agent produced possible to verify.',
        },
        {
          id: 'agentic-orchestration',
          title: 'Agentic orchestration',
          description: 'Coordinate agents with distinct roles within an explicit flow.',
        },
      ],
      workflowTitle: 'A verification-oriented agentic pipeline',
      workflow: ['INTENT', 'CONTEXT', 'DELEGATION', 'VERIFICATION', 'INTEGRATION'],
      workflowDescriptions: [
        'What should change, and within which limits.',
        'Which information is needed to work with care.',
        'Which task is delegated and what output is expected.',
        'How the result is checked through tests, review and evidence.',
        'How verified work enters the project.',
      ],
      closing: 'Speed remains useful only when the result can be verified.',
      resourceTitle: 'Further reading',
      resource: {
        id: 'openai-building-ai-agents',
        label: 'Learn more about agentic systems',
        url: 'https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/',
        language: 'en',
      },
    },
    labels: {
      examplesTitle: 'Projects that show the method',
      decisionLabel: 'Decision',
      resultLabel: 'Observable result',
      outputLabel: 'Output',
      evidenceTitle: 'Public evidence',
      resourcesTitle: 'External resources',
    },
    closing: {
      title: 'Start from the goal, then decide what to build',
      description:
        'Whether it is an internship, a collaboration or a project, I want to understand the problem before proposing a solution.',
      microcopy:
        'You do not need complete specifications: a goal and a few constraints are enough.',
      primaryCta: {
        kind: 'internal',
        page: 'contact',
        label: 'Tell me about the project',
        analyticsId: 'method-closing-contact',
      },
      secondaryCta: {
        kind: 'external',
        url: 'https://github.com/pianic2/its-react-portfolio-web',
        label: 'See how I work',
        analyticsId: 'method-closing-github',
      },
    },
  },
} satisfies Pick<SiteContent, 'publicEvidence' | 'skillsPage' | 'methodPage'>
