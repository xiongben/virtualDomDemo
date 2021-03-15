
//将vnode创建为dom，插入到pivot这个元素之前

export default function createElement(vnode) {

   let domNode = document.createElement(vnode.sel);
   //有子节点或者文本？？？
    if(vnode.text != "" && (vnode.children == undefined || vnode.children.length == 0)){
        domNode.innerText = vnode.text;

    }else if(Array.isArray(vnode.children) && vnode.children.length > 0){
        for (let i = 0; i < vnode.children.length; i++){
            let ch = vnode.children[i];
            let chDom = createElement(ch);
            domNode.appendChild(chDom);
        }
    }
    vnode.elm = domNode;
    return vnode.elm;
}
