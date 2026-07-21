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
        number: '01',
        eyebrow: 'IDENTITÀ',
        title: 'Seguo il problema attraverso tutto il prodotto.',
        paragraphs: [
          'Lavoro su interfacce web, API, dati e dispositivi connessi. Non mi interessa collezionare tecnologie, ma capire come le parti collaborano per creare qualcosa che le persone possano usare davvero.',
          'Per questo mi piace seguire il percorso completo: chiarire il bisogno, scegliere una soluzione proporzionata, costruirla e rendere il risultato ispezionabile.',
        ],
        highlights: ['Interfacce web', 'API e dati', 'Dispositivi connessi'],
      },
      {
        id: 'profile-learning',
        number: '02',
        eyebrow: 'CRESCITA',
        title: 'La formazione amplia lo sguardo. I progetti la rendono pratica.',
        paragraphs: [
          'Il percorso ITS mi permette di consolidare frontend, backend, database, testing e delivery attraverso attività pratiche. Ogni progetto aggiunge un vincolo da comprendere e una decisione da spiegare.',
          'Nei progetti personali approfondisco anche sistemi embedded, smart home e progettazione a lungo termine, mantenendo separate le idee pianificate da ciò che funziona già.',
        ],
        highlights: ['Formazione ITS', 'Progetti pratici', 'Limiti dichiarati'],
      },
      {
        id: 'profile-positioning',
        number: '03',
        eyebrow: 'MODO DI LAVORARE',
        title: 'Decisioni chiare, piccoli incrementi ed evidenze.',
        paragraphs: [
          'Preferisco piccoli incrementi, documentazione leggibile e affermazioni sostenute da evidenze. Non considero finito un progetto solo perché parte: contano anche test, accessibilità, manutenibilità e limiti dichiarati.',
          'Sto ancora imparando e lo comunico con onestà. Il mio obiettivo è contribuire con cura, fare domande migliori e rendere visibile il progresso alle persone con cui lavoro.',
        ],
        highlights: ['Perimetro proporzionato', 'Test e documentazione', 'Progresso trasparente'],
      },
    ],
    highlightsLabel: 'Cosa significa in pratica',
    ctas: {
      projectsLabel: 'Esplora i progetti',
      contactLabel: 'Parliamone',
      githubLabel: 'Vedi GitHub',
    },
    closing: {
      title: 'Il modo migliore per capire il mio lavoro è ispezionarlo.',
      description:
        'I progetti mostrano cosa ho costruito e imparato. Se il mio modo di affrontare i problemi è adatto a un’opportunità o collaborazione, raccontamela.',
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
    afterSubmit:
      'Web3Forms inoltra il messaggio all’indirizzo configurato per il portfolio. Il sito non dispone di un backend applicativo e non salva direttamente le richieste.',
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
} satisfies Pick<SiteContent, 'profilePage' | 'contactPage' | 'privacyPage'>
