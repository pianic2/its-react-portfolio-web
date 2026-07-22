import type { SiteContent } from '../schema'

export const englishProfileContactLegalContent = {
  profilePage: {
    hero: {
      eyebrow: 'PROFILE',
      title: 'I found in software the way to turn curiosity and logic into something concrete.',
      description:
        'My path did not begin as a straight line, but with a recurring question: how do things really work? Today I bring that curiosity into software development, building projects and skills with method, transparency and continuity.',
    },
    sections: [
      {
        id: 'profile-vocation',
        number: '01',
        eyebrow: 'VOCATION',
        title: 'Before the code, there was a need to understand.',
        paragraphs: [
          'I have always been drawn to problems that require reasoning, patience and the ability to connect different elements. In software I found an environment where this inclination could become practical: not only understanding a system, but trying to build one.',
          'Programming lets me move from an abstract idea to an observable result. Every interface, API or automation becomes a way to test a decision, correct it and learn something new.',
        ],
        highlights: ['Curiosity about systems', 'Applied logic', 'Ideas turned into software'],
      },
      {
        id: 'profile-self-taught',
        number: '02',
        eyebrow: 'SELF-TAUGHT PHASE',
        title: 'I started with what I had: limited time, online resources and a lot of practice.',
        paragraphs: [
          'While attending university and working, I began learning independently. I used documentation, courses and guides, but above all I tried to turn every concept into an exercise or small project that forced me to face real problems.',
          'It was a humble and sometimes untidy phase, but a fundamental one. It taught me how to search for information, identify what I did not understand, proceed through controlled attempts and start without waiting for perfect conditions.',
        ],
        highlights: ['Independent study', 'University and work', 'Learning through practice'],
      },
      {
        id: 'profile-its',
        number: '03',
        eyebrow: 'ITS PRODIGI',
        title: 'Today I am turning individual learning into professional preparation.',
        paragraphs: [
          'The Full Stack Developer programme at ITS Prodigi is giving my path a stronger structure. I work across frontend, backend, databases, testing and delivery while dealing with constraints, deadlines, reviews and projects that require continuity.',
          'I am also learning to make the work understandable to others: organise a backlog, document decisions, collect evidence and distinguish clearly between what has already been delivered and what is still planned.',
        ],
        highlights: [
          'Full Stack training',
          'Structured projects',
          'Collaboration and traceability',
        ],
      },
    ],
    highlightsLabel: 'Key points',
    usefulLinks: {
      eyebrow: 'USEFUL LINKS',
      title: 'Other places where you can follow my progress.',
      description:
        'External profiles and evidence that complement this portfolio. This collection will grow with the platforms where I study, publish and test my skills.',
      items: [
        {
          id: 'leetcode',
          label: 'LeetCode',
          description:
            'The profile where I collect my practice with algorithms, data structures and problem solving.',
          url: 'https://leetcode.com/u/pianic2',
          ctaLabel: 'Open my LeetCode profile',
        },
      ],
    },
    ctas: {
      projectsLabel: 'Open LeetCode',
      contactLabel: 'Contact me',
      githubLabel: 'Explore GitHub',
    },
    closing: {
      title: 'I am looking for environments where I can keep growing while contributing real work.',
      description:
        'I am open to curricular internships, junior opportunities, small well-scoped projects and educational collaborations. If you think my path could fit your context, tell me about the problem and the objectives.',
    },
  },
  contactPage: {
    hero: {
      eyebrow: 'CONTACT',
      title: 'Tell me what you are working on.',
      description:
        'I’m open to junior opportunities, internships, educational collaborations and conversations around a concrete software problem.',
    },
    requestsTitle: 'Good reasons to get in touch',
    guidanceTitle: 'A useful first message',
    formTitle: 'Start the conversation',
    formDescription:
      'Share enough context for me to understand the opportunity or problem. Every required field is clearly marked.',
    appropriateRequests: [
      'internships or junior opportunities in software development',
      'educational collaborations with a clearly defined technical problem',
      'conversations about frontend, backend, APIs, data or connected systems',
    ],
    messageGuidance: [
      'introduce yourself and the context of your request',
      'describe the project, opportunity or problem you want to discuss',
      'explain what kind of collaboration or answer you are looking for',
    ],
    form: {
      requiredHint: 'Fields marked with * are required.',
      nameLabel: 'Name',
      nameHelper: 'Up to 80 characters.',
      emailLabel: 'Email',
      emailHelper: 'I will only use it to reply to this message.',
      messageLabel: 'Message',
      messageHelper: 'Between 20 and 2,000 characters.',
      submitLabel: 'Send message',
      submittingLabel: 'Sending…',
      sendAnotherLabel: 'Send another message',
      requiredError: 'This field is required.',
      nameLengthError: 'Your name can contain up to 80 characters.',
      emailError: 'Enter a valid email address.',
      messageLengthError: 'Your message must contain between 20 and 2,000 characters.',
      configurationError:
        'The form is not available right now. You can still contact me on GitHub.',
      submissionError: 'The message could not be sent. Check your connection and try again.',
      successMessage: 'Message sent. Thank you — I will reply as soon as I can.',
      privacyNotice:
        'Your name, email and message are sent to Web3Forms for delivery. Do not include passwords, financial, health or other sensitive data.',
    },
    githubLabel: 'Use GitHub instead',
  },
  privacyPage: {
    hero: {
      eyebrow: 'PRIVACY',
      title: 'How the contact form handles your data.',
      description:
        'A concise account of what is collected, why it is needed and which provider delivers the message.',
    },
    updatedLabel: 'Last updated',
    updatedAt: '21 July 2026',
    intro:
      'This portfolio is a static site published on GitHub Pages. It has no application backend and does not directly retain messages sent through the contact form.',
    indexLabel: 'On this page',
    sections: [
      {
        id: 'privacy-data',
        title: 'Data collected',
        paragraphs: [
          'The form asks for your name, email address and message. You provide these details voluntarily so that your request can receive a reply.',
        ],
      },
      {
        id: 'privacy-purpose',
        title: 'Purpose and provider',
        paragraphs: [
          'The data is used only to reply to your request and is sent to Web3Forms, the technical provider used to deliver the message to the configured address. The portfolio does not directly retain submissions.',
        ],
      },
      {
        id: 'privacy-sensitive-data',
        title: 'What not to send',
        paragraphs: [
          'Do not include passwords, credentials, health or financial information, documents or other sensitive personal data. For details about provider-side processing, consult Web3Forms’ privacy information.',
        ],
      },
      {
        id: 'privacy-requests',
        title: 'Requests and contact',
        paragraphs: [
          'To ask about submitted data or exercise rights available under applicable law, contact the site owner through the GitHub profile below. Requests will be assessed against the data actually available and the provider’s limits.',
        ],
      },
    ],
    providerHeading: 'Service provider',
    providerLabel: 'Read the Web3Forms privacy information',
    providerUrl: 'https://web3forms.com/privacy',
    ownerContactHeading: 'Privacy contact',
    ownerContactLabel: 'Contact the site owner on GitHub',
    ownerContactUrl: 'https://github.com/pianic2',
  },
} satisfies Pick<SiteContent, 'profilePage' | 'contactPage' | 'privacyPage'>
