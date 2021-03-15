
import vnode from "./vnode";

// 调用的形态，目前为以下3种
// h('div',{},'文字')
// h('div',{},[])
// h('div',{},h())

export default function (sel, data, c){
   //检查参数的个数
    if(arguments.length != 3){
        throw new Error("param data error!")
    }
    if(typeof c == 'string' || typeof c == 'number'){
        return vnode(sel, data, undefined, c, undefined);
    }else if(Array.isArray(c)){
        let children = [];
        for(let i = 0; i < c.length; i++){
            if(!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))){
                throw new Error("数组中有参数不符合h函数参数条件");
            }
            children.push(c[i]);
        }
        return vnode(sel,data,children,undefined,undefined);
    }else if(typeof c == 'object' && c.hasOwnProperty('sel')){
        let children = [c];
        return vnode(sel,data,children,undefined,undefined);
    }else{
        throw new Error("param data error!");
    }

}
