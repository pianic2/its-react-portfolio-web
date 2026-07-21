import type { SiteContent } from '../schema'

export const englishProfileContactLegalContent = {
  profilePage: {
    hero: {
      eyebrow: 'PROFILE',
      title: 'A technical path built one project at a time.',
      description:
        'I’m Niccolò Piazzi, a Full Stack Developer in training. I like understanding problems properly and turning what I learn into software that is concrete, verifiable and easy to follow.',
    },
    sections: [
      {
        id: 'profile-focus',
        number: '01',
        eyebrow: 'IDENTITY',
        title: 'I follow the problem across the whole product.',
        paragraphs: [
          'I work across web interfaces, APIs, data and connected devices. What interests me is not collecting technologies, but understanding how the parts work together to create something people can actually use.',
          'That is why I like following the full path: clarify the need, choose a proportionate solution, build it and make the result inspectable.',
        ],
        highlights: ['Web interfaces', 'APIs and data', 'Connected devices'],
      },
      {
        id: 'profile-learning',
        number: '02',
        eyebrow: 'GROWTH',
        title: 'Training gives me breadth. Projects turn it into practice.',
        paragraphs: [
          'My ITS training is helping me strengthen frontend, backend, databases, testing and delivery through practical work. Each project gives me a different constraint to understand and a new decision to explain.',
          'In personal work I am also exploring embedded systems, smart homes and long-term product design, while keeping planned ideas separate from what already works.',
        ],
        highlights: ['ITS training', 'Practical projects', 'Declared limits'],
      },
      {
        id: 'profile-positioning',
        number: '03',
        eyebrow: 'WORKING STYLE',
        title: 'Clear decisions, small increments and evidence.',
        paragraphs: [
          'I prefer small increments, readable documentation and claims backed by evidence. A project is not finished just because it starts: tests, accessibility, maintainability and stated limits matter too.',
          'I am still learning, and I treat that honestly. My goal is to contribute with care, ask better questions and make progress visible to the people working with me.',
        ],
        highlights: ['Proportionate scope', 'Tests and documentation', 'Transparent progress'],
      },
    ],
    highlightsLabel: 'What this means in practice',
    ctas: {
      projectsLabel: 'Explore my projects',
      contactLabel: 'Let’s talk',
      githubLabel: 'View GitHub',
    },
    closing: {
      title: 'The best way to understand my work is to inspect it.',
      description:
        'Projects show what I have built and learned. If the way I approach problems fits an opportunity or collaboration, tell me about it.',
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
    afterSubmit:
      'Web3Forms forwards the message to the address configured for this portfolio. The site has no application backend and does not directly store submissions.',
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
