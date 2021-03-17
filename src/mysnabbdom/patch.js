
import vnode from "./vnode";
import createElement from "./createElement";

export default function (oldVode, newVnode){
   //判断传入的第一个参数，是dom节点还是虚拟节点
    if(oldVode.sel == '' || oldVode.sel == undefined){
        oldVode = vnode(oldVode.tagName.toLocaleLowerCase(),{},[],undefined, oldVode);
    }
    //判断oldVnode and newVnode 是不是同一节点
    if(oldVode.key == newVnode.key && oldVode.sel == newVnode.sel){
        console.log("same node");
        if(oldVode === newVnode) return ;
        if(newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)){
            console.log("new vnode has text attr");
            if(newVnode.text != oldVode.text){
                //新的节点的text和旧的节点的text不同
                oldVode.elm.innerText = newVnode.text;
            }
        }else{
            //newVnode没有text属性
            if(oldVode.children != undefined && oldVode.children.length > 0){
                //新旧节点都有children

            }else {
                //旧的节点没有children，新的节点有children
                oldVode.elm.innerHTML = "";  //清空旧的节点的内容
                for (let i = 0 ; i < newVnode.children.length; i++){
                    let dom = createElement(newVnode.children[i]);
                    oldVode.elm.appendChild(dom);
                }
            }
        }
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
