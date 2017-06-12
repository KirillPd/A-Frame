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
    var sceneEl = document.querySelector('a-scene'),
      elements = sceneEl.querySelectorAll('[garland]'),
      delay = this.data.delay || 0,
      colors = this.data.colors || ['red', 'cyan', 'blue', 'yellow'];

    for (var i = 0; i < elements.length; i++) {
      (function (i) {
        setInterval(function () {
          let colorId = calcRandom(colors.length, 0),
            currentColor = elements[i].getAttribute('material').color,
            newColor = colors[colorId];

          while (true) {
            if (currentColor === newColor) {
              colorId = calcRandom(colors.length, 0);
              newColor = colors[colorId];
            } else {
              break;
            }
          };

          elements[i].setAttribute('material', 'color', colors[colorId]);
        }, delay);
      })(i);
    }

    function calcRandom(max, min) {
      return Math.round(Math.random() * (max - min)) + min;
    }
  }
});