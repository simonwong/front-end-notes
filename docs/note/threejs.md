## 程序基本脚手架

![](https://discoverthreejs.com/images/first-steps/rendered_scene_canvas.svg)

### 场景

**场景是我们能看到的一切的载体**，场景 `scene` 定义了一个名为 **World Space（世界空间）**

![](https://discoverthreejs.com/images/first-steps/coordinate_system_simple.svg)

场景的中心是点(0,0,0)，也称为坐标系的**原点**。



![](https://discoverthreejs.com/images/first-steps/scene_graph.svg)

当我们将对象添加到场景中时，它们会被放入 [**场景图中**](http://what-when-how.com/advanced-methods-in-computer-graphics/scene-graphs-advanced-methods-in-computer-graphics-part-1/)，这是一个树形结构，场景位于顶部。



### 相机

相机是指向小宇宙的望远镜。

投影类型**透视投影**（[`PerspectiveCamera`](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)），它旨在匹配我们的眼睛看待世界的方式。

PerspectiveCamera 有四个参数

1. `fov`，或**视野**：相机的视野有多宽，以度为单位。
2. `aspect`，或**纵横比**：场景的宽度与高度的比率。
3. `near`, 或**近剪裁平面**：任何比这更靠近相机的东西都是不可见的。
4. `far`，或**远剪裁平面**：任何比这更远离相机的东西都是不可见的。

四个参数组成视锥体



投影类型**正交投影**（ [`OrthographicCamera`](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)），对于创建 2D 场景或覆盖 3D 场景的用户界面很有用。



### 渲染器

渲染器通过摄像机观察到的内容*快速的*渲染到 canvas 上。使用 [`WebGLRenderer`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) API，



**场景、相机和渲染器一起为我们提供了 three.js 应用程序的基本脚手架**。但是他们都是看不到的。



### 可见对象 Mesh

![](https://discoverthreejs.com/images/first-steps/mesh_details.svg)

**[网格](https://threejs.org/docs/#api/en/objects/Mesh)是 3D 计算机图形学中最常见的可见对象**，用于显示各种 3D 对象——猫、狗、人类、树木、建筑物、花卉和山脉都可以使用网格来表示

`Mesh`构造函数有两个参数：**几何**和**材质**。在创建网格之前，我们需要创建这两个。

**几何体定义了网格的形状**。**材质定义了网格表面的外观**。





## 光照

![](https://discoverthreejs.com/images/first-steps/directional_light.svg)

[`DirectionalLight`](https://threejs.org/docs/#api/lights/DirectionalLight)设计的目的是模仿遥远的光源，例如太阳



