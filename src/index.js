
import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"

// const myVnode1 = h('h1',{}, 'hello xiongben');

const btn = document.getElementById('btn');


// const myVnode1 = h('ul',{}, [
//     h('li',{},"A"),
//     h('li',{},"B"),
//     h('li',{},[
//         h('div',{},[
//             h('ol',{},"aa"),
//             h('ol',{},"bb"),
//             h('ol',{},"cc"),
//         ])
//     ]),
//     h('li',{},"D"),
// ]);

const myVnode1 = h('section',{}, "oldtextjjjjjjjj");

const container = document.getElementById('app');

patch(container, myVnode1);

const myVnode2 = h('section',{}, [
    h('p',{},"A2"),
    h('p',{},"B"),
    h('p',{},"D"),
]);

btn.onclick = function (){
    patch(myVnode1, myVnode2);
}



