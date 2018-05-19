const core = require('toggle-it-core');

function ToggleIt(fetchFunction, accessFunction = (response) => response, options = {default: true}) {
  const _core = core({
    options,
  });

  const isEnabled = function() {
    return _core.on(...arguments);
  };

  fetchFunction.then((data) => {
    _core.setFeaturesData(accessFunction(data))
  });

  return {
    isEnabled
  }
}

module.exports = ToggleIt;
