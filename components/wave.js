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
    var element = this.el;

    element.insertAdjacentHTML('afterBegin', this.renderDots());
  },
  renderDots: function () {
    var rows = this.data.rows,
      elements = this.data.elements,
      geometry = this.el.getAttribute('geometry'),
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
          'animation__scale=\"property: scale; easing: easeInOutQuad; dir: alternate; dur: 1000; to: 1.5 1.5 1.5; loop: true; delay:' + j * 1000 + '\" ' +
          'animation__jump=\"property: position; easing: easeInOutQuad; dir: alternate; dur: 1000; to: ' +
            + positionX + ' 2.3 ' + positionY +'; loop: true; delay:' + j * 1000 + '\">' +
          '</a-entity >';
      }
    }

    return allDots;
  }
});