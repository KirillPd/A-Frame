AFRAME.registerComponent('dots', {
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
    rows = this.data.rows,
      elements = this.data.elements,
      geometry = this.el.getAttribute('geometry'),
      widthStepValue = geometry.width / rows,
      depthStepValue = geometry.depth / elements,
      allDots = "";

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < elements; j++) {
        allDots += '<a-entity mixin=\"dot\" position=\"' + i * widthStepValue + ' 0 ' + j * depthStepValue + '\"></a-entity>';
        console.log(`row : ${i} ; element : ${j} ; widthStepValue : ${i * widthStepValue}; depthStepValue : ${j * depthStepValue}`);
      }
    }

    return allDots;
  }
});