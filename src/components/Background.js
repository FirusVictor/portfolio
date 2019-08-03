import React, {Component} from 'react'
import * as THREE from 'three'

export default class Background extends Component {

  componentDidMount() {
    //загрузка изображений
    let logo = new Image();
    logo.src = "data:image/png;base64,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";

    //проверка загрузки изображений
    logo.onload = CheckLoadImages;
    function CheckLoadImages() {
      if (
        logo.complete
      ) {
        init();
      }
    }

    let scene;
    let camera;
    let renderer;
    let points;
    function init() {
      //получаем данные логотипа
      let pixelsLogo = GetImageData(logo);

      //SCENE
      scene = new THREE.Scene();
      //CAMERA
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z=200;

      let numPoints = pixelsLogo.length/4;
      let geometry = new THREE.BufferGeometry();
      let positions = new Float32Array(numPoints * 3);
      let colors = new Float32Array(numPoints * 3);
      

      for (let i = 0; i < numPoints; i++) {
        let x = i % logo.width;
        let y = Math.floor(i / logo.width);
        positions[3 * i ] = x*(1+Math.random()/20)-logo.width/2;
        positions[3 * i +1] = -y*(1+Math.random()/20)+logo.height/2;
        positions[3 * i +2] = Math.random()*10-5;

        let color = new THREE.Color('rgb('+pixelsLogo[4*i]+','+pixelsLogo[4*i+1]+','+pixelsLogo[4*i+2]+')');
        colors[3 * i] = color.r;
        colors[3 * i + 1] = color.g;
        colors[3 * i + 2] = color.b;
      }
console.log(pixelsLogo);
      geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.computeBoundingBox();
      let material = new THREE.PointsMaterial({size: 1, vertexColors: THREE.VertexColors});
      points = new THREE.Points(geometry, material);

      scene.add(points);


      //RENDER
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.id = 'mainBackground';
      document.body.appendChild(renderer.domElement);
      window.addEventListener('resize', onWindowResize, false);

      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y+=0.03;
      renderer.render(scene, camera);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function GetImageData(image) {
      let canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, image.width, image.height);
      return ctx.getImageData(0, 0, image.width, image.height).data;
    }

  }

  render() {
    return (
      <div className='background'>
      </div>
    )
  }
}