
import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"

const myVnode1 = h('h1',{}, 'hello xiongben');

const container = document.getElementById('app');

patch(container, myVnode1);
