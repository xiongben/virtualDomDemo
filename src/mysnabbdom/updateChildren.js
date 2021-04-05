
import patchVNode from "./patchVNode";
import createElement from "./createElement";

function checkSameVnode(a, b) {
   return a.sel == b.sel && a.key == b.key;
}



//核心方法



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
    let keyMap = {};

    while (oldStartIdx  <= oldEndIdx && newStartIdx <= newEndIdx){
        if(oldStartVnode == null || oldCh[oldStartIdx] == undefined){
            oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
            newStartVnode = newCh[++newStartIdx];
        } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
            newEndVnode = newCh[--newEndIdx];
        } else if(checkSameVnode(oldStartVnode,newStartVnode)){
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
        } else {
            console.log("5,都没有命中")
            if(!keyMap) {
                keyMap = {};
                for(let i = oldStartIdx; i <= oldEndIdx; i++ ){
                    const key = oldCh[i].key;
                    if(key != undefined) {
                        keyMap[key] = i;
                    }
                }
            }
            //寻找当前newStartIdx这项在keymap中的映射的位置序号
            const idxInOld = keyMap[newStartVnode.key];
            if(idxInOld == undefined){
               parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
            } else {
                //不是新的节点，需要移动
               const elmToMove = oldCh[idxInOld];
               patchVNode(newStartVnode, elmToMove);
               oldCh[idxInOld] = undefined;
               parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
            }

            newStartVnode = newCh[++newStartIdx];
        }
    }

    //检查有没有循环过剩的
    if(newStartIdx <= newEndIdx) {
        console.log("新节点还有剩余节点没有处理");

        for(let i = newStartIdx; i <= newEndIdx; i++){
            parentElm.insertBefore( createElement(newCh[i]),oldCh[oldStartIdx])
        }
    } else if (oldStartIdx <= oldEndIdx){
        console.log("旧节点还有剩余节点没有处理")
        for(let i = oldStartIdx; i <= oldEndIdx; i++){
            if(oldCh[i]){
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    }
}
