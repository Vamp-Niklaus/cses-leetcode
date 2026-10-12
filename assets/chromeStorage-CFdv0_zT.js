function e(a){return a==="sync"?chrome.storage.sync:chrome.storage.local}async function s(a,t="local"){return(await e(t).get(a))[a]}async function c(a,t,o="local"){await e(o).set({[a]:t})}async function n(a,t="local"){await e(t).remove(a)}export{c as a,n as b,s};
//# sourceMappingURL=chromeStorage-CFdv0_zT.js.map
