
# 统一资源前端构架说明

## WEB技术栈
> 基于vue2+vuex+axios+webpack+gulp的统一资源项目


## 目录结构说明

------

```
├── omp-manage-html/       （项目名字）
├    ├── checkDir/           (检查文件目录)
├    ├
├    ├── devPkg/             （项目开发目录，存放vue、vuex开发文件的地方）
├    ├    ├── components/     （具体的业务模块的目录)
├    ├    ├    ├── common/（通用页面）
├    ├    ├    ├── dashboard/  （首页)
├    ├    ├    ├── template/   （通用模板组件)
├    ├    ├── images/     （图片存放目录)
├    ├    ├── styles/     （样式文件存放目录)
├    ├    ├── vuex/        （业务逻辑的目录）
├    ├    ├    ├── ...      （文件目录结构大致上对应componets目录结构）
├    ├    └── main.js （入口js文件，基础vue）
├    ├── mokeData/ （moke数据文件目录）
├    ├── static/ （静态资源文件目录）
├    ├    ├── css （引用css文件）
├    ├    ├── less （所有less文件）
├    ├    ├── images （所有图片文件）
├    ├    ├── all.min.js （项目）
├    ├    ├── index.html （项目首页主入口）
├    ├── .gitignore （git提交忽略文件）
├    ├── gulpfile.js （gulp文件）
├    ├── package.json （项目依赖文件配置）
├    ├── webpack.config.js （）
├    ├── index.html （项目首页主入口）


```
## 项目结构说明：

1、整个项目属于单页面开发，所有路由都在入口文件（main.js）中进行配置；
2、所有图片文件和编译后的文件都在static文件夹；
3、所有vuex状态管理资源文件都在vuex文件夹，按功能进行文件管理，所有功能文件放在modules文件夹下，在index.js中进行配置；
4、所有页面功能开发按功能模块包管理方式并以.vue文件存在；
5、通用的页面组件都在templates文件夹；

## 项目环境安装与运行

1. 搭建环境：
 下载package.json中记录的依赖包
 `npm install`
2. 运行项目：
 `npm run start`

如果运行时报错切无法运行，自己对照控制台检查是否所有的npm包都下载OK了
