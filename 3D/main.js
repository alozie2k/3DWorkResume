import './style.css'
import * as THREE  from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// the orbits controls class




const scene = new THREE.Scene();
//the scene  is like a container that holds all your objetcs cameras and lights
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// the first number is the field of view and the second number is the aspect ratio which is based off the users browser window
// then the last two numbers is for the view frustum to control what objects are visible relative to the camera itself

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  // render needs to know what dom element to use()
//the renderer renders out the actual graphics to the scene// aka make the magic happen

});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// making it a full screen canvas by setting the render size to the window size
camera.position.setZ(30);
//moving it along the z axis so you get a better perspective when we start adding shapes
renderer.render(scene, camera);
//renderer.render method passing the scence and camera as render arguments

//now your creating an objects
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// geometry - the {x,y,z} points that makeup a shape
//torus creates a big 3d ring 
// three js website  has a bunch  shapes you can choose from 
const  material = new THREE.MeshStandardMaterial({color: 0xFF6347});
//MeshStandard Material is a meterial

//const  material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe:true});
// material gives the 3d object some type of color  or texture/ its like the wrapping paper for an object
//can find many diifernt material functions you can use outside of meshbasicmaterial in the three.js site
// can also use custom shaders from web gl
//most material require a light source to bounce off of them but for basicmaterial you dont need one
//setting wireframe to true helps you get a better look at its geometry

const torus=new THREE.Mesh(geometry, material);
//now we are creating a mesh and combining the geomtry with the material

scene.add(torus);
// now we add the torus we just created to the scene

const pointLight = new THREE. PointLight(0xffffff);
//creating lighting(pointlight -emits light in all directions)
//can find more different lighting functions in the site

pointLight.position.set(5,5,5);
//postioning it to move away from the center
// numbers inside change how the object will look by postioning the light
//for ex 5 ,5 ,5 looks a flat orange circel with a black spot inbetween while 30,30,30 looks more a full on ring 


const ambientLight= new THREE.AmbientLight(0xffffff);
// ambient light lights up everthing in  the scene equally(so it makes the object with the 5 5 5 point light a lot more fuller and like a 3d ring )
scene.add(pointLight, ambientLight);
//then you add the object to the scene


//renderer.render(scene, camera)
// then you have to render the scence so you can see the object you made 


//since you dont want to have to call the render method all the time so u
// set  up a recursive function(function animate) that gives us an infinite loop that cause the render method automically


//const lightHelper= new THREE.PointLightHelper(pointLight);
//const gridHelper= new THREE.GridHelper(200,50);
//draws a two dimesional grid along the scene(the gray line)

//scene.add(lightHelper ,gridHelper);
// adds  a wireframe that shows us the postion of a point light 

const controls =new OrbitControls(camera, renderer.domElement);
//what this will do use the domelemt is that it will listen to elements on the mouse and update the camera postion accoddingly to that
// pretty much lets you move an object and reacts to it 

function addStar(){
  const geometry=new THREE.SphereGeometry(0.25, 24, 24);
  //gives each created sphere a radius of .25
  //gives the star shapes(sphere)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  // gives the star more star like color
  const star = new THREE.Mesh(geometry, material);


  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
//creating an array to randomly postion the objects around the canvas with
//you fill the array with 3 values (x,y,z) then you map each value to the random float function with is just a hepler function that randomly generates a numbers through -100 and postive 100 

  star.position.set(x, y, z);
  // then you take those random numbers and give the star a postion 
  scene.add(star);
  
  //pouplating the canvas with a bunch of random objects/stars 
}
Array(200).fill().forEach(addStar);
//creating a value and puuting it in array to decide how many stars to put on the canvas/then u add the addStar function inside it

const spaceTexture= new THREE.TextureLoader().load('space.png');
//loading an image to create a background
scene.background=spaceTexture;


const faceTexture = new THREE.TextureLoader().load('face.jpg');

const face = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), 
new THREE.MeshBasicMaterial({ map: faceTexture }));
//creating a boxe with face image wrp around it 
scene.add(face);



const moonTexture = new THREE.TextureLoader().load('planet.png');
const normalTexture = new THREE.TextureLoader().load('normal.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
    //normal texture is adding texture to the object/normal pretty much makes the object more relastic
  })
);

scene.add(moon);
//creating a moon


moon.position.z = 30;
moon.position.setX(-10);
//putting the moon futher down the z axis(which means more behind other objects than it was)(which is where we are scrolling )and setting its x axis more to the right
// can either assign values using the equal sign or assign them using the equal sign 
face.position.z = -5;
// negative is going to put the object more in front 
face.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // this calcs what the user is scroll at 
  //clientRect- thta gives us the dimesions of the viewport and top properety shows us how far we are from the top of the top of te webpage 
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;


  face.rotation.y += 0.01;
  face.rotation.z += 0.01;
  // manipulates the postion of the object
  // is telling what axis it rotates on and how fast it rotates 

  camera.position.z = t * -0.01;
  //top value will always be negative so u mutiple it by a negative 
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
// this fires  the fuction anytime a user scrolls
moveCamera();


function animate(){ //gameloop
  requestAnimationFrame(animate); 
  // this calls request animation frame in the browser
  //which is mechism that ells the browser that you want to perform an animation
 
 torus.rotation.x += 0.01;
 torus.rotation.y += 0.005;
 torus.rotation.z += 0.01;
 //every shape you create has different properties like rotation, postion and scale
 // and if you change its properties inside the loop the shape will animate 
 // updating the rotation for every animation frame(causing the shape to rotate)
 
 controls.update();
 // do this to make sure the changes in orbit control are reflected

 renderer.render(scene,camera);
  //so then whenever the browser repaints the screen it will call your render method to update it 
}

animate()
// calling the function 

