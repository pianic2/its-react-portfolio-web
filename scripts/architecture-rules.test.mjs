import { describe, expect, it } from 'vitest'
import { analyzeSourceFiles, findPossibleDeadFiles } from './architecture-rules.mjs'

describe('architecture rules', () => {
  it('reports high-signal blocking violations from isolated source fixtures', () => {
    const report = analyzeSourceFiles([
      {
        path: 'src/components/Unsafe.tsx',
        source:
          "import { submit } from '../../services/contact/web3Forms'; console.log('debug'); try { work() } catch {} const value: any = 1",
      },
      {
        path: 'src/features/contact/Unsafe.tsx',
        source:
          "import { externalLinks } from '../../config/externalLinks'; externalLinks.web3FormsEndpoint",
      },
      {
        path: 'src/content/unsafe.ts',
        source: "import { Button } from '../components/Button'",
      },
    ])

    expect(report.blocking).toEqual(
      expect.arrayContaining([
        'src/components/Unsafe.tsx: production console logging',
        'src/components/Unsafe.tsx: completely silent catch block',
        'src/components/Unsafe.tsx: explicit any type',
        'src/components/Unsafe.tsx: UI imports a contact-service internal module',
        'src/features/contact/Unsafe.tsx: Web3Forms endpoint accessed outside the service adapter',
        'src/content/unsafe.ts: content layer imports presentation layer',
      ]),
    )
  })

  it('keeps size and possible dead-file heuristics informational', () => {
    const report = analyzeSourceFiles([
      { path: 'src/features/Large.tsx', source: `${'\n'.repeat(501)}export const Large = 1` },
    ])

    expect(report.blocking).toEqual([])
    expect(report.informational).toEqual([
      'src/features/Large.tsx: exceeds 500 lines; review responsibility split manually',
    ])
    expect(
      findPossibleDeadFiles([
        { path: 'src/features/Unused.ts', source: 'export const Unused = true' },
      ]),
    ).toEqual(['possible dead file: Unused is not referenced by name'])
  })
})
