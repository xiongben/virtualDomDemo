
import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"

// const myVnode1 = h('h1',{}, 'hello xiongben');

const btn = document.getElementById('btn');


const myVnode1 = h('ul',{}, [
    h('li',{key: 'A'},"A"),
    h('li',{key: 'B'},"B"),
    h('li',{key: 'C'},"C"),
]);

// const myVnode1 = h('section',{}, "oldtextjjjjjjjj");

const container = document.getElementById('app');

patch(container, myVnode1);

const myVnode2 = h('ul',{}, [
    h('li',{key: 'A'},"A"),
    h('li',{key: 'B'},"B"),
    h('li',{key: 'D'},"D"),
    h('li',{key: 'C'},"C"),
]);


btn.onclick = function (){
    patch(myVnode1, myVnode2);
}



