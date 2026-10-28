import { describe, expect, it } from 'vitest'
import { cn } from '../lib/cn'

describe('cn', () => {
  it('joins string and number class values', () => {
    expect(cn('button', 'primary', 2)).toBe('button primary 2')
  })

  it('ignores falsy values and flattens arrays', () => {
    expect(cn('button', false, null, undefined, ['active', [0, 'wide']])).toBe('button active wide')
  })

  it('includes keys whose values are truthy', () => {
    expect(cn('button', { active: true, disabled: false, wide: 1 })).toBe('button active wide')
  })

  it('supports bigint class values', () => {
    expect(cn(1n, 'button')).toBe('1 button')
  })

  it('uses the last object as options when it only contains override', () => {
    expect(cn('custom', 'button', { override: true })).toBe('custom')
    expect(cn(undefined, 'button', { override: true })).toBe('button')
    expect(cn('', { override: true })).toBe('')
  })

  it('does not treat class dictionaries with extra keys as options', () => {
    expect(cn({ override: true, active: true })).toBe('override active')
  })
})
