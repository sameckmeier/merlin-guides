var isPageLoading = (function() {
  function getStyle(node, attribute) {
    return window.getComputedStyle(node, null)[attribute];
  };

  function isOnScreen(node) {
    var rect = node.getBoundingClientRect();

    var yVisible = rect.bottom + rect.height > 0 || rect.top + rect.height > 0;
    var xVisible = rect.left + rect.width > 0 || rect.right + rect.width > 0;

    return yVisible || xVisible;
  };

  function isDisplayed(node) {
    return isOnScreen(node) && getStyle(node, 'display') !== 'none';
  }

  function isLoading(node) {
    return isOnScreen(node) || isDisplayed(node);
  };

  function isDoneLoading(selectors) {
    var done = true;

    var elements = document.querySelectorAll(selectors);
    for (var i = 0; i < elements.length; i++) {
      if (isLoading(elements[i])) {
        done = false;
        break;
      }
    }

    return done;
  };

  function execute(callback) {
    var selectors = '[id*="loading"], [class*="loading"]';

    if (isDoneLoading(selectors)) {
      callback();
    } else {
      setTimeout(function() {
        execute(callback);
      }, 500);
    }
  };

  return { call: execute };
})();

isPageLoading.call(function() { console.log("success"); });
