AFRAME.registerComponent('glow', {
    schema: {
      color: { default: '#ffffff', type: 'color' },
      intensity: { default: 1.0 }
    },
    init: function () {
      this.el.addEventListener('object3dset', function () {
        this.update();
      }.bind(this));
    },
    update: function () {
      var data = this.data;
      this.el.object3D.traverse(function (node) {
        if (node.isMesh) {
          node.material.emissive.copy(new THREE.Color(data.color));
          node.material.emissiveIntensity = data.intensity;
        }
      });
    }
  });

  /**
   * Simple spin-and-levitate animation.
   */
  AFRAME.registerComponent('levitate', {
    tick: function (t, dt) {
      var mesh = this.el.getObject3D('mesh');
      if (!mesh) return;
      mesh.rotation.y += 0.1 * dt / 1000;
      mesh.position.y = 0.25 * Math.sin(t / 1000);
    }
  });

  /**
   * Removes current element if on a mobile device.
   */
  AFRAME.registerComponent('not-mobile', {
    init: function () {
      var el = this.el;
      if (el.sceneEl.isMobile) {
        el.parentEl.remove(el);
      }
    }
  });
  AFRAME.registerComponent('road', {
    schema: {
      length: { type: 'number', default: 5 },
      width: { type: 'number', default: 5 },
      color: { type: 'color', default: '#000000' },
      dashed: { type: 'boolean', default: true }
    },
    init: function () {
      var data = this.data;
      var el = this.el;

      var geometry = new THREE.PlaneGeometry(data.width, data.length);
      var material = new THREE.MeshStandardMaterial({ color: data.color });
      var mesh = new THREE.Mesh(geometry, material);

      mesh.rotation.x = -Math.PI / 2;
      el.setObject3D('mesh', mesh);

      if (data.dashed) {
        var dashLength = 0.5;
        var dashWidth = 0.1;
        var dashColor = '#FFFFFF';
        var dashMaterial = new THREE.MeshStandardMaterial({ color: dashColor });
        var dashGeometry = new THREE.PlaneGeometry(dashWidth, dashLength);

        for (var i = -data.length / 2; i < data.length / 2; i += dashLength * 2) {
          var dash = new THREE.Mesh(dashGeometry, dashMaterial);
          dash.position.set(0, 0.01, i + dashLength / 2);
          dash.rotation.x = -Math.PI / 2;
          el.object3D.add(dash);
        }



        // Add dashed line in the middle horizontally
        var sideDashLength = 0.1;
        var sideDashWidth = 0.5;
        var sideDashGeometry = new THREE.PlaneGeometry(sideDashWidth, sideDashLength);

        for (var j = -data.width / 2; j < data.width / 2; j += sideDashWidth * 2) {
          var sideDash = new THREE.Mesh(sideDashGeometry, dashMaterial);
          sideDash.position.set(j + sideDashWidth / 2, 0.01, 0);
          sideDash.rotation.x = -Math.PI / 2;
          el.object3D.add(sideDash);
        }
      }
    }

  });
  
  AFRAME.registerComponent('fence', {
    schema: {
      length: { type: 'number', default: 1 },
      height: { type: 'number', default: 1 },
      color: { type: 'color', default: '#8B4513' }
    },
    init: function () {
      var data = this.data;
      var el = this.el;

      var geometry = new THREE.BoxGeometry(data.length, data.height, 0.1);
      var material = new THREE.MeshStandardMaterial({ color: data.color });
      var mesh = new THREE.Mesh(geometry, material);

      el.setObject3D('mesh', mesh);
    }
  });