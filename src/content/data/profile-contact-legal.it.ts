import type { SiteContent } from '../schema'

export const italianProfileContactLegalContent = {
  profilePage: {
    hero: {
      eyebrow: 'PROFILO',
      title: 'Un percorso tecnico costruito progetto dopo progetto.',
      description:
        'Sono Niccolò Piazzi, Full Stack Developer in formazione. Mi interessa capire i problemi fino in fondo e trasformare ciò che imparo in software concreto, verificabile e facile da seguire.',
    },
    sections: [
      {
        id: 'profile-focus',
        title: 'Cosa mi interessa costruire',
        paragraphs: [
          'Lavoro su interfacce web, API, dati e dispositivi connessi. Mi piace seguire il percorso completo: chiarire il problema, scegliere una soluzione proporzionata e verificare che il risultato sia davvero utilizzabile.',
        ],
      },
      {
        id: 'profile-learning',
        title: 'Dove sto crescendo',
        paragraphs: [
          'Il percorso ITS mi permette di consolidare frontend, backend, database, testing e delivery attraverso progetti pratici. Nei progetti personali approfondisco invece sistemi embedded, smart home e progettazione a lungo termine.',
        ],
      },
      {
        id: 'profile-positioning',
        title: 'Come lavoro',
        paragraphs: [
          'Preferisco piccoli incrementi, documentazione chiara e affermazioni sostenute da evidenze. Non considero finito un progetto solo perché parte: contano anche limiti dichiarati, test e facilità di manutenzione.',
        ],
      },
    ],
    ctas: {
      projectsLabel: 'Esplora i progetti',
      contactLabel: 'Parliamone',
      githubLabel: 'Vedi GitHub',
    },
  },
  contactPage: {
    hero: {
      eyebrow: 'CONTATTI',
      title: 'Raccontami su cosa stai lavorando.',
      description:
        'Puoi scrivermi per opportunità junior, stage, collaborazioni formative o per confrontarti su un progetto software concreto.',
    },
    appropriateRequests: [
      'opportunità di stage o junior nel mondo dello sviluppo software',
      'collaborazioni formative e progetti con un problema tecnico ben definito',
      'confronti su frontend, backend, API, dati o sistemi connessi',
    ],
    messageGuidance: [
      'chi sei e qual è il contesto della richiesta',
      'su quale progetto o problema vuoi confrontarti',
      'quale tipo di collaborazione o risposta stai cercando',
    ],
    afterSubmit:
      'Il messaggio viene inoltrato tramite Web3Forms all’indirizzo configurato per il portfolio. Il portfolio non dispone di un backend proprio e non salva direttamente le submission.',
    form: {
      nameLabel: 'Nome',
      emailLabel: 'Email',
      messageLabel: 'Messaggio',
      submitLabel: 'Invia messaggio',
      submittingLabel: 'Invio in corso…',
      sendAnotherLabel: 'Invia un altro messaggio',
      requiredError: 'Questo campo è obbligatorio.',
      nameLengthError: 'Il nome può contenere al massimo 80 caratteri.',
      emailError: 'Inserisci un indirizzo email valido.',
      messageLengthError: 'Il messaggio deve contenere tra 20 e 2.000 caratteri.',
      configurationError: 'Il form non è disponibile in questo momento.',
      submissionError: 'Invio non riuscito. Controlla i dati e riprova.',
      successMessage: 'Messaggio inviato. Grazie, ti risponderò appena possibile.',
      privacyNotice:
        'Inserendo i dati accetti che nome, email e messaggio siano trasmessi a Web3Forms per ricevere una risposta. Non inviare dati sensibili.',
    },
    githubLabel: 'Contattami tramite GitHub',
  },
  privacyPage: {
    hero: {
      eyebrow: 'PRIVACY',
      title: 'Informazioni sul form di contatto.',
      description:
        'Questa informativa descrive in modo semplice quali dati vengono raccolti quando scegli di scrivermi dal portfolio.',
    },
    updatedLabel: 'Ultimo aggiornamento',
    updatedAt: '17 luglio 2026',
    intro:
      'Il portfolio è un sito statico pubblicato su GitHub Pages. Non dispone di un backend applicativo e non conserva direttamente i messaggi inviati dal form.',
    sections: [
      {
        id: 'privacy-data',
        title: 'Dati raccolti',
        paragraphs: [
          'Il form richiede nome, indirizzo email e contenuto del messaggio. Questi dati vengono forniti volontariamente per permettere una risposta alla richiesta.',
        ],
      },
      {
        id: 'privacy-purpose',
        title: 'Finalità e provider',
        paragraphs: [
          'I dati sono usati esclusivamente per rispondere alla richiesta e vengono trasmessi a Web3Forms, provider tecnico utilizzato per consegnare il messaggio all’indirizzo configurato. Il portfolio non persiste direttamente le submission.',
        ],
      },
      {
        id: 'privacy-sensitive-data',
        title: 'Cosa non inviare',
        paragraphs: [
          'Non inserire dati sanitari, finanziari, credenziali, documenti o altre categorie particolari di dati personali. Per informazioni sui trattamenti del provider consulta la sua documentazione privacy.',
        ],
      },
      {
        id: 'privacy-requests',
        title: 'Richieste e contatti',
        paragraphs: [
          'Per chiedere informazioni sui dati inviati o esercitare i diritti previsti dalla normativa applicabile puoi contattare il titolare tramite il profilo GitHub indicato qui sotto. Le richieste saranno valutate in base ai dati effettivamente disponibili e ai limiti del provider.',
        ],
      },
    ],
    providerLabel: 'Informativa privacy di Web3Forms',
    providerUrl: 'https://web3forms.com/privacy',
    ownerContactLabel: 'Profilo GitHub del titolare',
    ownerContactUrl: 'https://github.com/pianic2',
  },
} satisfies Pick<SiteContent, 'profilePage' | 'contactPage' | 'privacyPage'>
