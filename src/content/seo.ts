import type { Language, PageId } from './schema'

export const staticSeoDescriptions: Record<Language, Partial<Record<PageId, string>>> = {
  en: {
    projects:
      'Selected software projects with scope, evidence, current stage and repository links.',
    skills:
      'Technical skills, public evidence and the learning path behind this software portfolio.',
    method:
      'A practical software delivery method focused on evidence, scope and continuous learning.',
    profile: 'Background, learning path and public profiles of Niccolò Piazzi.',
    contact:
      'Contact Niccolò Piazzi for junior software opportunities, internships and focused collaborations.',
    privacy:
      'Privacy information for the portfolio contact form and its Web3Forms delivery provider.',
  },
  it: {
    projects: 'Progetti software selezionati con perimetro, evidenze, stato attuale e repository.',
    skills: 'Competenze tecniche, evidenze pubbliche e percorso di apprendimento del portfolio.',
    method:
      'Un metodo pratico di delivery software basato su evidenze, perimetro e apprendimento continuo.',
    profile: 'Percorso, formazione e profili pubblici di Niccolò Piazzi.',
    contact:
      'Contatta Niccolò Piazzi per opportunità junior, tirocini e collaborazioni circoscritte.',
    privacy: 'Informazioni privacy del form di contatto e del provider Web3Forms.',
  },
}
