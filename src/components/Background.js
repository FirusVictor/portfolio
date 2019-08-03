import React, {Component} from 'react'
import * as THREE from 'three'
import srcLogo from '../res/logo.png'
export default class Background extends Component {

  componentDidMount() {
    //загрузка изображений
    let logo = new Image();
    logo.src = srcLogo;

    //проверка загрузки изображений
    logo.onload = CheckLoadImages;
    function CheckLoadImages() {
      if (
        logo.complete
      ) {
        init();
      }
    }

    let mouseX = 0, mouseY = 0;
    let scene,camera,renderer;
    let points;

    function init() {
      //получаем данные логотипа
      let pixelsLogo = GetImageData(logo);

      //SCENE
      scene = new THREE.Scene();
      //CAMERA
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set( 0, 0, 200 );
      camera.lookAt( 0, 0, 0 );

      let numPoints = pixelsLogo.length/4;
      let geometry = new THREE.BufferGeometry();
      let positions = [];
      let colors = [];

      //Заполняем массив геометрии и цветов
      for (let i = 0; i < numPoints; i++) {
        //если прозрачный, то пропускаем пиксель
        if(pixelsLogo[4*i+3]===0)
          continue;
        let x = i % logo.width;
        let y = Math.floor(i / logo.width);
        positions.push(
          x*(1+Math.random()/20)-logo.width/2,
          -y*(1+Math.random()/20)+logo.height/2,
          Math.random()*10-5
        );
        let color = new THREE.Color('rgb('+pixelsLogo[4*i]+','+pixelsLogo[4*i+1]+','+pixelsLogo[4*i+2]+')');
        colors.push(color.r,color.g,color.b);
      }

      geometry.addAttribute('position', new THREE.Float32BufferAttribute( positions, 3 ));
      geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
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
      document.addEventListener( 'mousemove', onDocumentMouseMove, false );

      //Запускаем анимацию
      animate();
    }
    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y+=0.02;
      camera.position.x = ( mouseX - camera.position.x ) * 0.04;
      camera.position.y = ( - mouseY - camera.position.y ) * 0.04;
      renderer.render(scene, camera);
    }

    function onDocumentMouseMove( event ) {
      mouseX = event.clientX - window.innerWidth / 2;
      mouseY = event.clientY - window.innerHeight / 2;
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