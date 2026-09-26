import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { StudioCard } from '../components/surfaces/StudioCard'
import { createDigitalStudioTheme } from './createDigitalStudioTheme'
import type { ThemeMode } from './tokens'

const modes: ThemeMode[] = ['light', 'dark']

// JSDOM has no pointer hover state. Activate the rendered Emotion hover rules,
// including MUI's desktop-hover media rules, through a test-only attribute.
function activateRenderedHoverRules() {
  const rules: string[] = []
  function collect(ruleList: CSSRuleList) {
    for (const rule of Array.from(ruleList)) {
      if (rule instanceof CSSStyleRule && rule.selectorText.includes(':hover')) {
        rules.push(rule.cssText.replaceAll(':hover', '[data-hover]'))
      } else if (rule instanceof CSSMediaRule && /\(hover:\s*hover\)/.test(rule.conditionText)) {
        collect(rule.cssRules)
      }
    }
  }
  for (const sheet of Array.from(document.styleSheets)) collect(sheet.cssRules)
  const style = document.createElement('style')
  style.textContent = rules.join('\n')
  document.head.append(style)
  return () => style.remove()
}

describe.each(modes)('%s surface emphasis', (mode) => {
  const theme = createDigitalStudioTheme(mode)

  it.each(
    (['contained', 'outlined', 'text'] as const).flatMap((variant) =>
      (['primary', 'secondary', 'inherit'] as const).map((color) => ({ variant, color })),
    ),
  )(
    'keeps rendered $color $variant Button surface and border stable on hover',
    ({ variant, color }) => {
      render(
        createElement(
          ThemeProvider,
          { theme },
          createElement(Button, { variant, color }, 'Control'),
        ),
      )
      const button = screen.getByRole('button', { name: 'Control' })
      const resting = window.getComputedStyle(button)
      const background = resting.backgroundColor
      const border = resting.borderColor
      const surfaceVariable = `--variant-${variant === 'contained' ? 'containedBg' : variant === 'outlined' ? 'outlinedBg' : 'textBg'}`
      const variables = [
        surfaceVariable,
        ...(variant === 'outlined' ? ['--variant-outlinedBorder'] : []),
      ].map((property) => ({ property, value: resting.getPropertyValue(property) }))
      const removeHoverRules = activateRenderedHoverRules()

      try {
        button.setAttribute('data-hover', '')
        const hovering = window.getComputedStyle(button)
        expect(hovering.backgroundColor).toBe(background)
        expect(hovering.borderColor).toBe(border)
        for (const { property, value } of variables) {
          expect(hovering.getPropertyValue(property)).toBe(value)
        }
        expect(hovering.transform).toBe('translate(-2px, -2px)')
        expect(hovering.boxShadow).toBe(theme.digitalStudio.shadows.small)
      } finally {
        removeHoverRules()
      }
    },
  )

  it('keeps structural Paper quiet and contained', () => {
    expect(theme.components?.MuiPaper?.defaultProps?.elevation).toBe(0)
    expect(theme.components?.MuiPaper?.styleOverrides?.root).toMatchObject({
      border: `2px solid ${theme.digitalStudio.colors.border}`,
      borderRadius: 12,
      boxShadow: 'none',
    })
  })

  it('gives default Cards no offset shadow', () => {
    expect(theme.components?.MuiCard?.styleOverrides?.root).toMatchObject({
      boxShadow: 'none',
    })
  })

  it('reserves a small offset for ordinary Button feedback and preserves touch and focus', () => {
    expect(theme.components?.MuiButton?.styleOverrides?.root).toMatchObject({
      border: `2px solid ${theme.digitalStudio.colors.border}`,
      borderRadius: 12,
      boxShadow: 'none',
      minHeight: 48,
      '&:hover': {
        boxShadow: theme.digitalStudio.shadows.small,
        transform: 'translate(-2px, -2px)',
      },
      '&:focus-visible': {
        outline: `3px solid ${theme.digitalStudio.colors.focusInner}`,
        outlineOffset: 3,
      },
      '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
        '&:hover, &:active': { transform: 'none' },
      },
    })
  })

  it('limits text Button hover overrides to offset feedback', () => {
    expect(theme.components?.MuiButton?.styleOverrides?.text).toMatchObject({
      '&:hover': { boxShadow: theme.digitalStudio.shadows.small },
    })
    expect(theme.components?.MuiButton?.styleOverrides?.text).not.toMatchObject({
      '&:hover': { borderColor: theme.digitalStudio.colors.border },
    })
  })

  it.each([
    { variant: 'standard', offset: 0, radius: '12px' },
    { variant: 'featured', offset: 6, radius: '20px' },
  ] as const)('keeps $variant StudioCard treatment explicit', ({ variant, offset, radius }) => {
    render(
      createElement(
        ThemeProvider,
        { theme },
        createElement(StudioCard, { variant }, 'Shared surface'),
      ),
    )
    const style = window.getComputedStyle(screen.getByText('Shared surface'))
    const shadowColor = mode === 'light' ? '#111111' : '#050208'

    expect(style.boxShadow).toBe(offset === 0 ? 'none' : `${offset}px ${offset}px 0 ${shadowColor}`)
    expect(style.borderRadius).toBe(radius)
    expect(style.marginBlockEnd).toBe(`${offset}px`)
    expect(style.marginInlineEnd).toBe(`${offset}px`)
  })
})
