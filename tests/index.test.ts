/* eslint-disable no-constant-binary-expression */
/* eslint-disable sonarjs/no-redundant-boolean */

import { describe, expect, test } from 'bun:test'

import { cn } from '~/cn'

describe.concurrent('cn', () => {
  test('strings', () => {
    expect(cn('')).toBe('')
    expect(cn('foo')).toBe('foo')
    expect(cn(true && 'foo')).toBe('foo')
    expect(cn(false && 'foo')).toBe('')
  })

  test('strings (variadic)', () => {
    expect(cn('')).toBe('')
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn(true && 'foo', false && 'bar', 'baz')).toBe('foo baz')
    expect(cn(false && 'foo', 'bar', 'baz', '')).toBe('bar baz')
  })

  test('numbers', () => {
    expect(cn(1)).toBe('')
    expect(cn(12)).toBe('')
    expect(cn(0.1)).toBe('')
    expect(cn(0)).toBe('')
    expect(cn(Infinity)).toBe('')
    expect(cn(Number.NaN)).toBe('')
  })

  test('numbers (variadic)', () => {
    expect(cn(0, 1)).toBe('')
    expect(cn(1, 2)).toBe('')
  })

  test('objects', () => {
    expect(cn({})).toBe('')
    expect(cn({ foo: true })).toBe('foo')
    expect(cn({ foo: true, bar: false })).toBe('foo')
    expect(cn({ foo: 'hiya', bar: 1 })).toBe('foo bar')
    expect(cn({ foo: 1, bar: 0, baz: 1 })).toBe('foo baz')
    expect(cn({ '-foo': 1, '--bar': 1 })).toBe('-foo --bar')
  })

  test('objects (variadic)', () => {
    expect(cn({}, {})).toBe('')
    expect(cn({ foo: 1 }, { bar: 2 })).toBe('foo bar')
    expect(cn({ foo: 1 }, null, { baz: 1, bat: 0 })).toBe('foo baz')
    expect(cn({ foo: 1 }, {}, {}, { bar: 'a' }, { baz: null, bat: Infinity })).toBe(
      'foo bar bat',
    )
  })

  test('arrays', () => {
    expect(cn([])).toBe('')
    expect(cn(['foo'])).toBe('foo')
    expect(cn(['foo', 'bar'])).toBe('foo bar')
    expect(cn(['foo', 0 && 'bar', 1 && 'baz'])).toBe('foo baz')
  })

  test('arrays (nested)', () => {
    expect(cn([[[]]])).toBe('')
    expect(cn([[['foo']]])).toBe('foo')
    expect(cn([true, [['foo']]])).toBe('foo')
    expect(cn(['foo', ['bar', ['', [['baz']]]]])).toBe('foo bar baz')
  })

  test('arrays (variadic)', () => {
    expect(cn([], [])).toBe('')
    expect(cn(['foo'], ['bar'])).toBe('foo bar')
    expect(cn(['foo'], null, ['baz', ''], true, '', [])).toBe('foo baz')
  })

  test('arrays (no `push` escape)', () => {
    expect(cn({ push: 1 })).toBe('push')
    expect(cn({ pop: true })).toBe('pop')
    expect(cn({ push: true })).toBe('push')
    expect(cn('hello', { world: 1, push: true })).toBe('hello world push')
  })

  test('functions', () => {
    const fn = () => {}
    // @ts-expect-error Testing outside of types
    expect(cn(fn, 'hello')).toBe('hello')
    // @ts-expect-error Testing outside of types
    expect(cn(fn, 'hello', cn)).toBe('hello')
    // @ts-expect-error Testing outside of types
    expect(cn(fn, 'hello', [[cn], 'world'])).toBe('hello world')
  })
})
