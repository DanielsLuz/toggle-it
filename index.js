const core = require('toggle-it-core');

function ToggleIt(fetchFunction, accessFunction = (response) => response, options = {default: true}) {
  const _core = core({
    options,
  });

  const isEnabled = function() {
    return _core.on(...arguments);
  };

  fetchFunction().then((data) => {
    _core.setFeaturesData(accessFunction(JSON.parse(data)))
  });

  return {
    isEnabled
  }
}

module.exports = ToggleIt;
