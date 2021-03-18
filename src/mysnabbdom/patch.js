
import vnode from "./vnode";
import createElement from "./createElement";
import patchVnode from "./patchVNode";

export default function (oldVode, newVnode){
   //判断传入的第一个参数，是dom节点还是虚拟节点
    if(oldVode.sel == '' || oldVode.sel == undefined){
        oldVode = vnode(oldVode.tagName.toLocaleLowerCase(),{},[],undefined, oldVode);
    }
    //判断oldVnode and newVnode 是不是同一节点
    if(oldVode.key == newVnode.key && oldVode.sel == newVnode.sel){
        console.log("same node");
        patchVnode(newVnode, oldVode);
    }else{
        console.log("different node,insert new dom,delete old dom");
        console.log(oldVode, newVnode)
        let newVnodeDomElm = createElement(newVnode);
        if(oldVode.elm.parentNode && newVnodeDomElm){
            oldVode.elm.parentNode.insertBefore(newVnodeDomElm, oldVode.elm);
        }
        //删除旧的节点

        oldVode.elm.parentNode.removeChild(oldVode.elm);
    }
}
