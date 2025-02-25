AFRAME.registerComponent('custom-material', {
  init: function () {
    let el = this.el;
    let mesh = el.getObject3D('mesh');
    
    if (mesh) {
      let uniforms = {
        u_time: { value: 0.0 }
      };

      let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
          varying vec3 vPosition;
          void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vPosition;
          void main() {
            float gridSize = 3.0;
            float lines = mod(vPosition.x, gridSize) < 0.1 || mod(vPosition.z, gridSize) < 0.1 ? 0.2 : 1.0;
            vec3 color = mix(vec3(0.2, 0.2, 0.2), vec3(0.3, 0.3, 0.3), lines);
            gl_FragColor = vec4(color, 1.0);
          }
        `
      });

      mesh.material = material;
    }
  }
});

document.querySelector("#ground").setAttribute("custom-material", "");


document.addEventListener("DOMContentLoaded", () => {
  let isDay = true;
  const sky = document.getElementById("sky");
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  
  setInterval(() => {
    isDay = !isDay;
    if (isDay) {
      sky.setAttribute("color", "#87CEEB"); // Bleu ciel
      sun.setAttribute("visible", "true");
      moon.setAttribute("visible", "false");
    } else {
      sky.setAttribute("color", "#1a1a2e"); // Bleu nuit
      sun.setAttribute("visible", "false");
      moon.setAttribute("visible", "true");
    }
  }, 500000); // Change toutes les 5 secondes
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
