
import vnode from "./vnode";
import createElement from "./createElement";

export default function (oldVode, newVnode){
   //判断传入的第一个参数，是dom节点还是虚拟节点
    if(oldVode.sel == '' || oldVode.sel == undefined){
        oldVode = vnode(oldVode.tagName.toLocaleLowerCase(),{},[],undefined, oldVode);
    }
    //判断oldVnode and newVnode 是不是同一节点
    if((oldVode.key)&&(oldVode.key == newVnode.key && oldVode.sel == newVnode.sel)){
        console.log("same node");
    }else{
        console.log("different node,insert new dom,delete old dom");
        console.log(oldVode, newVnode)
        createElement(newVnode, oldVode.elm);
    }
}
