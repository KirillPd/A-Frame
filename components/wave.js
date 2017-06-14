AFRAME.registerComponent('wave', {
  schema: {
    rows: {
      type: 'number',
      default: 5
    },
    elements: {
      type: 'number',
      default: 5
    },
    grow: {
      type: 'number',
      default: 1.2
    },
    invertScale: {
      type: 'boolean',
      default: false
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
      growDelta = this.data.grow,
      geometry = el.getAttribute('geometry'),
      widthStepValue = geometry.width / rows,
      depthStepValue = geometry.depth / elements,
      allDots = "",
      animationScale = "",
      positionX,
      positionY;
    
    if (this.data.invertScale) {
      animationScale = "from: 2 2 2; to: 0.5 0.5 0.5;"
    } else {
      animationScale = "to: 2 2 2; from: 0.5 0.5 0.5;"
    }

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < elements; j++) {
        positionX = i * widthStepValue;
        positionY = j * depthStepValue;

        allDots += '<a-entity mixin=\"dot\" position=\"' + positionX + ' ' + growDelta + ' ' + positionY + '\"' +
          'animation__scale=\"property: scale; easing: easeInOutQuad; dir: alternate; dur: 1200;' + animationScale + ' loop: true; delay:' + j * 300 + '\" ' +
          'animation__jump=\"property: position; easing: easeInOutQuad; dir: alternate; dur: 1200; ' +
          'from: ' + positionX + ' ' + growDelta + ' ' + positionY + '; ' +
          'to: ' + positionX + ' ' + growDelta * 2 + ' ' + positionY + '; loop: true; delay:' + j * 300 + '\">' +
          '</a-entity >';
      }
    }

    return allDots;
  },
  calcPositionY: function (rowNumber, elementNumber, elements) {
    // if (rowNumber >= elements / 2) {
    //   return (rowNumber + elementNumber * 0.01) % (elements / 4);
    // }
    return 1.1;
  }
});