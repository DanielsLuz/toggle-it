const ToggleIt = require('../index.js');

describe('.isEnabled', () => {
  describe('given a fetch function that returns a JSON', () => {
    test('it returns true given a enabled feature', () => {
      const fetchFunction = () => {
        return JSON.stringify({
          feature1: true
        })
      }

      const toggler = ToggleIt(fetchFunction);
      expect(toggler.isEnabled('feature1')).toBe(true);
    })

    test('it returns false given a disabled feature', () => {
      const fetchFunction = () => {
        return JSON.stringify({
          feature1: false
        })
      }

      const toggler = ToggleIt(fetchFunction);
      expect(toggler.isEnabled('feature1')).toBe(false);
    })
  })

  describe('given a custom check function', () => {
    test('it overrides the defined value', () => {
      const fetchFunction = () => {
        return JSON.stringify({
          feature1: true
        })
      }

      const toggler = ToggleIt(fetchFunction);
      expect(toggler.isEnabled('feature1')).toBe(true);
    })
  })

  describe('given an unknown feature', () => {
    test('it returns true', () => {
      const toggler = ToggleIt(() => '{}');
      expect(toggler.isEnabled('feature1')).toBe(true);
    })

    test('it returns de default given', () => {
      const toggler = ToggleIt(() => '{}', {default: false});
      expect(toggler.isEnabled('feature1')).toBe(false);
    })
  })
})
