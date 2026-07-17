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
        title: 'What I like building',
        paragraphs: [
          'I work across web interfaces, APIs, data and connected devices. I enjoy following the full path: clarify the problem, choose a proportionate solution and check that the result is genuinely usable.',
        ],
      },
      {
        id: 'profile-learning',
        title: 'Where I am growing',
        paragraphs: [
          'My ITS training is helping me strengthen frontend, backend, databases, testing and delivery through practical projects. In personal work I am exploring embedded systems, smart homes and long-term product design.',
        ],
      },
      {
        id: 'profile-positioning',
        title: 'How I work',
        paragraphs: [
          'I prefer small increments, clear documentation and claims backed by evidence. A project is not finished just because it starts: stated limits, tests and maintainability matter too.',
        ],
      },
    ],
    ctas: {
      projectsLabel: 'Explore my projects',
      contactLabel: 'Let’s talk',
      githubLabel: 'View GitHub',
    },
  },
  contactPage: {
    hero: {
      eyebrow: 'CONTACT',
      title: 'Tell me what you are working on.',
      description:
        'You can write to me about junior opportunities, internships, educational collaborations or a concrete software project.',
    },
    appropriateRequests: [
      'internships or junior opportunities in software development',
      'educational collaborations and projects with a clearly defined technical problem',
      'conversations about frontend, backend, APIs, data or connected systems',
    ],
    messageGuidance: [
      'who you are and the context of your request',
      'which project or problem you want to discuss',
      'what kind of collaboration or answer you are looking for',
    ],
    afterSubmit:
      'The message is forwarded through Web3Forms to the address configured for the portfolio. The portfolio has no own backend and does not directly store submissions.',
    form: {
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      submitLabel: 'Send message',
      submittingLabel: 'Sending…',
      sendAnotherLabel: 'Send another message',
      requiredError: 'This field is required.',
      nameLengthError: 'Your name can contain up to 80 characters.',
      emailError: 'Enter a valid email address.',
      messageLengthError: 'Your message must contain between 20 and 2,000 characters.',
      configurationError: 'The form is not available right now.',
      submissionError: 'The message could not be sent. Check the details and try again.',
      successMessage: 'Message sent. Thank you — I will reply as soon as I can.',
      privacyNotice:
        'By submitting your details, you agree that your name, email and message are sent to Web3Forms so a reply can be delivered. Do not include sensitive data.',
    },
    githubLabel: 'Contact me through GitHub',
  },
  privacyPage: {
    hero: {
      eyebrow: 'PRIVACY',
      title: 'How the contact form handles your data.',
      description:
        'This notice explains in plain language which data is collected when you choose to contact me through the portfolio.',
    },
    updatedLabel: 'Last updated',
    updatedAt: '17 July 2026',
    intro:
      'The portfolio is a static site published on GitHub Pages. It has no application backend and does not directly retain messages sent through the form.',
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
          'Do not include health or financial information, credentials, documents or other special categories of personal data. For information about the provider’s processing, consult its privacy documentation.',
        ],
      },
      {
        id: 'privacy-requests',
        title: 'Requests and contact',
        paragraphs: [
          'To ask about submitted data or exercise rights available under applicable law, contact the site owner through the GitHub profile linked below. Requests will be assessed against the data actually available and the provider’s limits.',
        ],
      },
    ],
    providerLabel: 'Web3Forms privacy information',
    providerUrl: 'https://web3forms.com/privacy',
    ownerContactLabel: 'Site owner’s GitHub profile',
    ownerContactUrl: 'https://github.com/pianic2',
  },
} satisfies Pick<SiteContent, 'profilePage' | 'contactPage' | 'privacyPage'>
