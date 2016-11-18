/* thanks JSBin */

var prependChild = function(elem, child) { elem.insertBefore(child, elem.firstChild); };

var getIframeWindow = function (iframeElement) {
    return iframeElement.contentWindow || iframeElement.contentDocument.parentWindow;
};

var sandbox = (function () {

  var sandbox = {};

  sandbox.target = document.getElementById('sandbox-wrapper');
  sandbox.old = null;
  sandbox.active = null;
  sandbox.guid = +new Date(); // id used to keep track of which iframe is active

  sandbox.create = function () {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts');
    iframe.id = sandbox.guid++;
    iframe.className = "embed-responsive-item";
    return iframe;
  };

  sandbox.use = function (iframe, done) {
    if (!sandbox.target) throw new Error('Sandbox has no target element.');
    sandbox.old = sandbox.active;
    sandbox.active = iframe;
    prependChild(sandbox.target, iframe);
    // setTimeout allows the iframe to be rendered before other code runs,
    // allowing us access to the calculated properties like innerWidth.
    setTimeout(function () {
      // call the code that renders the iframe source
      if (done) done();

      // remove *all* the iframes, baring the active one
      var iframes = sandbox.target.getElementsByTagName('iframe'),
          length = iframes.length,
          i = 0,
          id = sandbox.active.id,
          iframe;

      for (; iframe = iframes[i], i < length; i++) {
        if (iframe.id !== id) {
          iframe.parentNode.removeChild(iframe);
          length--;
        }
      }
    }, 0);
  };

  return sandbox;

}());
