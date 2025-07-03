import template from "./template.html"
import './style.scss';
const app = document.querySelector("#app");
const element = document.createElement("div");
element.className="about";
element.innerHTML=template;
app.appendChild(element);