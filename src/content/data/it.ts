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
    headline: 'Portfolio di sviluppo software',
    introduction: 'Progetti tecnici descritti attraverso evidenze pubbliche e limiti espliciti.',
    primaryCta: { kind: 'internal', page: 'contact', label: 'Contatti' },
    secondaryCta: { kind: 'external', url: 'https://github.com/pianic2', label: 'GitHub' },
    metadata: {
      title: 'Niccolò Piazzi | Portfolio di sviluppo software',
      description:
        'Portfolio bilingue di progetti software con claim collegati a evidenze pubbliche.',
    },
  },
  projectExperience: {
    home: {
      eyebrow: 'Progetti selezionati',
      title: 'Tre sistemi, tre vincoli distinti',
      introduction:
        'Una selezione mirata di lavori embedded, Laravel e Node.js, con ogni affermazione collegata a evidenze pubbliche nei repository.',
      allProjectsLabel: 'Esplora tutti i progetti',
    },
    projects: {
      eyebrow: 'Indice progetti',
      title: 'Prima le evidenze, poi gli aggettivi',
      introduction:
        'Tre progetti tecnici presentati attraverso ambito documentato, limiti attuali e sorgenti ispezionabili.',
    },
    detail: {
      backLabel: 'Torna ai progetti',
      claimsTitle: 'Claim ed evidenze',
      repositoryLabel: 'Apri il repository',
      readProjectLabel: 'Leggi il progetto',
    },
  },
  common: {
    projectLabel: 'Progetto',
    repositoryLabel: 'Repository',
    evidenceLabel: 'Evidenze',
    unknownProjectTitle: 'Progetto non trovato',
    unknownProjectDescription: 'Lo slug richiesto non corrisponde a un progetto pubblicato.',
    placeholderDescription:
      'Il contenuto della pagina sarà composto usando il content layer validato.',
    claimStatusLabels: {
      verified: 'Verificato',
      demonstrated: 'Dimostrato',
      declared: 'Dichiarato',
      planned: 'Pianificato',
    },
  },
  capabilities: [
    { capabilityId: 'embedded-firmware', label: 'Firmware embedded' },
    { capabilityId: 'technical-governance', label: 'Governance tecnica' },
    { capabilityId: 'laravel-api', label: 'API Laravel' },
    { capabilityId: 'containerized-delivery', label: 'Delivery containerizzata' },
    { capabilityId: 'node-api', label: 'API Node.js' },
    { capabilityId: 'automated-testing', label: 'Test automatici' },
  ],
  projects: [
    {
      projectId: 'homeedge-ai-platform',
      slug: 'homeedge-ai-platform',
      title: 'HomeEdge AI Platform',
      eyebrow: 'ESP32-C3 e governance tecnica',
      summary:
        'Repository Sprint 0 per una piattaforma smart home edge-first con confini MVP espliciti.',
      sections: [
        {
          id: 'scope',
          label: 'Ambito documentato',
          body: 'Il nodo MVP room/door è definito per temperatura, umidità, presenza locale non identificativa e stato di apertura della porta.',
        },
        {
          id: 'limits',
          label: 'Limiti',
          body: 'Backend, applicazione mobile e servizi AI sono direzioni target [UNVALIDATED], non servizi dimostrati o pronti per la produzione.',
        },
      ],
      claims: [
        {
          id: 'sprint-zero-boundary',
          text: 'Il README documenta il confine del nodo MVP ESP32-C3 e i segnali inclusi.',
          status: 'demonstrated',
          evidenceIds: ['homeedge-readme'],
        },
        {
          id: 'target-services-unvalidated',
          text: 'I confini backend, mobile e AI restano esplicitamente [UNVALIDATED].',
          status: 'demonstrated',
          evidenceIds: ['homeedge-readme'],
        },
      ],
      evidence: [{ evidenceId: 'homeedge-readme', label: 'README e confini MVP' }],
      links: [{ linkId: 'homeedge-github', label: 'Repository GitHub' }],
      assets: [],
      metadata: {
        title: 'HomeEdge AI Platform',
        description:
          'Repository Sprint 0 per smart home edge-first con confini MVP e marker [UNVALIDATED].',
        noIndex: false,
      },
    },
    {
      projectId: 'its-library-api-laravel',
      slug: 'api-libreria-its-laravel',
      title: 'ITS Library API in Laravel',
      eyebrow: 'Laravel e API REST',
      summary: 'API didattica Laravel per libri, autori, categorie e autenticazione token.',
      sections: [
        {
          id: 'scope',
          label: 'Ambito documentato',
          body: 'Il repository documenta endpoint REST per libri, autori e categorie, con operazioni di lettura pubbliche e scritture protette da Laravel Sanctum.',
        },
        {
          id: 'delivery',
          label: 'Esecuzione locale',
          body: 'Docker Compose definisce applicazione Laravel, MySQL e phpMyAdmin; il README descrive bootstrap e comandi di test locali.',
        },
      ],
      claims: [
        {
          id: 'rest-resources',
          text: 'Il repository documenta risorse REST per libri, autori e categorie.',
          status: 'demonstrated',
          evidenceIds: ['library-readme'],
        },
        {
          id: 'local-containers',
          text: 'Il setup locale documentato usa Docker Compose con Laravel e MySQL.',
          status: 'demonstrated',
          evidenceIds: ['library-readme'],
        },
      ],
      evidence: [{ evidenceId: 'library-readme', label: 'README, API e setup locale' }],
      links: [{ linkId: 'library-github', label: 'Repository GitHub' }],
      assets: [],
      metadata: {
        title: 'ITS Library API in Laravel',
        description:
          'API REST didattica Laravel per una libreria, con autenticazione e setup locale Docker.',
        noIndex: false,
      },
    },
    {
      projectId: 'node-list-manager',
      slug: 'gestore-liste-node',
      title: 'Progetto ITS in Node.js',
      eyebrow: 'Node.js, Express e SQLite',
      summary: 'Backend per liste e attività con route Express modulari e persistenza SQLite.',
      sections: [
        {
          id: 'scope',
          label: 'Ambito dimostrato',
          body: 'Il server monta route dedicate alle liste e alle attività annidate, espone health check e centralizza la gestione degli errori.',
        },
        {
          id: 'quality',
          label: 'Contratto di test',
          body: "Il manifest configura Jest e include Supertest; il codice applicativo espone l'app Express per i test.",
        },
      ],
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
          evidenceIds: ['node-package-manifest'],
        },
      ],
      evidence: [
        { evidenceId: 'node-server-source', label: 'Sorgente del server Express' },
        { evidenceId: 'node-package-manifest', label: 'Manifest npm e dipendenze' },
      ],
      links: [{ linkId: 'node-github', label: 'Repository GitHub' }],
      assets: [],
      metadata: {
        title: 'Progetto ITS in Node.js',
        description:
          'Backend Node.js con Express, route modulari, SQLite e contratto di test Jest.',
        noIndex: false,
      },
    },
  ],
} satisfies SiteContent
