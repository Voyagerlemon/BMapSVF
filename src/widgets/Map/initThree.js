/*
 * @Author: Lauxb
 * @Date: 2021-09-11 14:22:54
 * @LastEditTime: 2021-09-14 11:28:59
 * @LastEditors: Lauxb
 * @Description:
 */

import { getChaos } from "@/utils/sceneUtils/chaos";
import * as THREE from "three";

/**
 *  three的坐标系（右手坐标系），关键数据结构 Vector3
 *    Y
 *    |
 *    |___ X
 *   /
 * Z
 *
 * Cesium的坐标系，关键数据结构 Cartesian3
 *    Z
 *    |
 *    |__ Y
 *   /
 * X
 *
 */

/**
 * three构建对象
 */
const threeObj = {
  renderer: null,
  camera: null,
  scene: null
};

let chaos = null;
let threeContainer = null;
// 模型绘制范围
const minWGS84 = [115.23, 39.55];
const maxWGS84 = [116.23, 41.55];
const threeDobjects = [];

/**
 * 开启ThreeJS
 */
const startThreeJs = $el => {
  chaos = getChaos();
  threeContainer = $el;
  // 关闭默认渲染循环
  chaos.viewer.useDefaultRenderLoop = false;
  initThree();
  createCesiumRange();
  createThreeObjs();
  loop();
};

/**
 * 初始化three
 */
const initThree = () => {
  const fov = 45;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;
  const near = 1;
  const far = 10 * 1000 * 1000;

  threeObj.scene = new THREE.Scene();
  threeObj.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  threeObj.renderer = new THREE.WebGLRenderer({
    alpha: true,
    logarithmicDepthBuffer: true
  });
  const Amlight = new THREE.AmbientLight(0xffffff, 2);
  threeObj.scene.add(Amlight);
  threeContainer.appendChild(threeObj.renderer.domElement);
};

/**
 * 手动调用cesium渲染
 */
const renderCesium = () => {
  chaos.viewer.render();
};

/**
 * 调整Three相机
 */
const renderThreeCamera = () => {
  // register Three.js scene with Cesium
  threeObj.camera.fov = chaos.cesium.Math.toDegrees(
    chaos.viewer.camera.frustum.fovy
  ); // ThreeJS FOV is vertical
  threeObj.camera.updateProjectionMatrix();

  // Configure Three.js meshes to stand against globe center position up direction
  for (const id in threeDobjects) {
    const minWGS84 = threeDobjects[id].minWGS84;
    const maxWGS84 = threeDobjects[id].maxWGS84;
    // convert lat/long center position to Cartesian3
    const center = chaos.cesium.Cartesian3.fromDegrees(
      (minWGS84[0] + maxWGS84[0]) / 2,
      (minWGS84[1] + maxWGS84[1]) / 2
    );

    // get forward direction for orienting model
    const centerHigh = chaos.cesium.Cartesian3.fromDegrees(
      (minWGS84[0] + maxWGS84[0]) / 2,
      (minWGS84[1] + maxWGS84[1]) / 2,
      1
    );

    // use direction from bottom left to top left as up-vector
    const bottomLeft = cartToVec(
      chaos.cesium.Cartesian3.fromDegrees(minWGS84[0], minWGS84[1])
    );
    const topLeft = cartToVec(
      chaos.cesium.Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1])
    );
    const latDir = new THREE.Vector3()
      .subVectors(bottomLeft, topLeft)
      .normalize();

    // configure entity position and orientation
    threeDobjects[id].threeMesh.position.copy(center);
    threeDobjects[id].threeMesh.lookAt(
      centerHigh.x,
      centerHigh.y,
      centerHigh.z
    );
    threeDobjects[id].threeMesh.up.copy(latDir);
  }

  // Clone Cesium Camera projection position so the
  // Three.js Object will appear to be at the same place as above the Cesium Globe
  threeObj.camera.matrixAutoUpdate = false;
  const cvm = chaos.viewer.camera.viewMatrix;
  const civm = chaos.viewer.camera.inverseViewMatrix;
  threeObj.camera.lookAt(0, 0, 0);

  threeObj.camera.matrixWorld.set(
    civm[0],
    civm[4],
    civm[8],
    civm[12],
    civm[1],
    civm[5],
    civm[9],
    civm[13],
    civm[2],
    civm[6],
    civm[10],
    civm[14],
    civm[3],
    civm[7],
    civm[11],
    civm[15]
  );
  threeObj.camera.matrixWorldInverse.set(
    cvm[0],
    cvm[4],
    cvm[8],
    cvm[12],
    cvm[1],
    cvm[5],
    cvm[9],
    cvm[13],
    cvm[2],
    cvm[6],
    cvm[10],
    cvm[14],
    cvm[3],
    cvm[7],
    cvm[11],
    cvm[15]
  );
  const width = threeContainer.clientWidth;
  const height = threeContainer.clientHeight;
  const aspect = width / height;
  threeObj.camera.aspect = aspect;
  threeObj.camera.updateProjectionMatrix();
  threeObj.renderer.setSize(width, height);
  threeObj.renderer.clear();
  threeObj.renderer.render(threeObj.scene, threeObj.camera);
};

/**
 * 循环渲染
 */
const loop = () => {
  requestAnimationFrame(loop);
  renderCesium();
  renderThreeCamera();
};

/**
 * 转threejs向量
 */
const cartToVec = cart => {
  return new THREE.Vector3(cart.x, cart.y, cart.z);
};

/**
 * 创建Cesium实体范围
 */
const createCesiumRange = () => {
  const center = chaos.cesium.Cartesian3.fromDegrees(
    (minWGS84[0] + maxWGS84[0]) / 2,
    (minWGS84[1] + maxWGS84[1]) / 2 - 1,
    200000
  );
  chaos.viewer.camera.flyTo({
    destination: center,
    orientation: {
      heading: chaos.cesium.Math.toRadians(0),
      pitch: chaos.cesium.Math.toRadians(-60),
      roll: chaos.cesium.Math.toRadians(0)
    },
    duration: 1
  });

  // Cesium entity
  const entity = {
    name: "Polygon",
    polygon: {
      hierarchy: chaos.cesium.Cartesian3.fromDegreesArray([
        minWGS84[0],
        minWGS84[1],
        maxWGS84[0],
        minWGS84[1],
        maxWGS84[0],
        maxWGS84[1],
        minWGS84[0],
        maxWGS84[1]
      ]),
      material: chaos.cesium.Color.RED.withAlpha(0.2)
    }
  };
  chaos.viewer.entities.add(entity);
};

/**
 * 创建Threejs模型对象
 */
const createThreeObjs = () => {
  const scaleSize = 15000;
  const up = 15000.0;

  // Three.js Objects
  const doubleSideMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
  });
  const boxGeometry = new THREE.BoxGeometry(1, 2, 4);

  const boxMesh = new THREE.Mesh(boxGeometry, doubleSideMaterial);
  // 放大物体，不然可能在地球表面看不见
  boxMesh.scale.set(scaleSize, scaleSize, scaleSize);
  // 在three的坐标系空间里，先向Z轴平移模型，然后绕X轴向上翻转90度，物体就面向Y轴了，对应Cesiumn的Z轴
  boxMesh.position.z += up; //  translate "up" in Three.js space so the "bottom" of the mesh is the handle
  boxMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system

  // 红线是X轴，绿线是Y轴，蓝线是Z轴
  const axesHelper = new THREE.AxesHelper(2000000000000);
  // 将模型放入同一个组，然后对改组做一个整体的位置变换
  const meshYup = new THREE.Group();
  meshYup.add(boxMesh);
  meshYup.add(axesHelper);
  threeObj.scene.add(meshYup); // don’t forget to add it to the Three.js scene manually

  // Assign Three.js object mesh to our object array
  const objBox = {
    threeMesh: meshYup,
    minWGS84: minWGS84,
    maxWGS84: maxWGS84
  };
  threeDobjects.push(objBox);

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMesh = new THREE.Mesh(sphereGeometry, doubleSideMaterial);
  sphereMesh.scale.set(scaleSize, scaleSize, scaleSize);
  sphereMesh.position.z += up * 5;

  const sphereYup = new THREE.Group();
  sphereYup.add(sphereMesh);
  threeObj.scene.add(sphereYup); // don’t forget to add it to the Three.js scene manually

  // Assign Three.js object mesh to our object array
  const objSphere = {
    threeMesh: sphereYup,
    minWGS84: minWGS84,
    maxWGS84: maxWGS84
  };
  threeDobjects.push(objSphere);
};

export { startThreeJs, cartToVec, threeObj, THREE };
