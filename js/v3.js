let clock, bloodhound, ydsp, nationals, piano, yep, dip;

main();

function main() {
    const canvas = document.createElement('canvas');
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
    renderer.setScissorTest(true);
  
    const sceneElements = [];
    function addScene(elem, fn) {
      const ctx = document.createElement('canvas').getContext('2d');
      elem.appendChild(ctx.canvas);
      sceneElements.push({elem, ctx, fn});
    }
  
    function makeScene(elem) {
        const scene = new THREE.Scene();
    
        const fov = 45;
        const aspect = canvas.clientWidth / canvas.clientHeight;  // the canvas default
        const near = 0.1;
        const far = 10000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 1, 2);
        camera.lookAt(0, 0, 0);
        scene.add(camera);

        const ambient = new THREE.AmbientLight(0x404040,1);
        const light = new THREE.DirectionalLight(0xffffff,1);
        light.position.set(0,10,6);
        scene.add(ambient);
        scene.add(light);
  
      return {scene, camera};
    }
  
    const sceneInitFunctionsByName = {
      'clock': (elem) => {
        const {scene, camera} = makeScene(elem);
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('./3d/clock assembly.mtl', function(materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('./3d/clock assembly.obj', function(object) {
                scene.add(object);
                clock = object;
            });
        });
        return (time, rect) => {
          clock.rotation.y = time * .25;
          camera.aspect = rect.width / rect.height;
          camera.position.set(0,400,1200);
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
      },
      'bloodhound': (elem) => {
        const {scene, camera} = makeScene(elem);
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('./3d/bloodhound.mtl', function(materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('./3d/bloodhound.obj', function(object) {
                scene.add(object);
                bloodhound = object;
            });
        });
        
        return (time, rect) => {
          bloodhound.rotation.y = time * .25;
          camera.aspect = rect.width / rect.height;
          camera.position.set(0,170,300);
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
      },
      'ydsp': (elem) => {
        const {scene, camera} = makeScene(elem);
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('./3d/ydsp.mtl', function(materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('./3d/ydsp.obj', function(object) {
                scene.add(object);
                ydsp = object;
            });
        });
        
        return (time, rect) => {
          ydsp.rotation.y = time * .25;
          camera.aspect = rect.width / rect.height;
          camera.position.set(0,400,600);
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
      },
      'nationals': (elem) => {
        const {scene, camera} = makeScene(elem);
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('./3d/nationals.mtl', function(materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('./3d/nationals.obj', function(object) {
                scene.add(object);
                nationals = object;
            });
        });
        
        return (time, rect) => {
          nationals.rotation.y = time * .25;
          camera.aspect = rect.width / rect.height;
          camera.position.set(0,170,300);
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
      },
      'piano': (elem) => {
        const {scene, camera} = makeScene(elem);
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('./3d/piano.mtl', function(materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('./3d/piano.obj', function(object) {
                scene.add(object);
                piano = object;
                //console.log(piano);
            });
        });
        
        return (time, rect) => {
          piano.rotation.y = time * .25;
          camera.aspect = rect.width / rect.height;
          camera.position.set(0,150,200);
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
      },
      'yep': (elem) => {
        const {scene, camera} = makeScene(elem);
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('./3d/yep.mtl', function(materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('./3d/yep.obj', function(object) {
                object.position.set(-3,0,0);
                object.rotation.set(-0.40,0,0);
                scene.add(object);
                yep = object;
            });
        });
        
        return (time, rect) => {
          yep.rotation.y = time * .25;
          camera.aspect = rect.width / rect.height;
          camera.position.set(0,23,50);
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
      },
      'dip': (elem) => {
        const {scene, camera} = makeScene(elem);
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('./3d/dip.mtl', function(materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('./3d/dip.obj', function(object) {
                object.position.set(0,-270,0);
                object.rotation.set(-0.2,0,0);
                scene.add(object);
                dip = object;
            });
        });
        
        return (time, rect) => {
          dip.rotation.y = time * .25;
          camera.aspect = rect.width / rect.height;
          camera.position.set(0,0,400);
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
      }
    };
  
    document.querySelectorAll('[data-diagram]').forEach((elem) => {
      const sceneName = elem.dataset.diagram;
      const sceneInitFunction = sceneInitFunctionsByName[sceneName];
      const sceneRenderFunction = sceneInitFunction(elem);
      addScene(elem, sceneRenderFunction);
    });
  
    function render(time) {
      time *= 0.001;
  
      for (const {elem, fn, ctx} of sceneElements) {
        // get the viewport relative position of this element
        const rect = elem.getBoundingClientRect();
        const {left, right, top, bottom, width, height} = rect;
        const rendererCanvas = renderer.domElement;
  
        const isOffscreen =
            bottom < 0 ||
            top > window.innerHeight ||
            right < 0 ||
            left > window.innerWidth;
  
        if (!isOffscreen) {
          // make sure the renderer's canvas is big enough
          if (rendererCanvas.width < width || rendererCanvas.height < height) {
            renderer.setSize(width, height, false);
          }
  
          // make sure the canvas for this area is the same size as the area
          if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
            ctx.canvas.width = width;
            ctx.canvas.height = height;
          }
  
          renderer.setScissor(0, 0, width, height);
          renderer.setViewport(0, 0, width, height);
  
          fn(time, rect);
  
          // copy the rendered scene to this element's canvas
          ctx.globalCompositeOperation = 'copy';
          ctx.drawImage(
              rendererCanvas,
              0, rendererCanvas.height - height, width, height,  // src rect
              0, 0, width, height);                              // dst rect
        }
      }
  
      requestAnimationFrame(render);
    }
  
    requestAnimationFrame(render);
  }
  
  