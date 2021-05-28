// <UserScript>
// 

window.data = {};
JSON.parse(document.body.innerText).forEach(t => window.data[t.nickname] = Team(t));

import * from './teams.mjs'
