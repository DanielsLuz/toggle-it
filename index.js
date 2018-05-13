const core = require('toggle-it-core');

function ToggleIt(fetchFunction, options = {default: true}) {
  const _core = core({
    features: JSON.parse(fetchFunction()),
    options,
  });

  const isEnabled = function() {
    return _core.on(...arguments);
  };

  return {
    isEnabled,
  };
}

module.exports = ToggleIt;
