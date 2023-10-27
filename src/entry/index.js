import * as THREE from 'three'
import { loadManager } from "../model/loadManager"
import { Car } from "../model/Car"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls
const app = document.querySelector(".app")

// 初始化
function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, app.clientWidth / app.clientHeight, 0.1, 1000)
    camera.position.z = 5
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.shadowMap.enabled = true
    renderer.setSize(app.clientWidth, app.clientHeight)
    app.appendChild(renderer.domElement)
    // 加载模型
    loadManager('Lamborghini.glb', (gltf) => {
        const model = gltf.scene
        const car = new Car(model, scene)
        car.init()
    })
}

// 轨道控制器
function createControls() {
    controls = new OrbitControls(camera, renderer.domElement)
}

// 循环渲染
function renderLoop() {
    renderer.render(scene, camera)
    controls.update()
    requestAnimationFrame(renderLoop)
}

// 场景适配
function resizeRender() {
    window.addEventListener('resize', () => {
        renderer.setSize(app.clientWidth, app.clientHeight)
        camera.aspect = app.clientWidth / app.clientHeight
        camera.updateProjectionMatrix()
    })
}

// 坐标轴
function createHelper() {
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)
}

// 灯光
function createLight() {
    const light = new THREE.AmbientLight(0x404040)
    scene.add(light)
    const direction = new THREE.DirectionalLight(0xffffff, 10)
    direction.position.set(0, 5, 0)
    scene.add(direction)
    // const helper = new THREE.DirectionalLightHelper(direction, 1)
    // scene.add(helper)
}

init()
createControls()
renderLoop()
resizeRender()
createHelper()
createLight()