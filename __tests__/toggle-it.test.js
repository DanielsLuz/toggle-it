const ToggleIt = require('../index.js');

const Thenable = (returnValue) => {
  return {
    then: (callback) => callback(returnValue)
  }
}

describe('#USAGE', () => {
  test('usage 1: simplest, given a fetch function only', () => {
    const fetchFunction = Thenable({ feature1: false })

    const toggler = ToggleIt(fetchFunction);
    expect(toggler.isEnabled('feature1')).toBe(false);
  })

  test('usage 2: given a complex response with an access function', () => {
    const response = {
      data: {
        featuresFlags: {
          feature1: false
        }
      }
    };
    const fetchFunction = Thenable(response);

    const toggler = ToggleIt(fetchFunction, (response) => response.data.featuresFlags);
    expect(toggler.isEnabled('feature1')).toBe(false);
  })

  test('usage 3: complex response, access function, non-boolean flags', () => {
    const response = {
      data: {
        featuresFlags: {
          feature1: {
            userId: 1,
            userEmail: 'foo@bar.com',
          }
        }
      }
    };
    const fetchFunction = Thenable(response);

    const accessFunction = (response) => response.data.featuresFlags;
    const customCheck = (flag) => {
      return flag.userId === 1 && flag.userEmail === 'foo@bar.com';
    };

    const toggler = ToggleIt(fetchFunction, accessFunction);
    expect(toggler.isEnabled('feature1', customCheck)).toBe(true);
  })
})

describe('using a access function', () => {
  test('given a complex object it accesses correctly', () => {
    const response = {
      data: {
        featureSpecs: {
          feature1: true
        }
      }
    };
    const fetchFunction = Thenable(response);
    const accessFunction = (response) => response.data.featureSpecs;

    const toggler = ToggleIt(fetchFunction, accessFunction, {default: false});
    expect(toggler.isEnabled('feature1')).toBe(true);
  })

  test('given an array response it accesses correctly', () => {
    const response = {
      data: [{
        featureSpecs: {
          feature1: true
        }
      }]
    };
    const fetchFunction = Thenable(response);
    const accessFunction = (response) => response.data[0].featureSpecs;

    const toggler = ToggleIt(fetchFunction, accessFunction, {default: false});
    expect(toggler.isEnabled('feature1')).toBe(true);
  })
})

describe('.isEnabled', () => {
  describe('given a fetch function', () => {
    test('it returns true given a enabled feature', () => {
      const fetchFunction = Thenable({ feature1: true })

      const toggler = ToggleIt(fetchFunction, (response) => response, {default: false});
      expect(toggler.isEnabled('feature1')).toBe(true);
    })

    test('it returns false given a disabled feature', () => {
      const fetchFunction = Thenable({ feature1: false })

      const toggler = ToggleIt(fetchFunction);
      expect(toggler.isEnabled('feature1')).toBe(false);
    })
  })

  describe('given a custom check function', () => {
    test('it overrides the defined value', () => {
      const fetchFunction = Thenable({ feature1: true })

      const toggler = ToggleIt(fetchFunction);
      expect(toggler.isEnabled('feature1', () => false)).toBe(false);
    })

    test('it uses the feature value as parameter', () => {
      const fetchFunction = Thenable({ feature1: true })

      const toggler = ToggleIt(fetchFunction);
      expect(toggler.isEnabled('feature1', (flag) => !flag)).toBe(false);
    })
  })

  describe('given an unknown feature', () => {
    test('it returns true by default', () => {
      const toggler = ToggleIt(Thenable({}));
      expect(toggler.isEnabled('feature1')).toBe(true);
    })

    test('it returns the default given', () => {
      const toggler = ToggleIt(Thenable({}), (response) => response, {default: false});
      expect(toggler.isEnabled('feature1')).toBe(false);
    })
  })
})
