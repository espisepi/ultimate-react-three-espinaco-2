import * as THREE from "three";
import {
  RollerCoasterGeometry,
  RollerCoasterShadowGeometry,
  RollerCoasterLiftersGeometry,
  TreesGeometry,
  SkyGeometry,
} from "three/addons/misc/RollerCoaster.js";
import { disposeAll } from "../../utils/disposeAll";

export default class RollercoasterClass {
  constructor({ scene, camera, videoTexture, isWireframe = false, isColor = false, urlSound = 'videos/jaguar.mp4', volume = 0.0, circuit = 0, isVisibleTube = false }) {

    this.meshesRollercoaster = [];
    
    let geometry, material, mesh;

    const train = new THREE.Object3D();
    train.name = "train";
    scene.add(train);
    // Este codigo es el que se encarga de controlar la camara
    // Para cambiar de control hay que jugar con el add y remove
    // train.add(camera);
    this.train = train;

    const PI2 = Math.PI * 2;

    const SIZE_ROLLERCOASTER = 5;
    const SIZE_FUNCHAIRS = 2;

    const curve = (function () {
      const vector = new THREE.Vector3();
      const vector2 = new THREE.Vector3();

      return {
        getPointAt: function (t) {
          t = t * PI2;

          let x,y,z;

          // Circuito 1
          if(circuit === 0) {
            x = Math.sin(t * 3) * Math.cos(t * 4) * 50;
            y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5;
            z = Math.sin(t) * Math.sin(t * 4) * 50;
          }

          // Circuito 2
          if(circuit === 1) {
            x = Math.sin(t * 6) * Math.cos(t * 3) * 70;
            y = Math.sin(t * 10) * 30 + Math.cos(t * 15) * 10 + 20;
            z = Math.sin(t * 8) * Math.cos(t * 4) * 60;
          }

          return vector.set(x, y, z).multiplyScalar(SIZE_ROLLERCOASTER);
        },

        getTangentAt: function (t) {
          const delta = 0.0001;
          const t1 = Math.max(0, t - delta);
          const t2 = Math.min(1, t + delta);

          return vector2
            .copy(this.getPointAt(t2))
            .sub(this.getPointAt(t1))
            .normalize();
        },
      };
    })();

    geometry = new RollerCoasterGeometry(curve, 1500);
    material = new THREE.MeshPhongMaterial({
      vertexColors: isColor,
      wireframe: isWireframe,
      map: videoTexture
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    this.meshesRollercoaster.push(mesh);

    geometry = new RollerCoasterLiftersGeometry(curve, 100);
    material = new THREE.MeshPhongMaterial({wireframe: isWireframe, map: videoTexture});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.1;
    scene.add(mesh);
    this.meshesRollercoaster.push(mesh);


    geometry = new RollerCoasterShadowGeometry(curve, 500);
    material = new THREE.MeshBasicMaterial({
      color: isColor ? 0x305000 : null,
      depthWrite: false,
      transparent: true,
      wireframe: isWireframe,
      map: videoTexture
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.1;
    scene.add(mesh);
    this.meshesRollercoaster.push(mesh);


    // pintar tuberia en las vias ====================
    class CustomSinCurve extends THREE.Curve {

      constructor( scale = 1 ) {
        super();
        this.scale = scale;
      }

      getPoint( t) {
        const vector = new THREE.Vector3();

        t = t * PI2;

        let x,y,z;

        // Circuito 1
        if(circuit === 0) {
          x = Math.sin(t * 3) * Math.cos(t * 4) * 50;
          y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5;
          z = Math.sin(t) * Math.sin(t * 4) * 50;
        }

        // Circuito 2
        if(circuit === 1) {
          x = Math.sin(t * 6) * Math.cos(t * 3) * 70;
          y = Math.sin(t * 10) * 30 + Math.cos(t * 15) * 10 + 20;
          z = Math.sin(t * 8) * Math.cos(t * 4) * 60;
        }

        return vector.set(x, y, z).multiplyScalar(SIZE_ROLLERCOASTER);
      }
    }

    if(isVisibleTube) {
      const path  = new CustomSinCurve( 100 );
      geometry = new THREE.TubeGeometry( path, 500, 10, 500, false );

      // Modificar los atributos UV ========
      // const uvAttribute = geometry.attributes.uv;
      // const uvRepeatX = 50; // Número de repeticiones en el eje X
      // const uvRepeatY = 50; // Número de repeticiones en el eje Y

      // for (let i = 0; i < uvAttribute.count; i++) {
      //     const u = uvAttribute.getX(i) * uvRepeatX;
      //     const v = uvAttribute.getY(i) * uvRepeatY;
      //     uvAttribute.setXY(i, u, v);
      // }
      // uvAttribute.needsUpdate = true;
      // Modificar los atributos UV ========

      material = new THREE.MeshBasicMaterial( { wireframe: true, map: videoTexture, side: THREE.DoubleSide } );
      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );
      this.meshesRollercoaster.push(mesh);
      // mesh.visible = isVisibleTube; // Por performance, no creo el mesh en vez de ocultarlo

    }
    // FIN pintar tuberia en las vias ====================

    // funfairs ==========================

    const funfairs = [];

    //

    geometry = new THREE.CylinderGeometry(10, 10, 5, 15);
    material = new THREE.MeshLambertMaterial({
      color: isColor ? 0xff8080 : null,
      wireframe: isWireframe,
      map: videoTexture
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-80, 10, -70);
    mesh.rotation.x = Math.PI / 2;
    scene.add(mesh);

    funfairs.push(mesh);

    geometry = new THREE.CylinderGeometry(5, 6, 4, 10);
    material = new THREE.MeshLambertMaterial({
      color:  isColor ? 0x8080ff : null,
      wireframe: isWireframe,
      map: videoTexture
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(50, 2, 30);
    scene.add(mesh);

    funfairs.push(mesh);

    geometry = new THREE.BoxGeometry(10, 10, 10);
    material = new THREE.MeshLambertMaterial({
      color:  isColor ? 0x8080ff : null,
      wireframe: isWireframe,
      map: videoTexture,
      side: THREE.DoubleSide
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 2, 50);
    scene.add(mesh);

    funfairs.push(mesh);

    // scale funchairs
    for (let i = 0; i < funfairs.length; i++) {
      funfairs[i].scale.set(SIZE_FUNCHAIRS, SIZE_FUNCHAIRS, SIZE_FUNCHAIRS);
      // console.log(funfairs[i].scale)
    }

    this.funfairs = funfairs;


    //

    const position = new THREE.Vector3();
    const tangent = new THREE.Vector3();

    const lookAt = new THREE.Vector3();

    let velocity = 0;
    let progress = 0;

    let prevTime = performance.now();

    // Used variables in update method ============
    this.prevTime = prevTime;
    this.funfairs = funfairs;
    this.progress = progress;
    this.position = position;
    this.curve = curve;
    this.train = train;
    this.tangent = tangent;
    this.velocity = velocity;
    this.lookAt = lookAt;
    this.camera = camera;
    this.urlSound = urlSound;
    this.volume = volume;

    // Used variables in another methods (as dispose())
    this.scene = scene;

    // init sound
    this.initSound();

  }

  initSound() {
    // Audio setup
    const audioListener = new THREE.AudioListener();
    this.camera.add(audioListener);

    const audio = new THREE.Audio(audioListener);

    const volume = this.volume;

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(this.urlSound, function(buffer) {
      // console.log({buffer,audio})
      audio.setBuffer(buffer);
      audio.setLoop(true);
      audio.setVolume(volume);
      audio.play();
      // audio.hasPlaybackControl = true; // default
    });

    // Used variables in update method ============
    this.audio = audio;

  }

  update() {
    const time = performance.now();
    const delta = time - this.prevTime;

    for (let i = 0; i < this.funfairs.length; i++) {
      this.funfairs[i].rotation.y = time * 0.0004;
    }

    //

    this.progress += this.velocity;
    this.progress = this.progress % 1;

    this.position.copy(this.curve.getPointAt(this.progress));
    this.position.y += 0.3;

    this.train.position.copy(this.position);

    this.tangent.copy(this.curve.getTangentAt(this.progress));

    this.velocity -= this.tangent.y * 0.0000001 * delta;
    this.velocity = Math.max(0.00004, Math.min(0.0002, this.velocity));

    this.train.lookAt(this.lookAt.copy(this.position).sub(this.tangent));

    //

    // renderer.render(scene, camera);

    this.prevTime = time;

    // update sound ======================
    // Adjust audio playback rate based on speed

    if (this.audio?.isPlaying) {
      // console.log(this.audio.playbackRate)
      // console.log( this.velocity * 10000 )
      this.audio.setPlaybackRate(this.velocity * 10000);  // Adjust the multiplier as needed for realism
    } 
  }

  // Hacer dispose para cuando quitemos el rollercoaster controls
  dispose() {
    // dispose meshes rollercoaster
    this.meshesRollercoaster.forEach((mesh) => {
      this.scene.remove(mesh);
      disposeAll(mesh);
    });

    // dispose meshes funfairs
    this.funfairs.forEach((mesh) => {
      this.scene.remove(mesh);
      disposeAll(mesh);
    });
  }
}
