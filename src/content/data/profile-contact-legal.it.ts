import type { SiteContent } from '../schema'

export const italianProfileContactLegalContent = {
  profilePage: {
    hero: {
      eyebrow: 'PROFILO',
      title:
        'Ho trovato nell’informatica il modo di trasformare curiosità e logica in qualcosa di concreto.',
      description:
        'Il mio percorso non è iniziato da una linea retta, ma da una domanda ricorrente: come funzionano davvero le cose? Oggi porto quella curiosità nello sviluppo software, costruendo progetti e competenze con metodo, trasparenza e continuità.',
    },
    sections: [
      {
        id: 'profile-vocation',
        number: '01',
        eyebrow: 'VOCAZIONE',
        title: 'Prima del codice c’era il bisogno di capire.',
        paragraphs: [
          'Mi hanno sempre attirato i problemi che richiedono ragionamento, pazienza e la capacità di collegare elementi diversi. Nell’informatica ho riconosciuto un ambiente in cui questa inclinazione poteva diventare operativa: non limitarsi a comprendere un sistema, ma provare a costruirne uno.',
          'Programmare mi permette di passare da un’idea astratta a un risultato osservabile. Ogni interfaccia, API o automazione diventa un modo per verificare una scelta, correggerla e imparare qualcosa di nuovo.',
        ],
        highlights: ['Curiosità per i sistemi', 'Logica applicata', 'Idee trasformate in software'],
      },
      {
        id: 'profile-self-taught',
        number: '02',
        eyebrow: 'FORMAZIONE AUTODIDATTA',
        title: 'Ho iniziato con ciò che avevo: tempo limitato, risorse online e molta pratica.',
        paragraphs: [
          'Durante gli studi universitari e mentre lavoravo ho iniziato a formarmi da autodidatta. Ho seguito documentazione, corsi e guide, ma soprattutto ho cercato di trasformare ogni concetto in un esercizio o in un piccolo progetto che mi costringesse a confrontarmi con problemi reali.',
          'È stata una fase umile e disordinata, ma fondamentale. Mi ha insegnato a cercare informazioni, riconoscere ciò che non capivo, procedere per tentativi controllati e non aspettare condizioni perfette per iniziare.',
        ],
        highlights: [
          'Studio autonomo',
          'Università e lavoro',
          'Apprendimento attraverso la pratica',
        ],
      },
      {
        id: 'profile-its',
        number: '03',
        eyebrow: 'ITS PRODIGI',
        title:
          'Oggi sto trasformando l’apprendimento individuale in una preparazione professionale.',
        paragraphs: [
          'Il percorso Full Stack Developer presso ITS Prodigi mi sta dando una struttura più solida. Lavoro su frontend, backend, database, testing e delivery, confrontandomi con vincoli, scadenze, revisioni e progetti che richiedono continuità.',
          'Sto imparando anche a rendere il lavoro comprensibile agli altri: organizzare il backlog, documentare le decisioni, raccogliere evidenze e distinguere chiaramente ciò che è già realizzato da ciò che è ancora pianificato.',
        ],
        highlights: [
          'Formazione Full Stack',
          'Progetti strutturati',
          'Collaborazione e tracciabilità',
        ],
      },
    ],
    highlightsLabel: 'Punti chiave',
    usefulLinks: {
      eyebrow: 'LINK UTILI',
      title: 'Altri luoghi in cui puoi seguire il mio percorso.',
      description:
        'Profili esterni ed evidenze che completano il portfolio. Questa raccolta crescerà insieme alle piattaforme su cui studio, pubblico e metto alla prova le mie competenze.',
      items: [
        {
          id: 'leetcode',
          label: 'LeetCode',
          description:
            'Il profilo dove raccolgo la pratica su algoritmi, strutture dati e problem solving.',
          url: 'https://leetcode.com/u/pianic2',
          ctaLabel: 'Apri il profilo LeetCode',
        },
      ],
    },
    ctas: {
      projectsLabel: 'Apri LeetCode',
      contactLabel: 'Contattami',
      githubLabel: 'Esplora GitHub',
    },
    closing: {
      title: 'Cerco contesti in cui continuare a crescere contribuendo davvero.',
      description:
        'Sono aperto a stage curricolari, opportunità junior, piccoli progetti ben delimitati e collaborazioni formative. Se pensi che il mio percorso possa essere utile al tuo contesto, raccontami il problema e gli obiettivi.',
    },
  },
  contactPage: {
    hero: {
      eyebrow: 'CONTATTI',
      title: 'Raccontami su cosa stai lavorando.',
      description:
        'Sono disponibile per opportunità junior, stage, collaborazioni formative e confronti attorno a un problema software concreto.',
    },
    requestsTitle: 'Buoni motivi per scrivermi',
    guidanceTitle: 'Un primo messaggio utile',
    formTitle: 'Iniziamo la conversazione',
    formDescription:
      'Condividi il contesto necessario per capire l’opportunità o il problema. Ogni campo obbligatorio è indicato chiaramente.',
    appropriateRequests: [
      'opportunità di stage o junior nello sviluppo software',
      'collaborazioni formative con un problema tecnico ben definito',
      'confronti su frontend, backend, API, dati o sistemi connessi',
    ],
    messageGuidance: [
      'presentati e indica il contesto della richiesta',
      'descrivi il progetto, l’opportunità o il problema da discutere',
      'spiega quale tipo di collaborazione o risposta stai cercando',
    ],
    form: {
      requiredHint: 'I campi contrassegnati da * sono obbligatori.',
      nameLabel: 'Nome',
      nameHelper: 'Massimo 80 caratteri.',
      emailLabel: 'Email',
      emailHelper: 'La userò solo per rispondere a questo messaggio.',
      messageLabel: 'Messaggio',
      messageHelper: 'Da 20 a 2.000 caratteri.',
      submitLabel: 'Invia messaggio',
      submittingLabel: 'Invio in corso…',
      sendAnotherLabel: 'Invia un altro messaggio',
      requiredError: 'Questo campo è obbligatorio.',
      nameLengthError: 'Il nome può contenere al massimo 80 caratteri.',
      emailError: 'Inserisci un indirizzo email valido.',
      messageLengthError: 'Il messaggio deve contenere tra 20 e 2.000 caratteri.',
      configurationError:
        'Il form non è disponibile in questo momento. Puoi comunque contattarmi su GitHub.',
      submissionError: 'Invio non riuscito. Controlla la connessione e riprova.',
      successMessage: 'Messaggio inviato. Grazie, ti risponderò appena possibile.',
      privacyNotice:
        'Nome, email e messaggio vengono trasmessi a Web3Forms per la consegna. Non inviare password, dati finanziari, sanitari o altre informazioni sensibili.',
    },
    githubLabel: 'Usa GitHub in alternativa',
  },
  privacyPage: {
    hero: {
      eyebrow: 'PRIVACY',
      title: 'Informazioni sul form di contatto.',
      description:
        'Una spiegazione sintetica dei dati raccolti, della finalità e del provider che consegna il messaggio.',
    },
    updatedLabel: 'Ultimo aggiornamento',
    updatedAt: '21 luglio 2026',
    intro:
      'Questo portfolio è un sito statico pubblicato su GitHub Pages. Non dispone di un backend applicativo e non conserva direttamente i messaggi inviati dal form di contatto.',
    indexLabel: 'In questa pagina',
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
          'I dati sono usati esclusivamente per rispondere alla richiesta e vengono trasmessi a Web3Forms, provider tecnico utilizzato per consegnare il messaggio all’indirizzo configurato. Il portfolio non conserva direttamente le richieste.',
        ],
      },
      {
        id: 'privacy-sensitive-data',
        title: 'Cosa non inviare',
        paragraphs: [
          'Non inserire password, credenziali, dati sanitari o finanziari, documenti o altre informazioni personali sensibili. Per i dettagli sul trattamento lato provider consulta l’informativa di Web3Forms.',
        ],
      },
      {
        id: 'privacy-requests',
        title: 'Richieste e contatti',
        paragraphs: [
          'Per chiedere informazioni sui dati inviati o esercitare i diritti previsti dalla normativa applicabile puoi contattare il titolare tramite il profilo GitHub indicato sotto. Le richieste saranno valutate in base ai dati effettivamente disponibili e ai limiti del provider.',
        ],
      },
    ],
    providerHeading: 'Provider del servizio',
    providerLabel: 'Leggi l’informativa privacy di Web3Forms',
    providerUrl: 'https://web3forms.com/privacy',
    ownerContactHeading: 'Contatto privacy',
    ownerContactLabel: 'Contatta il titolare tramite GitHub',
    ownerContactUrl: 'https://github.com/pianic2',
  },
  notFoundPage: {
    title: 'Pagina non trovata',
    description: 'La pagina richiesta non esiste o non è più disponibile.',
    ctaLabel: 'Torna alla home',
  },
} satisfies Pick<SiteContent, 'profilePage' | 'contactPage' | 'privacyPage' | 'notFoundPage'>
