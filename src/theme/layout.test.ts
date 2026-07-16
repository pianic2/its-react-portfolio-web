import { describe, expect, it } from 'vitest'
import { createDigitalStudioTokens } from './tokens'

describe('Digital Studio optical layout tokens', () => {
  it('uses increasing page gutters, panel insets and section gaps', () => {
    const { layout } = createDigitalStudioTokens('light')

    expect(layout.pageGutter.compact).toBeLessThan(layout.pageGutter.regular)
    expect(layout.pageGutter.regular).toBeLessThan(layout.pageGutter.wide)
    expect(layout.panelInset.compact).toBeLessThan(layout.panelInset.regular)
    expect(layout.panelInset.regular).toBeLessThan(layout.panelInset.wide)
    expect(layout.sectionGap.compact).toBeLessThan(layout.sectionGap.regular)
    expect(layout.sectionGap.regular).toBeLessThan(layout.sectionGap.wide)
  })

  it('reserves clearance for the largest graphic shadow', () => {
    const { layout, shadowOffsets } = createDigitalStudioTokens('dark')

    expect(layout.shadowClearance).toBe(shadowOffsets.large)
    expect(shadowOffsets.small).toBeLessThan(shadowOffsets.medium)
    expect(shadowOffsets.medium).toBeLessThan(shadowOffsets.large)
  })

  it('keeps the MUI spacing baseline explicit', () => {
    const { spacing } = createDigitalStudioTokens('light')

    expect(spacing.base).toBe(4)
  })
})
