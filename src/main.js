//core.js引入
import "core-js"//全局引入
import "core-js/es/promise"//按需引入

//引入各个组件
import "./components/header";
import "./components/home";
import "./components/about";
import "./components/introduce"
import "./components/knowledge"
import "./components/footer"

//引入全局样式
import "./assets/scss/main.scss"

//HRM接受代码,生产模式下可以删除
if (module.hot) {
    module.hot.accept();
}