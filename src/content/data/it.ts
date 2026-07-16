import type { SiteContent } from '../schema'

export const italianContent = {
  locale: 'it',
  identity: {
    name: 'Niccolò Piazzi',
    descriptor: 'Sviluppatore full-stack e progettista di sistemi',
  },
  navigation: [
    { page: 'home', label: 'Home' },
    { page: 'projects', label: 'Progetti' },
    { page: 'skills', label: 'Competenze' },
    { page: 'method', label: 'Metodo' },
    { page: 'profile', label: 'Profilo' },
    { page: 'contact', label: 'Contatti' },
    { page: 'privacy', label: 'Privacy' },
  ],
  portfolio: {
    eyebrow: 'SOFTWARE, HARDWARE E PROBLEMI REALI',
    headline: 'Creo prodotti digitali utili.',
    introduction:
      'Progetto e realizzo software che collega persone, dati e dispositivi fisici — dalle API web ai sistemi per la casa intelligente.',
    training: {
      prefix: 'Sto completando il mio percorso di formazione come Full Stack Developer presso ',
      linkLabel: 'ITS Prodigi',
      suffix:
        ', dove sviluppo le mie competenze attraverso progetti pratici costruiti intorno a problemi tecnici reali.',
      url: 'https://www.itsprodigi.it/',
    },
    primaryCta: { kind: 'internal', page: 'projects', label: 'Esplora i miei progetti' },
    secondaryCta: { kind: 'external', url: 'https://github.com/pianic2', label: 'Vedi GitHub' },
    contactCta: { kind: 'internal', page: 'contact', label: 'Parliamone' },
    metadata: {
      title: 'Niccolò Piazzi | Portfolio di sviluppo software',
      description:
        'Realizzo progetti che collegano codice, dispositivi e persone — dai sensori per la casa intelligente alle API web. Ogni progetto spiega cosa funziona oggi, cosa deve ancora essere costruito e perché le scelte tecniche sono importanti.',
    },
  },
  projectExperience: {
    home: {
      eyebrow: 'PROGETTI SELEZIONATI',
      title: 'Origini diverse, un solo modo di lavorare.',
      introduction:
        'Due progetti sono stati sviluppati durante il mio percorso ITS. HomeEdge è invece il mio progetto portfolio personale a lungo termine: una piattaforma in evoluzione che intendo mantenere ed estendere oltre il corso.',
      supportingText:
        'Insieme mostrano come lavoro all’interno di requisiti didattici e come sviluppo nel tempo un prodotto indipendente.',
    },
    projects: {
      eyebrow: 'INDICE DEI PROGETTI',
      title: 'Progetti costruiti per imparare e per durare.',
      introduction:
        'I progetti ITS mostrano come rispondo a requisiti didattici definiti. HomeEdge mostra invece come affronto un prodotto indipendente che deve evolvere attraverso ricerca, decisioni, implementazione e revisione continua.',
      supportingText:
        'Apri un progetto per comprenderne il problema, la soluzione implementata, la fase attuale e le evidenze disponibili oggi.',
    },
    labels: {
      ideaLabel: 'L’idea',
      builtLabel: 'Cosa è stato costruito',
      valueLabel: 'Perché conta',
      stageLabel: 'A che punto è oggi',
      evidenceLabel: 'Cosa puoi verificare',
      repositoryLabel: 'Apri il repository',
      detailCtaLabel: 'Scopri il progetto',
      projectsCtaLabel: 'Esplora tutti i progetti',
      backToProjectsLabel: 'Torna ai progetti',
      projectOriginLabels: {
        'personal-long-term': 'Progetto personale a lungo termine',
        'its-training': 'Progetto del percorso ITS',
      },
    },
  },
  common: {
    projectLabel: 'Progetto',
    repositoryLabel: 'Apri il repository',
    evidenceLabel: 'Cosa puoi verificare',
    unknownProjectTitle: 'Progetto non trovato',
    unknownProjectDescription: 'Lo slug richiesto non corrisponde a un progetto pubblicato.',
    placeholderDescription:
      'Il contenuto della pagina sarà composto usando il content layer validato.',
    claimStatusLabels: {
      verified: 'Verificato',
      demonstrated: 'Supportato da evidenze',
      declared: 'Direzione documentata',
      planned: 'Prossimo passo pianificato',
    },
    evidenceTypeLabels: {
      repository: 'Repository',
      'pull-request': 'Pull request',
      documentation: 'Documentazione',
      test: 'Test',
      demo: 'Demo',
      screenshot: 'Screenshot',
      report: 'Report',
    },
  },
  capabilities: [
    { capabilityId: 'embedded-firmware', label: 'Sensori ESP32-C3' },
    { capabilityId: 'privacy-aware-design', label: 'Progettazione attenta alla privacy' },
    { capabilityId: 'technical-governance', label: 'Governance tecnica' },
    { capabilityId: 'laravel-api', label: 'API REST Laravel' },
    { capabilityId: 'sanctum-authentication', label: 'Autenticazione Sanctum' },
    { capabilityId: 'containerized-delivery', label: 'Docker e MySQL' },
    { capabilityId: 'node-api', label: 'Node.js ed Express' },
    { capabilityId: 'sqlite-persistence', label: 'Persistenza SQLite' },
    { capabilityId: 'automated-testing', label: 'Test automatici' },
  ],
  projects: [
    {
      projectId: 'homeedge-ai-platform',
      slug: 'homeedge-ai-platform',
      title: 'HomeEdge AI Platform',
      eyebrow: 'SMART HOME · SISTEMI EMBEDDED',
      detailEyebrow: 'SMART HOME · EDGE COMPUTING · GOVERNANCE',
      ctaLabel: 'Scopri HomeEdge',
      originDescription:
        'HomeEdge non è un esercizio didattico isolato. È il progetto con cui approfondisco nel tempo sistemi embedded, architettura di prodotto e governance tecnica responsabile.',
      narrative: {
        cardSummary:
          'Una piattaforma smart home modulare pensata per capire cosa accade in una stanza, mantenendo la raccolta dei dati locale, limitata e trasparente.',
        cardValue:
          'Unisce sensori fisici, architettura software e uso responsabile dei dati in un unico progetto.',
        heroSummary:
          'HomeEdge è una piattaforma smart home sperimentale costruita intorno a piccoli sensori per le stanze. Il suo obiettivo è raccogliere informazioni utili vicino al luogo in cui vengono generate, senza trasformare la casa in un sistema opaco.',
        idea: 'Molti prodotti smart home non spiegano chiaramente quali dati raccolgono, dove vengono inviati o come il sistema prende le proprie decisioni. HomeEdge sperimenta un approccio più trasparente: ogni dispositivo ha uno scopo limitato, ogni tipo di dato ha un confine esplicito e ogni scelta importante viene documentata.',
        built:
          'L’MVP attuale è concentrato su un nodo per stanza e porta basato su ESP32-C3. Misura temperatura e umidità, rileva localmente una presenza non identificativa e comunica se una porta è aperta o chiusa. Il repository definisce inoltre l’architettura, i rischi e le regole di lavoro che guideranno le fasi successive.',
        value:
          'Il progetto combina programmazione embedded, architettura software, progettazione di un prodotto mobile e governance tecnica responsabile. Il suo valore non è soltanto nel nodo sensore: mostra anche come far crescere un sistema connesso senza nasconderne i limiti.',
        currentStage:
          'HomeEdge si trova nella fase iniziale di sviluppo. Il nodo ESP32-C3 e i confini dell’MVP sono documentati. I servizi backend, l’applicazione mobile e le funzionalità assistite dall’AI sono direzioni pianificate che non sono ancora state dimostrate.',
        evidenceIntroduction:
          'Il repository pubblico permette di controllare i confini dell’MVP, i segnali inclusi, la direzione architetturale e le regole usate per evitare affermazioni non supportate.',
        transparency:
          'Il progetto viene gestito in modo trasparente attraverso GitHub, Jira e Confluence. GitHub contiene la fonte tecnica ufficiale, Jira traccia il lavoro pianificato e completato, mentre Confluence presenta agli stakeholder il contesto e i materiali di revisione.',
      },
      claims: [
        {
          id: 'sprint-zero-boundary',
          text: 'Il README documenta il confine del nodo MVP ESP32-C3 e i segnali inclusi.',
          status: 'demonstrated',
          evidenceIds: ['homeedge-mvp-scope'],
        },
        {
          id: 'target-services-unvalidated',
          text: 'I confini backend, mobile e AI restano esplicitamente [UNVALIDATED].',
          status: 'demonstrated',
          evidenceIds: ['homeedge-architecture-governance'],
        },
        {
          id: 'product-vision-boundaries',
          text: 'La Product Vision spiega cosa intende diventare HomeEdge, quali funzionalità appartengono all’MVP attuale e quali idee restano fuori dal suo ambito presente.',
          status: 'demonstrated',
          evidenceIds: ['homeedge-product-vision'],
        },
        {
          id: 'project-progress-stakeholder-review',
          text: 'HomeEdge usa Jira per tracciare il lavoro e gli stati di revisione, mentre Confluence offre uno spazio rivolto agli stakeholder con contesto, report e materiali di verifica.',
          status: 'demonstrated',
          evidenceIds: ['homeedge-stakeholder-review'],
        },
      ],
      evidence: [
        {
          evidenceId: 'homeedge-mvp-scope',
          label: 'Ambito dell’MVP e confini dei sensori',
          description:
            'Il repository definisce quali segnali può raccogliere il primo nodo per stanza e porta e quali tipi di dati restano esclusi dall’MVP.',
        },
        {
          evidenceId: 'homeedge-architecture-governance',
          label: 'Architettura e governance',
          description:
            'La documentazione spiega come vengono revisionate le decisioni tecniche, i rischi e le funzionalità future prima di presentarle come lavoro completato.',
        },
        {
          evidenceId: 'homeedge-product-vision',
          label: 'Visione del prodotto e confini dell’MVP',
          description:
            'La Product Vision spiega cosa intende diventare HomeEdge, quali funzionalità appartengono all’MVP attuale e quali idee restano fuori dal suo ambito presente.',
          linkLabel: 'Leggi la Product Vision',
        },
        {
          evidenceId: 'homeedge-stakeholder-review',
          label: 'Avanzamento del progetto e stakeholder review',
          description:
            'HomeEdge usa Jira per tracciare il lavoro e gli stati di revisione, mentre Confluence offre uno spazio rivolto agli stakeholder con contesto, report e materiali di verifica.',
          linkLabel: 'Apri lo spazio stakeholder di HomeEdge',
        },
      ],
      links: [{ linkId: 'homeedge-github', label: 'Repository GitHub' }],
      assets: [],
      metadata: {
        title: 'HomeEdge AI Platform',
        description:
          'HomeEdge è una piattaforma smart home sperimentale costruita intorno a piccoli sensori per le stanze. Il suo obiettivo è raccogliere informazioni utili vicino al luogo in cui vengono generate, senza trasformare la casa in un sistema opaco.',
        noIndex: false,
      },
    },
    {
      projectId: 'its-library-api-laravel',
      slug: 'api-libreria-its-laravel',
      title: 'ITS Library API',
      eyebrow: 'LIBRERIA DIGITALE · API LARAVEL',
      detailEyebrow: 'LARAVEL · API REST · LIBRERIA DIGITALE',
      ctaLabel: 'Esplora la Library API',
      narrative: {
        cardSummary:
          'Un backend didattico completo per organizzare libri, autori e categorie attraverso una API REST documentata e protetta.',
        cardValue:
          'Mostra come autenticazione, validazione, relazioni tra dati e gestione dei file lavorano insieme in un backend reale.',
        heroSummary:
          'ITS Library API è un backend didattico per gestire una collezione digitale di libri, autori e categorie attraverso endpoint chiari e documentati.',
        idea: 'Una libreria digitale richiede più di un elenco di titoli. Deve collegare i libri ai loro autori e alle categorie, validare le informazioni ricevute, proteggere le operazioni di modifica e offrire una configurazione che un altro sviluppatore possa riprodurre.',
        built:
          'L’API permette la lettura pubblica e protegge le operazioni di scrittura tramite autenticazione. Gestisce libri, autori e categorie, usa Laravel Sanctum per gli accessi tramite token, salva i dati in MySQL e può associare file di testo scaricabili ai libri. Docker prepara localmente l’applicazione e il database.',
        value:
          'Il progetto riunisce le parti essenziali di un vero backend: autenticazione, validazione, relazioni tra dati, archiviazione di file, errori prevedibili, documentazione e test automatici.',
        currentStage:
          'Il repository documenta gli endpoint disponibili, gli esempi di richiesta, le regole di validazione, l’avvio locale e le credenziali dimostrative. È una API didattica pensata per essere riprodotta localmente, non un servizio commerciale di libreria già pubblicato online.',
        evidenceIntroduction:
          'La documentazione pubblica mostra come avviare l’applicazione, ottenere un token di accesso, utilizzare gli endpoint disponibili e verificare il comportamento della validazione.',
      },
      claims: [
        {
          id: 'rest-resources',
          text: 'Il repository documenta risorse REST per libri, autori e categorie.',
          status: 'demonstrated',
          evidenceIds: ['library-rest-endpoints'],
        },
        {
          id: 'local-containers',
          text: 'Il setup locale documentato usa Docker Compose con Laravel e MySQL.',
          status: 'demonstrated',
          evidenceIds: ['library-docker-setup', 'library-validation-tests'],
        },
      ],
      evidence: [
        {
          evidenceId: 'library-rest-endpoints',
          label: 'Endpoint REST documentati',
          description:
            'Il README elenca le operazioni pubbliche e protette per libri, autori, categorie e autenticazione.',
        },
        {
          evidenceId: 'library-docker-setup',
          label: 'Configurazione Docker riproducibile',
          description:
            'Docker Compose avvia l’applicazione Laravel, MySQL e l’interfaccia di amministrazione del database attraverso un processo di configurazione automatico.',
        },
        {
          evidenceId: 'library-validation-tests',
          label: 'Validazione e test',
          description:
            'Il progetto documenta le regole applicate ai dati ricevuti e include test automatici per i principali comportamenti del backend.',
        },
      ],
      links: [{ linkId: 'library-github', label: 'Repository GitHub' }],
      assets: [],
      metadata: {
        title: 'ITS Library API',
        description:
          'ITS Library API è un backend didattico per gestire una collezione digitale di libri, autori e categorie attraverso endpoint chiari e documentati.',
        noIndex: false,
      },
    },
    {
      projectId: 'node-list-manager',
      slug: 'gestore-liste-node',
      title: 'Progetto ITS Node.js',
      eyebrow: 'GESTIONE ATTIVITÀ · BACKEND NODE.JS',
      detailEyebrow: 'NODE.JS · EXPRESS · SQLITE',
      ctaLabel: 'Esplora il progetto Node.js',
      narrative: {
        cardSummary:
          'Un backend compatto per gestire liste e attività, costruito con route Express chiare, dati persistenti in SQLite e test automatici.',
        cardValue:
          'Mostra come mantenere una piccola applicazione ordinata, verificabile e facile da estendere senza introdurre complessità inutile.',
        heroSummary:
          'Un backend compatto per gestire liste e attività, progettato per mantenere le route comprensibili, i dati persistenti e il comportamento facile da verificare.',
        idea: 'Anche una piccola applicazione per le attività può diventare difficile da mantenere quando route, persistenza e comportamento applicativo vengono mescolati. Questo progetto si concentra sulla separazione di queste responsabilità fin dall’inizio.',
        built:
          'Il backend espone route Express modulari per liste e attività, salva i dati in SQLite e include test automatici per i principali comportamenti.',
        value:
          'Il progetto è volutamente più piccolo di HomeEdge o della API Laravel. Il suo valore è mostrare come un backend focalizzato possa restare chiaro e verificabile senza aggiungere un’architettura che il problema non richiede.',
        currentStage:
          'Il repository attuale dimostra il flusso del backend, l’organizzazione delle route, la persistenza SQLite e i test automatici. È un progetto didattico Node.js, non un servizio di gestione attività pronto per la produzione.',
        evidenceIntroduction:
          'Il repository pubblico permette di controllare la struttura delle route, l’implementazione della persistenza e i test automatici.',
      },
      claims: [
        {
          id: 'express-route-modules',
          text: 'Il server Express monta moduli di route per liste e attività annidate.',
          status: 'demonstrated',
          evidenceIds: ['node-server-source'],
        },
        {
          id: 'sqlite-test-stack',
          text: 'Il manifest dichiara better-sqlite3, Jest e Supertest.',
          status: 'demonstrated',
          evidenceIds: ['node-package-manifest', 'node-automated-tests'],
        },
      ],
      evidence: [
        {
          evidenceId: 'node-server-source',
          label: 'Route Express modulari',
          description:
            'Il backend separa gli endpoint utilizzati per gestire liste e attività in moduli dedicati.',
        },
        {
          evidenceId: 'node-package-manifest',
          label: 'Persistenza SQLite',
          description:
            'I dati dell’applicazione vengono salvati in un database SQLite locale e non scompaiono quando il server viene riavviato.',
        },
        {
          evidenceId: 'node-automated-tests',
          label: 'Test automatici',
          description:
            'La suite di test verifica il comportamento atteso delle principali operazioni del backend.',
        },
      ],
      links: [{ linkId: 'node-github', label: 'Repository GitHub' }],
      assets: [],
      metadata: {
        title: 'Progetto ITS Node.js',
        description:
          'Un backend compatto per gestire liste e attività, progettato per mantenere le route comprensibili, i dati persistenti e il comportamento facile da verificare.',
        noIndex: false,
      },
    },
  ],
} satisfies SiteContent
