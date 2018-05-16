const ToggleIt = require('../index.js');

const Thenable = (returnValue) => {
  return {
    then: (callback) => callback(returnValue)
  }
}

describe('usage', () => {
  test('usage 1', () => {
    const fetchFunction = () => Thenable(JSON.stringify({ feature1: true }))

    const toggler = ToggleIt(fetchFunction, (response) => response, {default: false});
    expect(toggler.isEnabled('feature1')).toBe(true);
  })
})

describe('using a response parsing function', () => {
  test('given a complex object it accesses correctly', () => {
    const JSONresponse = JSON.stringify({
      data: {
        featureSpecs: {
          feature1: true
        }
      }
    });
    const fetchFunction = () => Thenable(JSONresponse);
    const accessFunction = (response) => response.data.featureSpecs;

    const toggler = ToggleIt(fetchFunction, accessFunction, {default: false});
    expect(toggler.isEnabled('feature1')).toBe(true);
  })

  test('given an array response it accesses correctly', () => {
    const JSONresponse = JSON.stringify({
      data: [{
        featureSpecs: {
          feature1: true
        }
      }]
    });
    const fetchFunction = () => Thenable(JSONresponse);
    const accessFunction = (response) => response.data[0].featureSpecs;

    const toggler = ToggleIt(fetchFunction, accessFunction, {default: false});
    expect(toggler.isEnabled('feature1')).toBe(true);
  })
})

describe('.isEnabled', () => {
  describe('given a fetch function that returns a JSON', () => {
    test('it returns true given a enabled feature', () => {
      const fetchFunction = () => Thenable(JSON.stringify({ feature1: true }))

      const toggler = ToggleIt(fetchFunction, (response) => response, {default: false});
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
      expect(toggler.isEnabled('feature1', () => false)).toBe(false);
    })
  })

  describe('given an unknown feature', () => {
    test('it returns true', () => {
      const toggler = ToggleIt(async () => '{}');
      expect(toggler.isEnabled('feature1')).toBe(true);
    })

    test('it returns the default given', () => {
      const toggler = ToggleIt(async () => '{}', (response) => response, {default: false});
      expect(toggler.isEnabled('feature1')).toBe(false);
    })
  })
})
