AFRAME.registerComponent('garland', {
  schema: {
    delay: {
      type: 'number'
    },
    colors: {
      type: 'string'
    }
  },
  init: function () {
    var element = this.el,
      delay = this.data.delay || 2000,
      colors = this.data.colors || ['red', 'cyan', 'blue', 'yellow'];

    setInterval(function () {
      let colorId = calcRandom(colors.length, 0),
        currentColor = element.getAttribute('material').color,
        newColor = colors[colorId];

      while (true) {
        if (currentColor === newColor) {
          colorId = calcRandom(colors.length, 0);
          newColor = colors[colorId];
        } else {
          break;
        }
      };

      element.setAttribute('material', 'color', newColor);
    }, delay);

    function calcRandom(max, min) {
      return Math.round(Math.random() * (max - 1 - min)) + min;
    }
  }
});