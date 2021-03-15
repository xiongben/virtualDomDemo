
import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"

// const myVnode1 = h('h1',{}, 'hello xiongben');

const myVnode1 = h('ul',{}, [
    h('li',{},"A"),
    h('li',{},"B"),
    h('li',{},"C"),
    h('li',{},"D"),
]);

const container = document.getElementById('app');


patch(container, myVnode1);
