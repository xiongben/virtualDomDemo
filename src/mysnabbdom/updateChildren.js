
import patchVNode from "./patchVNode";
import createElement from "./createElement";

function checkSameVnode(a, b) {
   return a.sel == b.sel && a.key == b.key;
}


export default function updateChildren(parentElm, oldCh, newCh){
    console.log(oldCh, newCh);
    //旧前
    let oldStartIdx = 0;
    //新前
    let newStartIdx = 0;
    //旧后
    let oldEndIdx = oldCh.length - 1;
    //新后
    let newEndIdx = newCh.length - 1;

    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];

    while (oldStartIdx  <= oldEndIdx && newStartIdx <= newEndIdx){
        if(checkSameVnode(oldStartVnode,newStartVnode)){
            //新前与旧前
            console.log("1,新前与旧前")
            patchVNode(newStartVnode, oldStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } else if (checkSameVnode(oldEndVnode, newEndVnode)){
            //新后与旧后
            console.log("2,新后与旧后")
            patchVNode(newEndVnode, oldEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            console.log("3,新后与旧前")
            //当新后与旧前命中的时候，此时要移动节点，移动新前指向的节点到老节点的旧后的后面
            patchVNode(newEndVnode, oldStartVnode);
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextElementSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            console.log("4,新前与旧后")
            //当新后与旧前命中的时候，此时要移动节点，移动新前指向的节点到老节点的旧后的后面
            patchVNode(newStartVnode, oldEndVnode);
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
    }
}
