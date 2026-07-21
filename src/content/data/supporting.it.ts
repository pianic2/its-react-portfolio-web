import type { SiteContent } from '../schema'

export const italianSupportingContent = {
  publicEvidence: [
    {
      evidenceId: 'portfolio-repository',
      label: 'Repository del portfolio',
      description:
        'Verifica architettura React, componenti condivisi, routing localizzato e organizzazione del codice.',
    },
    {
      evidenceId: 'portfolio-quality-workflow',
      label: 'Pipeline di qualità',
      description:
        'Controlla i gate automatici che proteggono formattazione, lint, tipi, contenuti, test e build.',
    },
    {
      evidenceId: 'portfolio-content-model',
      label: 'Modello dei contenuti',
      description:
        'Esamina schemi, identificatori e regole di validazione che mantengono coerenti contenuti ed evidenze.',
    },
    {
      evidenceId: 'portfolio-pages-documentation',
      label: 'Delivery su GitHub Pages',
      description:
        'Verifica processo di deploy, gestione delle route annidate e strategia di ripristino.',
    },
    {
      evidenceId: 'homeedge-repository',
      label: 'Repository HomeEdge',
      description:
        'Esplora codice, struttura e stato attuale del progetto dedicato ai sistemi connessi.',
    },
    {
      evidenceId: 'homeedge-readme',
      label: 'Confini e decisioni di HomeEdge',
      description:
        'Leggi perimetro dell’MVP, scelte architetturali, limiti noti e capacità non ancora implementate.',
    },
    {
      evidenceId: 'homeedge-product-vision',
      label: 'Visione di prodotto HomeEdge',
      description:
        'Consulta la direzione evolutiva del prodotto e la separazione tra obiettivi futuri e stato corrente.',
    },
    {
      evidenceId: 'laravel-repository',
      label: 'Repository API Laravel',
      description:
        'Esplora il backend REST sviluppato durante il percorso ITS e la relativa organizzazione applicativa.',
    },
    {
      evidenceId: 'laravel-readme',
      label: 'Documentazione API Laravel',
      description:
        'Verifica risorse REST, autenticazione, requisiti di avvio e modalità di esecuzione locale.',
    },
    {
      evidenceId: 'node-repository',
      label: 'Repository Node.js',
      description: 'Esamina il progetto didattico costruito con Express e SQLite.',
    },
    {
      evidenceId: 'node-server-source',
      label: 'Composizione delle route Express',
      description:
        'Controlla l’entry point del server e la separazione modulare delle responsabilità HTTP.',
    },
    {
      evidenceId: 'node-ci-workflow',
      label: 'Controlli automatici Node.js',
      description: 'Verifica i controlli di integrazione continua configurati per il progetto.',
    },
  ],
  skillsPage: {
    hero: {
      eyebrow: 'COMPETENZE APPLICATE',
      title: 'Dal problema al software che puoi usare, capire e verificare.',
      description:
        'Lavoro su interfacce, backend e sistemi connessi cercando di tenere insieme esperienza d’uso, regole applicative e qualità del processo. Qui non trovi soltanto tecnologie: trovi il contributo che posso portare e il lavoro pubblico con cui verificarlo.',
      primaryCta: {
        kind: 'internal',
        page: 'contact',
        label: 'Parliamo del tuo progetto',
        analyticsId: 'skills-hero-contact',
      },
      secondaryCta: {
        kind: 'external',
        url: 'https://github.com/pianic2',
        label: 'Guarda cosa ho costruito',
        analyticsId: 'skills-hero-github',
      },
    },
    groups: [
      {
        id: 'frontend-interfaces',
        title: 'Frontend e interfacce',
        problem:
          'Rendere semplice da usare un prodotto, anche quando contenuti, azioni e stati diventano complessi.',
        description:
          'Progetto interfacce che aiutano le persone a capire subito dove si trovano, cosa possono fare e quale sarà il risultato delle loro azioni. Organizzo componenti, contenuti e comportamenti affinché il prodotto rimanga coerente su mobile e desktop e possa evolvere senza diventare confuso.',
        evidenceTitle: 'Interfaccia e struttura verificabili',
        tools: ['React', 'TypeScript', 'Material UI', 'Vite', 'responsive design', 'accessibility'],
        evidenceIds: ['portfolio-repository', 'portfolio-content-model'],
        references: [],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/its-react-portfolio-web',
          label: 'Esplora il frontend del portfolio',
          analyticsId: 'skills-frontend-repository',
        },
      },
      {
        id: 'backend-data',
        title: 'API, backend e dati',
        problem:
          'Fare in modo che dati, accessi e regole del prodotto continuino a comportarsi correttamente mentre il sistema cresce.',
        description:
          'Costruisco API e logica backend traducendo le regole del prodotto in responsabilità esplicite. Validazione, autenticazione, persistenza e modellazione dei dati non sono parti isolate: devono collaborare per evitare informazioni incoerenti, accessi non previsti e funzionalità difficili da modificare.',
        evidenceTitle: 'Regole e implementazioni consultabili',
        tools: ['Laravel', 'Sanctum', 'Node.js', 'Express', 'SQLite', 'PostgreSQL', 'MySQL'],
        evidenceIds: ['laravel-readme', 'node-server-source'],
        references: [],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2',
          label: 'Esplora i progetti backend',
          analyticsId: 'skills-backend-github',
        },
      },
      {
        id: 'connected-embedded',
        title: 'Sistemi connessi ed embedded',
        problem:
          'Trasformare segnali provenienti dal mondo fisico in informazioni utilizzabili, senza nascondere limiti e incertezze del sistema.',
        description:
          'Con HomeEdge sto lavorando sul collegamento tra firmware, sensori, dispositivi edge e software applicativo. Verifico il comportamento reale dell’hardware, documento le decisioni e separo chiaramente ciò che è stato provato da ciò che è ancora in sviluppo: un prototipo utile deve dichiarare anche dove può fallire.',
        evidenceTitle: 'Test, decisioni e stato del progetto',
        tools: ['ESP32-C3', 'C', 'sensors', 'edge systems'],
        evidenceIds: ['homeedge-repository', 'homeedge-readme'],
        references: [],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/homeedge-ai-platform',
          label: 'Scopri il lavoro su HomeEdge',
          analyticsId: 'skills-homeedge-repository',
        },
      },
      {
        id: 'delivery-quality',
        title: 'Delivery, qualità e documentazione',
        problem:
          'Mantenere allineati codice, test, documentazione e stato del lavoro, così che il progetto possa essere verificato e continuato.',
        description:
          'Organizzo il lavoro affinché ogni modifica possa essere ricostruita, revisionata e rilasciata con controlli ripetibili. Versionamento, test automatici, pipeline CI/CD e documentazione riducono gli errori tardivi e permettono a chi entra nel progetto di capire cosa è cambiato, perché e con quali verifiche.',
        evidenceTitle: 'Processo e controlli automatici',
        tools: ['Git', 'GitHub Actions', 'Docker', 'automated testing', 'CI/CD'],
        evidenceIds: ['portfolio-quality-workflow', 'portfolio-pages-documentation'],
        references: [],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/its-react-portfolio-web/blob/main/.github/workflows/quality.yml',
          label: 'Esamina la pipeline di qualità',
          analyticsId: 'skills-quality-workflow',
        },
      },
    ],
    labels: {
      pageIndexLabel: 'In questa pagina',
      groupsIndexLabel: 'Competenze',
      evidenceIndexLabel: 'Evidenze',
      contactIndexLabel: 'Contatto',
      groupsTitle: 'Come posso contribuire',
      evidenceTitle: 'Lavoro verificabile',
      referencesTitle: 'Formazione e riferimenti',
    },
    closing: {
      title: 'La tecnologia serve. Il valore nasce da come viene usata.',
      description:
        'Posso contribuire a un progetto costruendo interfacce, backend e sistemi connessi senza perdere di vista chi li userà, le regole che devono rispettare e le prove necessarie per capire se funzionano davvero.',
      primaryCta: {
        kind: 'internal',
        page: 'contact',
        label: 'Raccontami il progetto',
        analyticsId: 'skills-closing-contact',
      },
      secondaryCta: {
        kind: 'external',
        url: 'https://github.com/pianic2',
        label: 'Esplora tutti i repository',
        analyticsId: 'skills-closing-github',
      },
    },
  },
  methodPage: {
    hero: {
      eyebrow: 'IL MIO METODO',
      title: 'Prima la direzione. Poi la velocità.',
      subtitle: 'Ridurre errori e lavoro inutile prima di accelerare lo sviluppo.',
      description:
        'Il codice è solo una parte del lavoro. Prima costruisco il contesto necessario per capire che cosa vale davvero la pena realizzare, perché e con quali limiti.',
      primaryCta: {
        kind: 'anchor',
        href: '#method-case-homeedge-architecture-decisions',
        label: 'Guarda il metodo applicato',
        analyticsId: 'method-hero-cases',
      },
      secondaryCta: {
        kind: 'internal',
        page: 'contact',
        label: 'Raccontami il problema',
        analyticsId: 'method-hero-contact',
      },
    },
    foundations: {
      eyebrow: 'AGILE E SCRUM COME STRUMENTI',
      title: 'Adattare il processo al problema, non il problema al processo.',
      body: 'Non applico un metodo solo perché è conosciuto. Scelgo le pratiche che aiutano davvero a chiarire le priorità, raccogliere feedback e controllare l’avanzamento. Agile offre principi per lavorare attraverso adattamento e collaborazione; Scrum è invece un framework composto da responsabilità, eventi e artefatti.',
      status: 'Approccio pragmatico in continua evoluzione',
      closing:
        'Nei progetti individuali non simulo un team Scrum completo: applico in modo dichiarato ciò che rende il lavoro più leggibile e trasparente.',
      resources: [
        {
          id: 'agile-principles',
          label: 'Leggi i principi del Manifesto Agile',
          url: 'https://agilemanifesto.org/iso/it/principles.html',
          language: 'it',
        },
        {
          id: 'scrum-guide',
          label: 'Consulta la Scrum Guide ufficiale',
          url: 'https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Italian.pdf',
          language: 'it',
        },
      ],
    },
    principles: [
      {
        id: 'govern-the-problem',
        number: '01',
        question: 'Che cosa deve migliorare concretamente per chi userà il prodotto?',
        title: 'Capire che cosa dobbiamo davvero risolvere',
        description:
          'Un progetto diventa più leggibile quando il problema non viene confuso con la soluzione immaginata. Prima chiarisco chi deve ottenere valore, quale cambiamento stiamo cercando e quali assunzioni possono ancora cambiare.',
        activities: ['Definire il destinatario', 'Esplicitare vincoli e assunzioni'],
        output: 'Obiettivo, destinatario, vincoli e assunzioni visibili.',
        visual: 'problem',
        visualLabel: 'Problema e vincoli',
      },
      {
        id: 'define-an-increment',
        number: '02',
        question: 'Qual è il più piccolo risultato che permette di imparare qualcosa?',
        title: 'Scegliere il passo più piccolo che permette di imparare',
        description:
          'Ogni fase deve produrre qualcosa che possa essere osservato, provato o discusso. In questo modo le decisioni successive si basano su evidenze e non soltanto su ipotesi.',
        activities: ['Ridurre il perimetro', 'Definire completamento e feedback atteso'],
        output: 'Perimetro implementabile, criterio di completamento e feedback atteso.',
        visual: 'increment',
        visualLabel: 'Incremento osservabile',
      },
      {
        id: 'make-decisions-explicit',
        number: '03',
        question: 'Quali trade-off stiamo accettando?',
        title: 'Ogni scelta importante deve poter rispondere alla domanda: perché?',
        description:
          'Registro alternative, decisione e motivazione perché una scelta resti comprensibile anche a chi arriva dopo. Una decisione responsabile non elimina necessariamente il rischio: rende chiaro quale rischio stiamo accettando.',
        activities: ['Confrontare alternative', 'Rendere espliciti motivazione e rischio residuo'],
        output: 'Decisione, alternative, motivazione e rischio residuo.',
        visual: 'decision',
        visualLabel: 'Decisione e rischio',
      },
      {
        id: 'verify-in-short-cycles',
        number: '04',
        question: 'Come scopriamo presto che qualcosa non funziona?',
        title: 'Scoprire presto gli errori, quando correggerli costa meno',
        description:
          'Avvicino implementazione, test, review e documentazione. Ogni ciclo deve rendere più economico scoprire un errore e più semplice capire quale parte del sistema è coinvolta.',
        activities: ['Implementare per incrementi', 'Eseguire test e review vicini al cambiamento'],
        output: 'Implementazione, test, review e documentazione mantenuti vicini.',
        visual: 'verification',
        visualLabel: 'Verifica anticipata',
      },
      {
        id: 'reconcile-real-state',
        number: '05',
        question: 'Come può una persona esterna verificare lo stato reale?',
        title: 'Non dire che è fatto: dimostrare che è fatto',
        description:
          'Documentazione, repository, test e deploy devono descrivere lo stesso stato reale. La verifica deve essere possibile senza dipendere dalla memoria o da contesto informale.',
        activities: ['Collegare evidenze e stato', 'Riconciliare documentazione e delivery'],
        output: 'Repository, quality gate, documentazione e delivery coerenti.',
        visual: 'state',
        visualLabel: 'Stato reale',
      },
    ],
    value: {
      eyebrow: 'IL VALORE CONCRETO DEL METODO',
      title: 'Meno sorprese. Più chiarezza. Decisioni migliori.',
      introduction:
        'Un buon metodo non si misura dal numero di passaggi. Si riconosce da quante incomprensioni, correzioni tardive e decisioni opache riesce a evitare.',
      items: [
        'Il perimetro viene discusso quando è ancora semplice cambiarlo.',
        'Le priorità vengono chiarite prima di investire tempo.',
        'Il progetto non dipende dalla memoria di chi lo ha costruito.',
        'Decisioni e rischi rimangono rintracciabili.',
        '“Quasi finito” viene sostituito da criteri verificabili.',
        'Chi revisiona sa dove trovare le prove.',
      ],
      closing: 'Il risultato è un progetto più facile da discutere, verificare e correggere.',
    },
    tools: {
      eyebrow: 'INFRASTRUTTURA DI LAVORO',
      title: 'Non più strumenti: responsabilità più chiare',
      introduction:
        'Il problema non è scegliere lo strumento migliore in assoluto. È evitare che la stessa informazione viva in cinque posti diversi e dica cinque cose diverse.',
      closing:
        'Il valore non nasce dal singolo strumento, ma dalla continuità tra backlog, decisioni, implementazione ed evidenze. Una modifica deve poter essere ricostruita dal motivo iniziale fino al risultato consegnato.',
      flowTitle: 'Pianifica, spiega, dimostra e verifica',
      items: [
        {
          id: 'jira',
          title: 'Jira',
          question: 'Che cosa va fatto e in quale ordine?',
          role: 'Il piano operativo del progetto',
          contents: 'Attività, priorità, dipendenze e stato.',
          example: 'Backlog e workflow leggibili.',
          link: {
            id: 'jira-product',
            label: 'Scopri Jira',
            url: 'https://www.atlassian.com/it/software/jira',
          },
        },
        {
          id: 'confluence',
          title: 'Confluence',
          question: 'Come orientarsi nel progetto?',
          role: 'La vista leggibile per stakeholder e collaboratori',
          contents: 'Contesto, sintesi e decisioni comprensibili.',
          example: 'Documentazione navigabile nel tempo.',
          link: {
            id: 'confluence-product',
            label: 'Scopri Confluence',
            url: 'https://www.atlassian.com/it/software/confluence',
          },
        },
        {
          id: 'github',
          title: 'GitHub',
          question: 'Dove verificare ciò che è stato fatto?',
          role: 'La fonte verificabile del lavoro',
          contents: 'Codice, test, review, decisioni tecniche e delivery.',
          example: 'Repository, quality workflow e pull request.',
          link: {
            id: 'github-repository',
            label: 'Verifica il repository su GitHub',
            url: 'https://github.com/pianic2/its-react-portfolio-web',
          },
        },
      ],
    },
    examples: [
      {
        id: 'homeedge-architecture-decisions',
        eyebrow: 'CASO REALE 01 — GOVERNANCE DEL PRODOTTO',
        title: 'Una roadmap non è una funzionalità già costruita',
        body: 'Ambizione e trasparenza possono convivere: posso raccontare dove vuole arrivare il progetto senza confondere il futuro con il presente.',
        decision:
          'Ho quindi distinto il perimetro dell’MVP, le decisioni architetturali accettate, le capacità realmente verificate e quelle ancora pianificate.',
        result:
          'Chi apre il repository può capire che cosa esiste oggi senza dover ricostruire la storia del progetto da conversazioni o intenzioni implicite.',
        evidenceLinks: [
          {
            evidenceId: 'homeedge-readme',
            label: 'Esamina perimetro e decisioni',
            description: 'Leggi il perimetro dell’MVP e le decisioni architetturali documentate.',
          },
          {
            evidenceId: 'homeedge-product-vision',
            label: 'Leggi la visione evolutiva',
            description: 'Distingui direzione futura e capacità già verificate.',
          },
        ],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/homeedge-ai-platform/blob/main/README.md',
          label: 'Leggi confini e decisioni di HomeEdge',
          analyticsId: 'method-homeedge-decisions',
        },
      },
      {
        id: 'portfolio-quality-gates',
        eyebrow: 'CASO REALE 02 — QUALITY GATES',
        title: 'Gli errori devono fermarsi prima di arrivare all’utente',
        body: 'Una regola scritta in un documento può essere dimenticata. Una regola automatizzata può bloccare una regressione.',
        decision:
          'Per questo la pipeline non viene usata come semplice automazione tecnica. Formattazione, lint, TypeScript, validazione dei contenuti, test e build costituiscono condizioni esplicite di rilascio.',
        result:
          'La pubblicazione non dipende dalla memoria di chi esegue il lavoro. Ogni modifica attraversa la stessa sequenza verificabile.',
        evidenceLinks: [
          {
            evidenceId: 'portfolio-quality-workflow',
            label: 'Apri il quality workflow',
            description: 'Controlla i gate che precedono il rilascio.',
          },
          {
            evidenceId: 'portfolio-pages-documentation',
            label: 'Verifica il deploy su GitHub Pages',
            description: 'Esamina il percorso di pubblicazione e recupero delle route.',
          },
        ],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/its-react-portfolio-web/blob/main/.github/workflows/quality.yml',
          label: 'Esamina il Quality workflow',
          analyticsId: 'method-quality-workflow',
        },
      },
      {
        id: 'portfolio-content-contract',
        eyebrow: 'CASO REALE 03 — CONTENT ARCHITECTURE',
        title: 'Una pagina bilingue non dovrebbe raccontare due verità diverse',
        body: 'Anche una frase può introdurre una regressione: un link errato, un dato incoerente o una traduzione non allineata cambiano ciò che il prodotto comunica.',
        decision:
          'Il portfolio tratta dati condivisi, copy localizzato, stato dei claim ed evidenze come entità collegate da identificatori e regole di validazione.',
        result:
          'Un contenuto non viene considerato corretto soltanto perché appare sullo schermo. Deve rispettare relazioni, parità linguistica e stato reale delle prove che lo sostengono.',
        evidenceLinks: [
          {
            evidenceId: 'portfolio-content-model',
            label: 'Esplora il content model',
            description: 'Leggi schemi, identificatori e regole di parità tra le lingue.',
          },
          {
            evidenceId: 'portfolio-repository',
            label: 'Apri il repository',
            description: 'Verifica come il modello viene utilizzato nel codice.',
          },
        ],
        cta: {
          kind: 'external',
          url: 'https://github.com/pianic2/its-react-portfolio-web/blob/main/docs/content/irpw-9-content-model.md',
          label: 'Esplora il modello dei contenuti',
          analyticsId: 'method-content-model',
        },
      },
    ],
    agenticDelivery: {
      eyebrow: 'HUMAN–AGENT DELIVERY',
      title: 'Quando produrre diventa più facile, decidere bene diventa più importante',
      subtitle:
        'L’AI riduce il costo dell’esecuzione, ma non elimina la responsabilità. Il valore si sposta verso la qualità delle istruzioni, del contesto e della verifica.',
      responseLabel: 'COME RISPONDO',
      paragraphs: [
        'Uso questi termini come lenti operative, non come standard universali: intent engineering, context engineering e bounded delegation aiutano a rendere più preciso ciò che viene affidato a un agente.',
        'Un verification-first workflow mantiene vicini test, review, evidenze e sicurezza. L’esecuzione agentica deve lasciare tracce leggibili e non trasformare la velocità di produzione in una scorciatoia per saltare il giudizio.',
        'Human accountability e agentic orchestration restano quindi centrali: la persona mantiene responsabilità sul risultato, mentre l’agente opera entro un perimetro dichiarato e verificabile.',
      ],
      concepts: [
        {
          id: 'intent-engineering',
          title: 'Intent engineering',
          description:
            'Definire con precisione il risultato, i limiti e ciò che non rientra nel compito.',
        },
        {
          id: 'context-engineering',
          title: 'Context engineering',
          description: 'Fornire all’agente repository, decisioni, regole e stato corrente utili.',
        },
        {
          id: 'bounded-delegation',
          title: 'Bounded delegation',
          description: 'Delegare l’esecuzione senza delegare la responsabilità sul risultato.',
        },
        {
          id: 'verification-first-workflows',
          title: 'Verification-first workflows',
          description: 'Decidere prima come controllare il risultato con test, review ed evidenze.',
        },
        {
          id: 'human-accountability',
          title: 'Human accountability',
          description: 'La decisione finale e l’accettazione del rischio rimangono umane.',
        },
        {
          id: 'traceable-agent-execution',
          title: 'Traceable agent execution',
          description: 'Rendere verificabile ciò che l’agente ha prodotto.',
        },
        {
          id: 'agentic-orchestration',
          title: 'Agentic orchestration',
          description: 'Coordinare agenti con ruoli distinti dentro un flusso esplicito.',
        },
      ],
      workflowTitle: 'Una pipeline agentica orientata alla verifica',
      workflow: ['INTENTO', 'CONTESTO', 'DELEGA', 'VERIFICA', 'INTEGRAZIONE'],
      workflowDescriptions: [
        'Che cosa deve cambiare e con quali limiti.',
        'Quali informazioni servono per lavorare con criterio.',
        'Quale compito viene affidato e quale output ci si aspetta.',
        'Come si controlla il risultato con test, review ed evidenze.',
        'Come il lavoro verificato entra nel progetto.',
      ],
      closing: 'La velocità resta utile solo quando il risultato è verificabile.',
      resourceTitle: 'Risorsa di approfondimento',
      resource: {
        id: 'openai-building-ai-agents',
        label: 'Approfondisci i sistemi agentici',
        url: 'https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/',
        language: 'en',
        note: 'Risorsa in inglese',
      },
    },
    labels: {
      examplesTitle: 'Il metodo applicato a casi reali',
      decisionLabel: 'Decisione',
      resultLabel: 'Risultato osservabile',
      outputLabel: 'Output',
      evidenceTitle: 'Evidenze verificabili',
      resourcesTitle: 'Risorse esterne',
    },
    closing: {
      title: 'Partiamo dall’obiettivo, poi scegliamo che cosa costruire',
      description:
        'Che si tratti di uno stage, una collaborazione o un progetto, mi interessa capire il problema prima di proporre una soluzione.',
      microcopy: 'Non servono specifiche complete: bastano un obiettivo e alcuni vincoli.',
      primaryCta: {
        kind: 'internal',
        page: 'contact',
        label: 'Raccontami il progetto',
        analyticsId: 'method-closing-contact',
      },
      secondaryCta: {
        kind: 'external',
        url: 'https://github.com/pianic2/its-react-portfolio-web',
        label: 'Verifica come lavoro',
        analyticsId: 'method-closing-github',
      },
    },
  },
} satisfies Pick<SiteContent, 'publicEvidence' | 'skillsPage' | 'methodPage'>
