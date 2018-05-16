const ToggleIt = require('../index.js');

const Thenable = (returnValue) => {
  return {
    then: (callback) => callback(returnValue)
  }
}

describe('usage', () => {
  test('usage 1', () => {
    const fetchFunction = () => Thenable(JSON.stringify({ feature1: true }))

    const toggler = ToggleIt(fetchFunction, {default: false});
    expect(toggler.isEnabled('feature1')).toBe(true);
  })
})

describe('.isEnabled', () => {
  describe('given a fetch function that returns a JSON', () => {
    test('it returns true given a enabled feature', () => {
      const fetchFunction = () => Thenable(JSON.stringify({ feature1: true }))

      const toggler = ToggleIt(fetchFunction, {default: false});
      expect(toggler.isEnabled('feature1')).toBe(true);
    })

    test('it returns false given a disabled feature', () => {
      const fetchFunction = () => Thenable(JSON.stringify({ feature1: false }))

      const toggler = ToggleIt(fetchFunction);
      expect(toggler.isEnabled('feature1')).toBe(false);
    })
  })

  describe('given a custom check function', () => {
    test('it overrides the defined value', () => {
      const fetchFunction = () => Thenable(JSON.stringify({ feature1: true }))

      const toggler = ToggleIt(fetchFunction);
      expect(toggler.isEnabled('feature1')).toBe(true);
    })
  })

  describe('given an unknown feature', () => {
    test('it returns true', () => {
      const toggler = ToggleIt(async () => '{}');
      expect(toggler.isEnabled('feature1')).toBe(true);
    })

    test('it returns the default given', () => {
      const toggler = ToggleIt(async () => '{}', {default: false});
      expect(toggler.isEnabled('feature1')).toBe(false);
    })
  })
})
