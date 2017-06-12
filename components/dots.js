AFRAME.registerComponent('dots', {
  schema: {
    radius: {
      type: 'number',
      default: 0.1
    },
    widthSegments: {
      type: 'number',
      default: 32
    },
    heightSegments: {
      type: 'number',
      default: 32
    },
    color: {
      type: 'color',
      default: '#000'
    },
    elements: {
      type: 'number',
      default: 10
    }
  },
  init: function () {
    var data = this.data;
    var el = this.el;

    this.geometry = new THREE.SphereBufferGeometry(data.radius, data.widthSegments, data.heightSegments);
    this.material = new THREE.MeshStandardMaterial({
      color: data.color
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    el.setObject3D('mesh', this.mesh);
  },
  /**
   * Update the mesh in response to property updates.
   */
  update: function (oldData) {
    var data = this.data;
    var el = this.el;
    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) {
      return;
    }
    // Geometry-related properties changed. Update the geometry.
    if (data.radius !== oldData.radius ||
      data.widthSegments !== oldData.widthSegments ||
      data.heightSegments !== oldData.heightSegments) {
      el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.radius, data.widthSegments, data.heightSegments);
    }
    // Material-related properties changed. Update the material.
    if (data.color !== oldData.color) {
      el.getObject3D('mesh').material.color = data.color;
    }
  }
});