// 导入模型加载
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * 专门加载模型文件的
 * @param {*} path 模型的路径
 * @param {*} successFn 模型加载成功的回调函数
 */
export function loadManager(path, successFn) {
    // 实例化模型加载器
    const gltfLoader = new GLTFLoader()
    // 加载模型资源 load(加载的模型资源路径, 成功的结果、加载进度、失败的结果)
    gltfLoader.load(path, gltf => successFn(gltf), (precess) => {
        console.log('precess'), precess
    }, error => {
        throw new Error(error)
    });
}
