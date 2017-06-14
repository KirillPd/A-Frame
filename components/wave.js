AFRAME.registerComponent('wave', {
  schema: {
    rows: {
      type: 'number',
      default: 5
    },
    elements: {
      type: 'number',
      default: 5
    }
  },
  init: function () {
    var el = this.el,
      pageVisibility = this.setVisibilityProperties(),
      self = this,
      handleVisibilityChange;

    handleVisibilityChange = function () {
      if (document[pageVisibility.hidden]) {
        self.deleteDots(el);
      } else {
        self.initWave(el);
      }
    }

    self.initWave(el);
    self.addVisibilityListener(pageVisibility, handleVisibilityChange);
  },
  // Set the name of the hidden property and the change event for visibility
  setVisibilityProperties: function () {
    var hidden, visibilityChange;
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    return {
      'hidden': hidden,
      'visibilityChange': visibilityChange
    };
  },
  addVisibilityListener: function (pageVisibility, handleVisibilityChange) {
    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === 'undefined' || typeof document[pageVisibility.hidden] === 'undefined') {
      console.log('This page requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.');
    } else {
      // Handle page visibility change
      document.addEventListener(pageVisibility.visibilityChange, function () {
        handleVisibilityChange();
      });
    }
  },
  initWave: function (el) {
    el.insertAdjacentHTML('afterBegin', this.renderDots(el));
  },
  deleteDots: function (el) {

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  },
  renderDots: function (el) {
    var rows = this.data.rows,
      elements = this.data.elements,
      geometry = el.getAttribute('geometry'),
      widthStepValue = geometry.width / rows,
      depthStepValue = geometry.depth / elements,
      allDots = "",
      positionX,
      positionY;

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < elements; j++) {
        positionX = i * widthStepValue;
        positionY = j * depthStepValue;

        allDots += '<a-entity mixin=\"dot\" position=\"' + positionX + ' 0 ' + positionY + '\"' +
          'animation__scale=\"property: scale; easing: easeInOutQuad; dir: alternate; dur: 1500; to: 2 2 2; loop: true; delay:' + j * 300 + '\" ' +
          'animation__jump=\"property: position; easing: easeInOutQuad; dir: alternate; dur: 1500; to: ' +
          +positionX + ' 1.8 ' + positionY + '; loop: true; delay:' + j * 300 + '\">' +
          '</a-entity >';

        // allDots += '<a-entity mixin=\"dot\" position=\"' + positionX + ' 0 ' + positionY + '\">' +
        //   '<a-animation attribute=\"position\" duration=\"1000\" to=\"' + positionX + ' 2.3 ' + positionY + '\" delay=\"' + j * 250 + '\" easing=\"ease-in-out-cubic\" repeat=\"indefinite\" direction=\"alternate\"></a-animation>' +
        //   '<a-animation attribute=\"scale\" duration=\"1000\" to=\"1.5 1.5 1.5\" delay=\"' + j * 250 + ' easing=\"ease-in-out-quad\" repeat=\"indefinite\" direction=\"alternate\"></a-animation>' +
        //   '</a-entity >';
      }
    }

    return allDots;
  }
});