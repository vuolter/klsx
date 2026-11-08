/* eslint-disable no-constant-binary-expression */

import { describe, expect, test } from 'bun:test'

import klsx from '@/klsx'
import { type KlassValue } from '@/types'

const fn = () => {}

describe.concurrent('klsx', () => {
  test('strings', () => {
    expect(klsx('')).toBe('')
    expect(klsx('foo')).toBe('foo')
    expect(klsx(true && 'foo')).toBe('foo')
    expect(klsx(false && 'foo')).toBe('')
  })

  test('strings (variadic)', () => {
    expect(klsx('')).toBe('')
    expect(klsx('foo', 'bar')).toBe('foo bar')
    expect(klsx(true && 'foo', false && 'bar', 'baz')).toBe('foo baz')
    expect(klsx(false && 'foo', 'bar', 'baz', '')).toBe('bar baz')
  })

  test('numbers', () => {
    expect(klsx(1)).toBe('')
    expect(klsx(12)).toBe('')
    expect(klsx(0.1)).toBe('')
    expect(klsx(0)).toBe('')
    expect(klsx(Infinity)).toBe('')
    expect(klsx(Number.NaN)).toBe('')
  })

  test('numbers (variadic)', () => {
    expect(klsx(0, 1)).toBe('')
    expect(klsx(1, 2)).toBe('')
  })

  test('objects', () => {
    expect(klsx({})).toBe('')
    expect(klsx({ foo: true })).toBe('foo')
    expect(klsx({ foo: true, bar: false })).toBe('foo')
    expect(klsx({ foo: 'hiya', bar: 1 })).toBe('foo bar')
    expect(klsx({ foo: 1, bar: 0, baz: 1 })).toBe('foo baz')
    expect(klsx({ '-foo': 1, '--bar': 1 })).toBe('-foo --bar')
  })

  test('objects (variadic)', () => {
    expect(klsx({}, {})).toBe('')
    expect(klsx({ foo: 1 }, { bar: 2 })).toBe('foo bar')
    expect(klsx({ foo: 1 }, null, { baz: 1, bat: 0 })).toBe('foo baz')
    expect(klsx({ foo: 1 }, {}, {}, { bar: 'a' }, { baz: null, bat: Infinity })).toBe('foo bar bat')
  })

  test('arrays', () => {
    expect(klsx([])).toBe('')
    expect(klsx(['foo'])).toBe('foo')
    expect(klsx(['foo', 'bar'])).toBe('foo bar')
    expect(klsx(['foo', 0 && 'bar', 1 && 'baz'])).toBe('foo baz')
  })

  test('arrays (nested)', () => {
    expect(klsx([[[]]])).toBe('')
    expect(klsx([[['foo']]])).toBe('foo')
    expect(klsx([true, [['foo']]])).toBe('foo')
    expect(klsx(['foo', ['bar', ['', [['baz']]]]])).toBe('foo bar baz')
  })

  test('arrays (variadic)', () => {
    expect(klsx([], [])).toBe('')
    expect(klsx(['foo'], ['bar'])).toBe('foo bar')
    expect(klsx(['foo'], null, ['baz', ''], true, '', [])).toBe('foo baz')
  })

  test('arrays (no `push` escape)', () => {
    expect(klsx({ push: 1 })).toBe('push')
    expect(klsx({ pop: true })).toBe('pop')
    expect(klsx({ push: true })).toBe('push')
    expect(klsx('hello', { world: 1, push: true })).toBe('hello world push')
  })

  test('empty keys are skipped', () => {
    expect(klsx('x', { '': true })).toBe('x')
    expect(klsx({ '': true }, 'a')).toBe('a')
    expect(klsx('a', { '': true }, 'b')).toBe('a b')
  })

  test('keys with spaces are kept as one class', () => {
    expect(klsx({ 'a b': true })).toBe('a b')
    expect(klsx('a  b')).toBe('a  b')
  })

  test('symbol and bigint values', () => {
    expect(klsx({ [Symbol('s')]: true })).toBe('')
    expect(klsx(1n)).toBe('')
    expect(klsx({ x: 1n })).toBe('x')
  })

  test('getter values are read', () => {
    expect(
      klsx({
        get x() {
          return true
        },
        get y() {
          return false
        },
      }),
    ).toBe('x')
  })

  test('inherited enumerable keys are included (clsx-compatible)', () => {
    expect(klsx(Object.create({ inherited: true }))).toBe('inherited')
  })

  test('duplicates are not removed', () => {
    expect(klsx('a', 'a')).toBe('a a')
    expect(klsx({ a: true }, 'a')).toBe('a a')
  })

  test('falsy values inside nested arrays', () => {
    expect(klsx(['x', [null, 0, false, '', undefined, NaN, ['y']]])).toBe('x y')
  })

  test('deep nesting', () => {
    let nested: KlassValue = 'deep'
    for (let i = 0; i < 500; i++) {
      nested = [nested]
    }
    expect(klsx(nested)).toBe('deep')
  })

  test('functions', () => {
    // @ts-expect-error Testing outside of types
    expect(klsx(fn, 'hello')).toBe('hello')
    // @ts-expect-error Testing outside of types
    expect(klsx(fn, 'hello', klsx)).toBe('hello')
    // @ts-expect-error Testing outside of types
    expect(klsx(fn, 'hello', [[klsx], 'world'])).toBe('hello world')
  })
})
