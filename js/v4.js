
//let canvas, camera, scene, renderer, scroll_xy;

var ambient, light, fov, aspect, near, far;

var curCount;

const models = [
    {
        obj: "./3d/bloodhound.obj",
        mtl: "./3d/bloodhound.mtl",
        mesh: null,
        cam: [0,20,250],
        tf: [10,-20,0],
        rt: [0,-0.5,0]
    },
    {
        obj: "./3d/nationals.obj",
        mtl: "./3d/nationals.mtl",
        mesh: null,
        cam: [0,20,250],
        tf: [10,-20,0],
        rt: [0,-0.5,0]
    },
    {
        obj: "./3d/ydsp.obj",
        mtl: "./3d/ydsp.mtl",
        mesh: null,
        cam: [0,50,500],
        tf: [0,-120,0],
        rt: [0.3,-0.5,0]
    },
    {
        obj: "./3d/clock assembly.obj",
        mtl: "./3d/clock assembly.mtl",
        mesh: null,
        cam: [100,500,1200],
        tf: [0,200,0],
        rt: [0,0,0]
    },
    {
        obj: "./3d/piano.obj",
        mtl: "./3d/piano.mtl",
        mesh: null,
        cam: [0,0,250],
        tf: [10,-30,0],
        rt: [0.4,-0.5,0]
    }
  ]

let controls = [];
let scenes= []; let cameras = []; 

initial();
animate();

function initial() {
    const fov = 45;
    const aspect = 1.97;
    const near = 0.1;
    const far = 10000;

    renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( canvases[0].clientWidth, canvases[0].clientHeight );

    for (var i = 0;i < models.length;i++) {
        const ambient = new THREE.AmbientLight(0x404040,1);
        const light = new THREE.DirectionalLight(0xffffff,1);
        light.position.set(0,10,6);
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        scene.add(ambient); scene.add(light);

        var cur = models[i];
        
        /*var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load(cur.mtl, function(materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(cur.obj, function(object) {
                object.translateY(cur.translate);
            });
        });*/
        loadObj(scene,i);
        scenes.push(scene);
        //console.log(scenes[0]);

        camera.position.set(cur.cam[0],cur.cam[1],cur.cam[2]);
        cameras.push(camera);
        //controls[i] = new THREE.TrackballControls( cameras[i], renderer.domElement );
    }
    canvases[0].appendChild( renderer.domElement );
    controls = new THREE.TrackballControls( cameras[0], renderer.domElement );
}

function loadObj(scene, idx) {
    var cur = models[idx];
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(cur.mtl, function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(cur.obj, function(object) {
            object.position.set(cur.tf[0],cur.tf[1],cur.tf[2]);
            object.rotation.set(cur.rt[0],cur.rt[1],cur.rt[2]);
            //object.translateY(cur.translate);
            cur.mesh = object;
            scene.add(object);
        });
    });
    return scene;
}

//const prev = document.getElementById('pre');
//const next = document.getElementById('nxt');
pre.onclick = () => { 
    updateMesh(ctr);
    //if (ctr == 6) { updateMesh(1); }
    //else if (ctr == 0) { updateMesh(5); }
    //else updateMesh(ctr);
    /*console.log(ctr); 
    canvases[ctr].appendChild( renderer.domElement ); 
    controls = new THREE.TrackballControls( cameras[ctr], renderer.domElement );
    cameras[ctr].position.set(cur.cam[0],cur.cam[1],cur.cam[2])*/
}
nxt.onclick = () => { 
    updateMesh(ctr);
    //if (ctr == 6) { updateMesh(1); }
    //else if (ctr == 0) { updateMesh(5); }
    //else updateMesh(ctr);
    /*console.log(ctr); 
    canvases[ctr].appendChild( renderer.domElement );
    controls = new THREE.TrackballControls( cameras[ctr], renderer.domElement );*/
}

function updateMesh(idx) {
    controls.reset();
    canvases[idx].appendChild(renderer.domElement); 
    controls = new THREE.TrackballControls(cameras[idx], renderer.domElement);
    var cur = models[idx];
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render(scenes[ctr], cameras[ctr]);
    controls.update();
}

window.addEventListener('resize', () => {
    renderer.setSize( canvases[ctr].clientWidth, canvases[ctr].clientHeight );
    controls.handleResize();
});
/*
function init() {
    canvases = document.querySelectorAll('.scene');
    currCount = 0;

    // camera
    fov = 45;
    aspect = canvases[0].clientWidth / canvases[0].clientHeight;  // the canvas default
    near = 0.1;
    far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0,20,250);

    // world
    scene = new THREE.Scene();

    // lights
    ambient = new THREE.AmbientLight(0x404040,1);
    light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(0,10,6);
    scene.add(ambient);
    scene.add(light);

    // renderer
    renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( canvases[0].clientWidth, canvases[0].clientHeight );
    //canvas.appendChild( renderer.domElement );
    canvases[1].appendChild(renderer.domElement);

    // model
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('./3d/bloodhound.mtl', function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('./3d/bloodhound.obj', function(object) {
            scene.add(object);
        });
    });
    
    controls = new THREE.TrackballControls( camera, renderer.domElement );

}

function updateMesh() {
    scene = new THREE.Scene();
    scene.add(ambient); scene.add(light);
    var cur = models[ctr];
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(cur.mtl, function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(cur.obj, function(object) {
            object.translateY(cur.translate);
            scene.add(object);
        });
    });
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(cur.cam[0],cur.cam[1],cur.cam[2]);
    controls = new THREE.TrackballControls( camera, renderer.domElement );
    canvases[ctr].appendChild( renderer.domElement );
}

function createControls( camera ) {
    controls = new TrackballControls( camera, renderer.domElement );

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.keys = [ 65, 83, 68 ];
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}

function render() {
    renderer.render( scene, camera );
}*/