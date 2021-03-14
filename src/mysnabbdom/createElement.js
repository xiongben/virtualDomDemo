
//将vnode创建为dom，插入到pivot这个元素之前

export default function (vnode, pivot) {
    console.log(vnode, pivot)
   let domNode = document.createElement(vnode.sel);
   //有子节点或者文本？？？
    if(vnode.text != "" && (vnode.children == undefined || vnode.children.length == 0)){
        domNode.innerText = vnode.text;
        pivot.parentNode.insertBefore(domNode,pivot);
    }
}
