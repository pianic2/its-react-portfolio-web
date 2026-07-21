import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { DigitalStudioProvider } from '../theme'
import { PortfolioContentProvider } from '../content/context'
import { getMethodPage, getSkillsPage } from '../content/loaders'
import { MethodPage } from './MethodPage'
import { SkillsPage } from './SkillsPage'

function renderPage(language: 'it' | 'en', page: 'skills' | 'method') {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={[`/${language}/${page}`]}>
        <PortfolioContentProvider language={language}>
          {page === 'skills' ? <SkillsPage /> : <MethodPage />}
        </PortfolioContentProvider>
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('Skills and Method pages', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the Italian Skills conversion path and independent pop-art sections', () => {
    renderPage('it', 'skills')

    expect(
      screen.getByRole('heading', {
        name: 'Dal problema al software che puoi usare, capire e verificare.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Parliamo del tuo progetto/ })).toHaveAttribute(
      'href',
      '/it/contatti',
    )
    expect(screen.getByRole('link', { name: /Guarda cosa ho costruito/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2',
    )
    expect(
      screen.getByRole('heading', {
        name: 'La tecnologia serve. Il valore nasce da come viene usata.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('skills-group-section-frontend-interfaces')).toBeInTheDocument()
    expect(screen.getByTestId('skills-group-section-backend-data')).toBeInTheDocument()
    expect(screen.getByTestId('skills-group-section-connected-embedded')).toBeInTheDocument()
    expect(screen.getByTestId('skills-group-section-delivery-quality')).toBeInTheDocument()
    for (const title of [
      'Interfaccia e struttura verificabili',
      'Regole e implementazioni consultabili',
      'Test, decisioni e stato del progetto',
      'Processo e controlli automatici',
    ]) {
      expect(screen.getAllByRole('heading', { name: title })).toHaveLength(1)
    }
    expect(screen.getByRole('link', { name: /Esplora il frontend del portfolio/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/its-react-portfolio-web',
    )
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.queryByText(/IRPW|Confluence|atlassian\.net/i)).not.toBeInTheDocument()
  }, 20_000)

  it('renders the English Method workflow, project examples and conversion path', () => {
    renderPage('en', 'method')

    expect(
      screen.getByRole('heading', { name: 'Direction first. Then speed.' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Principles')).not.toBeInTheDocument()
    expect(screen.queryByText('On this page')).not.toBeInTheDocument()
    expect(screen.queryByTestId('method-workflow')).not.toBeInTheDocument()
    expect(screen.getByTestId('method-foundations')).toBeInTheDocument()
    expect(screen.getByText('Pragmatic approach, continuously evolving')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Adapt the process to the problem, not the problem to the process.',
      }),
    ).toBeInTheDocument()
    for (const id of [
      'govern-the-problem',
      'define-an-increment',
      'make-decisions-explicit',
      'verify-in-short-cycles',
      'reconcile-real-state',
    ]) {
      expect(screen.getByTestId(`method-principle-${id}`)).toBeInTheDocument()
    }
    for (const title of [
      'Understand what actually needs to be solved',
      'Choose the smallest step that creates learning',
      'Every important choice should answer one question: why?',
      'Find errors early, while they are still cheaper to fix',
      'Do not say it is done: prove it is done',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
    expect(screen.getByTestId('method-value')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Fewer surprises. More clarity. Better decisions.' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('method-tools')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Not more tools: clearer responsibilities' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('method-agentic')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'When producing becomes easier, good decisions matter more',
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByTestId(/^method-case-/)).toHaveLength(3)
    expect(screen.getByRole('link', { name: /Tell me about the problem/ })).toHaveAttribute(
      'href',
      '/en/contact',
    )
    expect(screen.getByRole('link', { name: /See the method in practice/ })).toHaveAttribute(
      'href',
      '#method-case-homeedge-architecture-decisions',
    )
    expect(
      screen.getByText('Reduce errors and wasted effort before accelerating development.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Open the quality workflow/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/its-react-portfolio-web/blob/main/.github/workflows/quality.yml',
    )
    expect(
      screen.getByRole('link', { name: /Read the principles behind the Agile Manifesto/ }),
    ).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link', { name: /Discover Jira/ })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    )
    expect(screen.getByTestId('method-agentic-flow')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Tell me about the project/ })).toHaveAttribute(
      'href',
      '/en/contact',
    )
    expect(screen.getByRole('link', { name: /See how I work/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/its-react-portfolio-web',
    )
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  }, 20_000)

  it('renders the Italian Method structure and localized Agile resources', () => {
    renderPage('it', 'method')

    expect(
      screen.getByRole('heading', {
        name: 'Prima la direzione. Poi la velocità.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Approccio pragmatico in continua evoluzione')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Leggi i principi del Manifesto Agile/ }),
    ).toHaveAttribute('href', 'https://agilemanifesto.org/iso/it/principles.html')
    expect(screen.getByRole('link', { name: /Consulta la Scrum Guide ufficiale/ })).toHaveAttribute(
      'href',
      'https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Italian.pdf',
    )
    expect(
      screen.getByRole('heading', { name: 'Meno sorprese. Più chiarezza. Decisioni migliori.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Partiamo dall’obiettivo, poi scegliamo che cosa costruire',
      }),
    ).toBeInTheDocument()
    expect(screen.queryByText('In questa pagina')).not.toBeInTheDocument()
    for (const title of [
      'Capire che cosa dobbiamo davvero risolvere',
      'Scegliere il passo più piccolo che permette di imparare',
      'Ogni scelta importante deve poter rispondere alla domanda: perché?',
      'Scoprire presto gli errori, quando correggerli costa meno',
      'Non dire che è fatto: dimostrare che è fatto',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
  }, 20_000)

  it('keeps CTA and evidence contracts equivalent across locales', () => {
    const italianSkills = getSkillsPage('it')
    const englishSkills = getSkillsPage('en')
    const italianMethod = getMethodPage('it')
    const englishMethod = getMethodPage('en')

    expect(italianSkills.groups.map((group) => group.id)).toEqual(
      englishSkills.groups.map((group) => group.id),
    )
    expect(italianMethod.foundations.resources.map((resource) => resource.id)).toEqual(
      englishMethod.foundations.resources.map((resource) => resource.id),
    )
    expect(italianMethod.tools.items.map((item) => item.id)).toEqual(
      englishMethod.tools.items.map((item) => item.id),
    )
    expect(italianMethod.principles.map((principle) => principle.id)).toEqual(
      englishMethod.principles.map((principle) => principle.id),
    )
    expect(italianMethod.principles.map((principle) => principle.visual)).toEqual(
      englishMethod.principles.map((principle) => principle.visual),
    )
    expect(italianMethod.agenticDelivery.concepts.map((concept) => concept.id)).toEqual(
      englishMethod.agenticDelivery.concepts.map((concept) => concept.id),
    )
    expect(italianMethod.agenticDelivery.workflow).toHaveLength(
      englishMethod.agenticDelivery.workflow.length,
    )
    expect(italianMethod.examples.map((example) => example.diagram?.kind)).toEqual(
      englishMethod.examples.map((example) => example.diagram?.kind),
    )
    expect(italianMethod.examples.map((example) => example.id)).toEqual(
      englishMethod.examples.map((example) => example.id),
    )
    expect(italianSkills.groups.every((group) => group.evidence.length <= 2)).toBe(true)
    expect(italianMethod.examples.every((example) => example.evidence.length <= 2)).toBe(true)
    expect(italianSkills.groups.every((group) => group.references.length <= 2)).toBe(true)
    expect(
      [...italianSkills.groups, ...italianMethod.examples].flatMap((item) =>
        item.evidence.map((evidence) => evidence?.url ?? ''),
      ),
    ).not.toEqual(expect.arrayContaining([expect.stringMatching(/atlassian\.net|Confluence/i)]))
  })

  it('uses accessible link targets and keeps the primary contact action prominent', () => {
    renderPage('en', 'skills')

    const primary = screen.getByRole('link', { name: /Let’s discuss your project/ })
    const github = screen.getByRole('link', { name: /See what I have built/ })

    expect(primary).toHaveAttribute('href', '/en/contact')
    expect(primary).toHaveAttribute('data-analytics-id', 'skills-hero-contact')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
