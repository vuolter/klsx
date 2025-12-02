/* eslint-disable no-constant-binary-expression */
/* eslint-disable sonarjs/no-redundant-boolean */

import { describe, expect, test } from 'bun:test'

import { kx } from '~/kx'

describe.concurrent('klsx', () => {
  test('strings', () => {
    expect(kx('')).toBe('')
    expect(kx('foo')).toBe('foo')
    expect(kx(true && 'foo')).toBe('foo')
    expect(kx(false && 'foo')).toBe('')
  })

  test('strings (variadic)', () => {
    expect(kx('')).toBe('')
    expect(kx('foo', 'bar')).toBe('foo bar')
    expect(kx(true && 'foo', false && 'bar', 'baz')).toBe('foo baz')
    expect(kx(false && 'foo', 'bar', 'baz', '')).toBe('bar baz')
  })

  test('numbers', () => {
    expect(kx(1)).toBe('')
    expect(kx(12)).toBe('')
    expect(kx(0.1)).toBe('')
    expect(kx(0)).toBe('')
    expect(kx(Infinity)).toBe('')
    expect(kx(Number.NaN)).toBe('')
  })

  test('numbers (variadic)', () => {
    expect(kx(0, 1)).toBe('')
    expect(kx(1, 2)).toBe('')
  })

  test('objects', () => {
    expect(kx({})).toBe('')
    expect(kx({ foo: true })).toBe('foo')
    expect(kx({ foo: true, bar: false })).toBe('foo')
    expect(kx({ foo: 'hiya', bar: 1 })).toBe('foo bar')
    expect(kx({ foo: 1, bar: 0, baz: 1 })).toBe('foo baz')
    expect(kx({ '-foo': 1, '--bar': 1 })).toBe('-foo --bar')
  })

  test('objects (variadic)', () => {
    expect(kx({}, {})).toBe('')
    expect(kx({ foo: 1 }, { bar: 2 })).toBe('foo bar')
    expect(kx({ foo: 1 }, null, { baz: 1, bat: 0 })).toBe('foo baz')
    expect(kx({ foo: 1 }, {}, {}, { bar: 'a' }, { baz: null, bat: Infinity })).toBe(
      'foo bar bat',
    )
  })

  test('arrays', () => {
    expect(kx([])).toBe('')
    expect(kx(['foo'])).toBe('foo')
    expect(kx(['foo', 'bar'])).toBe('foo bar')
    expect(kx(['foo', 0 && 'bar', 1 && 'baz'])).toBe('foo baz')
  })

  test('arrays (nested)', () => {
    expect(kx([[[]]])).toBe('')
    expect(kx([[['foo']]])).toBe('foo')
    expect(kx([true, [['foo']]])).toBe('foo')
    expect(kx(['foo', ['bar', ['', [['baz']]]]])).toBe('foo bar baz')
  })

  test('arrays (variadic)', () => {
    expect(kx([], [])).toBe('')
    expect(kx(['foo'], ['bar'])).toBe('foo bar')
    expect(kx(['foo'], null, ['baz', ''], true, '', [])).toBe('foo baz')
  })

  test('arrays (no `push` escape)', () => {
    expect(kx({ push: 1 })).toBe('push')
    expect(kx({ pop: true })).toBe('pop')
    expect(kx({ push: true })).toBe('push')
    expect(kx('hello', { world: 1, push: true })).toBe('hello world push')
  })

  test('functions', () => {
    const fn = () => {}
    // @ts-expect-error Testing outside of types
    expect(kx(fn, 'hello')).toBe('hello')
    // @ts-expect-error Testing outside of types
    expect(kx(fn, 'hello', kx)).toBe('hello')
    // @ts-expect-error Testing outside of types
    expect(kx(fn, 'hello', [[kx], 'world'])).toBe('hello world')
  })
})
