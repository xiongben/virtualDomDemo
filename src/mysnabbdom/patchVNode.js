import createElement from "./createElement";
import updateChildren from "./updateChildren";


export default function patchVnode(newVnode, oldVode){
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
            updateChildren(oldVode.elm, oldVode.children, newVnode.children);
        }else {
            //旧的节点没有children，新的节点有children
            oldVode.elm.innerHTML = "";  //清空旧的节点的内容
            for (let i = 0 ; i < newVnode.children.length; i++){
                let dom = createElement(newVnode.children[i]);
                oldVode.elm.appendChild(dom);
            }
        }
    }
}
