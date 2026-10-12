const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=[chrome.runtime.getURL("assets/monacoCore-BDGHH_Kx.js"),chrome.runtime.getURL("assets/workspaceStore-BntamI4W.js"),chrome.runtime.getURL("assets/chromeStorage-CFdv0_zT.js"),chrome.runtime.getURL("assets/monacoCore-Ck81uxpO.css")])))=>i.map(i=>d[i]);
import{d as N,A as b,q as A,P as xe,u as t,h as E,_ as ye,S as K,T as we,c as j,a as S,E as Ne,b as Se,N as Ee,p as de,e as me,f as J,g as Te,i as Ce,j as ke,w as Re,R as Le}from"./workspaceStore-BntamI4W.js";import{s as Ae,b as _e,a as Pe}from"./chromeStorage-CFdv0_zT.js";function Ie({containerRef:e,onCommit:n}){const[r,s]=N(null),a=b(null),o=b(null),i=b(n);i.current=n;const l=A(c=>{if(!e.current)return;const h=e.current.getBoundingClientRect(),g=c.clientX-h.left,p=xe/h.width*100,v=g/h.width*100,w=Math.min(100-p,Math.max(p,v));a.current=w,o.current===null&&(o.current=requestAnimationFrame(()=>{o.current=null,s(a.current)}))},[e]),d=A(()=>{document.removeEventListener("pointermove",l),document.removeEventListener("pointerup",d),document.body.style.cursor="",document.body.style.userSelect="",o.current!==null&&(cancelAnimationFrame(o.current),o.current=null),a.current!==null&&i.current(a.current),a.current=null,s(null)},[l]),u=A(c=>{c.preventDefault(),document.addEventListener("pointermove",l),document.addEventListener("pointerup",d),document.body.style.cursor="col-resize",document.body.style.userSelect="none"},[l,d]);return{dragPercent:r,startDragging:u}}function Be({left:e,right:n,splitPercent:r,onSplitChange:s}){const a=b(null),{dragPercent:o,startDragging:i}=Ie({containerRef:a,onCommit:s}),l=o??r;return t("div",{ref:a,className:"flex h-full w-full min-w-0 bg-bg-base",children:[t("div",{className:"h-full min-w-0 overflow-hidden",style:{width:`${l}%`},children:e}),t("div",{role:"separator","aria-orientation":"vertical","aria-label":"Resize panels",tabIndex:0,onPointerDown:d=>i(d),className:"group relative flex w-1 shrink-0 cursor-col-resize items-stretch justify-center",children:[t("div",{className:"w-px bg-border transition-all duration-100 group-hover:w-full group-hover:bg-accent"}),t("div",{className:"absolute inset-y-0 -left-1 -right-1"})]}),t("div",{className:"h-full min-w-0 flex-1 overflow-hidden",style:{width:`${100-l}%`},children:n})]})}function V({node:e,className:n=""}){const r=b(null);return E(()=>{const s=r.current;if(!(!s||!e))return s.appendChild(e),()=>{e.parentElement===s&&s.removeChild(e)}},[e]),t("div",{ref:r,className:n})}function fe({tabs:e,activeId:n,onChange:r,className:s=""}){const a=b(null),[o,i]=N({left:0,width:0});return ye(()=>{const l=a.current;if(!l)return;const d=()=>{const c=l.querySelector(`[data-tab-id="${n}"]`);if(!c)return;const h={left:c.offsetLeft,width:c.offsetWidth};i(g=>g.left===h.left&&g.width===h.width?g:h)};d();const u=new ResizeObserver(d);return u.observe(l),()=>u.disconnect()},[n,e.map(l=>l.id).join("|")]),t("div",{ref:a,role:"tablist",className:`relative flex items-center gap-5 ${s}`,children:[e.map(l=>{const d=l.id===n;return t("button",{"data-tab-id":l.id,onClick:()=>r(l.id),"aria-selected":d,role:"tab",className:`px-0.5 py-2.5 text-[13px] font-medium transition-colors duration-DEFAULT ${d?"text-fg":"text-fg-muted hover:text-fg"}`,children:l.label},l.id)}),t("span",{"aria-hidden":"true",className:"absolute bottom-0 h-[2px] rounded-full bg-accent transition-all duration-150 ease-out",style:{left:`${o.left}px`,width:`${o.width}px`}})]})}function Me({problemNode:e,topicLabel:n,topicNode:r,submissionsNode:s}){const a=[{id:"problem",label:"Description"},...r?[{id:"topic",label:n}]:[],...s?[{id:"submissions",label:"Submissions"}]:[]],[o,i]=N(a[0]?.id??"problem");return t("div",{className:"problem-pane flex h-full flex-col",children:[t("div",{className:"sticky top-0 z-10 shrink-0 border-b border-border-subtle bg-bg-raised px-5",children:t(fe,{tabs:a,activeId:o,onChange:i})}),t("div",{className:"min-h-0 flex-1 overflow-auto px-6 py-5",children:[o==="problem"&&t(V,{node:e}),o==="topic"&&t(V,{node:r}),o==="submissions"&&t(SubmissionsPane,{fallbackNode:s})]})]})}function De({meta:e}){return t("div",{className:"flex h-11 shrink-0 items-center justify-between gap-4 border-b border-border-subtle bg-bg-raised px-4",children:[t("div",{className:"flex min-w-0 items-baseline gap-2",children:[e.courseLabel&&e.courseHref&&t(K,{children:[t("a",{href:e.courseHref,className:"shrink-0 text-[12px] text-fg-muted transition-colors duration-100 hover:text-fg",children:e.courseLabel}),t("span",{"aria-hidden":"true",className:"text-[12px] text-fg-subtle",children:"/"})]}),t("h1",{className:"truncate text-[14px] font-semibold text-fg",children:e.title})]}),t("nav",{className:"flex shrink-0 items-center gap-1",children:e.navLinks.map(n=>t("a",{href:n.href,"aria-current":n.current?"page":void 0,className:`rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors duration-100 ${n.current?"bg-bg-overlay text-fg":"text-fg-muted hover:bg-bg-overlay hover:text-fg"}`,children:n.label},n.href))})]})}function Oe({left:e,right:n}){return t("div",{className:"sticky top-0 z-10 flex items-center justify-between border-b border-border-subtle bg-bg-raised px-3",style:{height:`${we}px`},children:[t("div",{className:"flex items-center gap-2",children:e}),t("div",{className:"flex items-center gap-2",children:n})]})}function He({value:e,options:n,onChange:r,ariaLabel:s,className:a=""}){function o(i){r(i.currentTarget.value)}return t("select",{"aria-label":s,value:e,onChange:o,className:`h-8 cursor-pointer rounded-md border border-transparent bg-bg-overlay px-2.5 text-[13px] text-fg outline-none transition-colors duration-DEFAULT hover:border-border focus:border-accent ${a}`,children:n.map(i=>t("option",{value:i.value,children:i.label},i.value))})}function H({children:e,label:n,active:r=!1,className:s="",...a}){return t("button",{"aria-label":n,title:n,className:`inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-all duration-100 hover:bg-bg-overlay hover:text-fg active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${r?"bg-bg-overlay text-fg":""} ${s}`,...a,children:e})}const Fe={primary:"bg-accent text-white hover:bg-accent-hover hover:shadow-[0_2px_10px_rgb(var(--color-accent)/0.35)]",success:"btn-submit bg-success text-white hover:shadow-[0_2px_10px_rgb(var(--color-success)/0.35)]",ghost:"text-fg-muted hover:bg-bg-overlay hover:text-fg",subtle:"bg-bg-overlay text-fg hover:bg-border"};function te({variant:e="subtle",className:n="",children:r,...s}){return t("button",{className:`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-all duration-100 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 ${Fe[e]} ${n}`,...s,children:r})}const C={fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};function Q({className:e=""}){return t("svg",{viewBox:"0 0 16 16",className:e,...C,children:t("path",{d:"M4 3.2v9.6a.6.6 0 0 0 .93.5l7.4-4.8a.6.6 0 0 0 0-1l-7.4-4.8A.6.6 0 0 0 4 3.2Z"})})}function je({className:e=""}){return t("svg",{viewBox:"0 0 16 16",className:e,...C,children:t("path",{d:"m3 8.5 3 3 7-7"})})}function $e({className:e=""}){return t("svg",{viewBox:"0 0 16 16",className:e,...C,children:[t("circle",{cx:"8",cy:"8",r:"3"}),t("path",{d:"M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.7 3.3l-1 1M4.3 11.7l-1 1M12.7 12.7l-1-1M4.3 4.3l-1-1"})]})}function qe({className:e=""}){return t("svg",{viewBox:"0 0 16 16",className:e,...C,children:t("path",{d:"M13.8 9.5A6 6 0 1 1 6.5 2.2a5 5 0 0 0 7.3 7.3Z"})})}function ze({className:e=""}){return t("svg",{viewBox:"0 0 16 16",className:e,...C,children:t("path",{d:"M3 4.5h10M6.5 4.5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5M4.5 4.5v9a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-9"})})}function Ue({className:e=""}){return t("svg",{viewBox:"0 0 16 16",className:e,...C,children:[t("rect",{x:"6",y:"6",width:"8",height:"8",rx:"1.5"}),t("path",{d:"M10 6V3.5A1.5 1.5 0 0 0 8.5 2h-6A1.5 1.5 0 0 0 1 3.5v6A1.5 1.5 0 0 0 2.5 11H6"})]})}function Ve({className:e=""}){return t("svg",{viewBox:"0 0 16 16",className:e,...C,children:t("path",{d:"M8 3v10M3 8h10"})})}const he=j(e=>({status:"idle",setStatus:n=>e(r=>r.status===n?r:{status:n})})),We={idle:"",saving:"Saving…",saved:"Saved"};function Ge(){const e=he(n=>n.status);return e==="idle"?null:t("span",{className:"text-[12px] text-fg-subtle transition-opacity duration-DEFAULT",children:We[e]})}const F={cpp:{id:"cpp",label:"C++",monacoId:"cpp",fileExtension:"cpp"},python:{id:"python",label:"Python 3",monacoId:"python",fileExtension:"py"},java:{id:"java",label:"Java",monacoId:"java",fileExtension:"java"},c:{id:"c",label:"C",monacoId:"c",fileExtension:"c"}},Xe=Object.values(F),Ze="cpp";function Ye({language:e,onLanguageChange:n,fontSize:r,onFontSizeChange:s,onRun:a,onSubmit:o,isLoggedIn:i,running:l,submitting:d,intelliSenseOn:C_isOn=true,onToggleIntelliSense:C_oti}){const u=S(h=>h.theme),c=S(h=>h.toggleTheme);return t(Oe,{left:t(He,{ariaLabel:"Language",value:e,onChange:n,options:Xe.map(h=>({value:h.id,label:h.label}))}),right:t(K,{children:[t(Ge,{}),C_oti&&t("button",{"aria-label":"Toggle IntelliSense",onClick:C_oti,title:"Toggle code suggestions",className:"mr-1 flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors duration-150 "+(C_isOn?"bg-accent/15 text-accent hover:bg-accent/25":"bg-bg-overlay text-fg-muted hover:text-fg"),children:[t("span",{className:"text-[13px]",children:"⚡"}),C_isOn?"Hints ON":"Hints OFF"]}),t("div",{className:"flex items-center rounded-md bg-bg-overlay p-0.5",children:[t("button",{"aria-label":"Decrease font size",disabled:r<=Ne,onClick:()=>s(r-1),className:"h-6 w-6 rounded text-[13px] text-fg-muted transition-colors duration-100 hover:bg-border hover:text-fg disabled:opacity-40",children:"−"}),t("span",{className:"w-7 text-center text-[12px] tabular-nums text-fg-muted",children:r}),t("button",{"aria-label":"Increase font size",disabled:r>=Se,onClick:()=>s(r+1),className:"h-6 w-6 rounded text-[13px] text-fg-muted transition-colors duration-100 hover:bg-border hover:text-fg disabled:opacity-40",children:"+"})]}),t(H,{label:u==="dark"?"Switch to light theme":"Switch to dark theme",onClick:c,children:u==="dark"?t($e,{className:"h-4 w-4"}):t(qe,{className:"h-4 w-4"})}),t("div",{className:"mx-1 h-5 w-px bg-border-subtle"}),t(te,{variant:"subtle",onClick:a,disabled:l||d||!i,title:i?"Run (Ctrl + ')":"Log in to CSES to use Run",children:[t(Q,{className:"h-3.5 w-3.5"}),l?"Running…":"Run"]}),t(te,{variant:"success",onClick:o,disabled:d||l||!i,title:i?"Submit (Ctrl + ↵)":"Log in to CSES to submit",children:[t(je,{className:"h-3.5 w-3.5"}),d?"Submitting…":"Submit"]})]})})}const Ke="modulepreload",Je=function(e,n){return new URL(e,n).href},ne={},W=function(n,r,s){let a=Promise.resolve();if(r&&r.length>0){const i=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");a=Promise.allSettled(r.map(u=>{if(u=Je(u,s),u in ne)return;ne[u]=!0;const c=u.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(!!s)for(let v=i.length-1;v>=0;v--){const w=i[v];if(w.href===u&&(!c||w.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":Ke,c||(p.as="script"),p.crossOrigin="",p.href=u,d&&p.setAttribute("nonce",d),document.head.appendChild(p),c)return new Promise((v,w)=>{p.addEventListener("load",v),p.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return a.then(i=>{for(const l of i||[])l.status==="rejected"&&o(l.reason);return n().catch(o)})};function Qe(e){return new Worker(""+chrome.runtime.getURL("assets/editor.worker-wFIaQSWA.js"),{name:e?.name})}let re=!1;function et(){re||(re=!0,self.MonacoEnvironment={getWorker(){return new Qe}})}function se(e){return e==="dark"?"leetify-dark":"vs"}let oe=!1;function ae(e){oe||(oe=!0,e.editor.defineTheme("leetify-dark",{base:"vs-dark",inherit:!0,rules:[{token:"keyword",foreground:"569cd6",fontStyle:"bold"},{token:"keyword.directive",foreground:"c586c0"},{token:"keyword.directive.include",foreground:"c586c0"},{token:"type",foreground:"4ec9b0"},{token:"comment",foreground:"6a9955",fontStyle:"italic"},{token:"string",foreground:"ce9178"},{token:"number",foreground:"b5cea8"},{token:"delimiter",foreground:"d4d4d4"},{token:"delimiter.parenthesis",foreground:"ffd700"},{token:"delimiter.curly",foreground:"da70d6"},{token:"delimiter.square",foreground:"179fff"},{token:"identifier",foreground:"9cdcfe"}],colors:{"editor.background":"#1e1e1e","editor.foreground":"#e0e0e0","editor.lineHighlightBackground":"#282828","editorGutter.background":"#1e1e1e","editorLineNumber.foreground":"#6a6a6a","editorLineNumber.activeForeground":"#c6c6c6","editorIndentGuide.background1":"#333333","editorIndentGuide.activeBackground1":"#555555","editorCursor.foreground":"#007acc","editor.selectionBackground":"#264f78","editorWidget.background":"#202124","editorWidget.border":"#3c3c3c","scrollbarSlider.background":"#3e3e3e80","scrollbarSlider.hoverBackground":"#3e3e3ecc"}}))}function tt(e){const n=e.getRootNode();if(!(n instanceof ShadowRoot))return;document.head.querySelectorAll('link[rel="stylesheet"][href*="monacoCore"]').forEach(s=>n.appendChild(s))}const nt=Ee(rt);const DICT_SUGG={cpp:[{label:"main",kind:"snippet",badge:"⊞",text:"#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    return 0;\n}\n",delta:[6,5],doc:"C++ fast I/O main template"},{label:"fori",kind:"snippet",badge:"⊞",text:"for (int i = 0; i < n; i++) {\n    \n}",delta:[1,5],doc:"for (int i = 0; i < n; i++)"},{label:"forr",kind:"snippet",badge:"⊞",text:"for (int i = n - 1; i >= 0; i--) {\n    \n}",delta:[1,5],doc:"reverse for loop"},{label:"forauto",kind:"snippet",badge:"⊞",text:"for (const auto& x : v) {\n    \n}",delta:[1,5],doc:"range-based for loop"},{label:"while",kind:"snippet",badge:"⊞",text:"while (condition) {\n    \n}",delta:[0,7],doc:"while (condition)"},{label:"vector2d",kind:"snippet",badge:"⊞",text:"vector<vector<int>> dp(n, vector<int>(m, 0));",delta:[0,44],doc:"2D grid / DP matrix"},{label:"cin",kind:"snippet",badge:"⊞",text:"cin >> ",delta:[0,7],doc:"Fast stream input"},{label:"cout",kind:"snippet",badge:"⊞",text:"cout <<  << \"\\n\";",delta:[0,8],doc:"Stream output with newline"},{label:"fastio",kind:"snippet",badge:"⊞",text:"ios_base::sync_with_stdio(false);\ncin.tie(NULL);\n",delta:[1,15],doc:"Fast I/O boilerplate"},{label:"sort",kind:"snippet",badge:"⊞",text:"sort(v.begin(), v.end());",delta:[0,24],doc:"Ascending sort"},{label:"gcd",kind:"snippet",badge:"⊞",text:"long long gcd(long long a, long long b) { return b == 0 ? a : gcd(b, a % b); }",delta:[0,78],doc:"Euclidean GCD algorithm"},...["#include <iostream>","#include <vector>","#include <string>","#include <algorithm>","#include <map>","#include <unordered_map>","#include <set>","#include <unordered_set>","#include <queue>","#include <stack>","#include <cmath>","#include <numeric>","#include <climits>","#include <bits/stdc++.h>"].map(h=>({label:h,kind:"header",badge:"#",text:h+"\n",delta:[1,1],doc:"Header file"})),...["vector","string","pair","tuple","map","unordered_map","set","unordered_set","multiset","priority_queue","queue","stack","deque","bitset","long long","double","bool","char","auto"].map(t=>({label:t,kind:"class",badge:"◊",text:t+" ",delta:[0,t.length+1],doc:"Type/container"})),...["push_back","emplace_back","pop_back","size","empty","clear","begin","end","rbegin","rend","front","back","top","pop","push","insert","erase","find","count","lower_bound","upper_bound","reverse","min","max","abs","accumulate"].map(m=>({label:m,kind:"function",badge:"ƒ",text:m+"()",delta:[0,m.length+1],doc:"Method/function"}))],python:[{label:"def",kind:"snippet",badge:"⊞",text:"def solve():\n    pass",delta:[0,9],doc:"Function definition"},{label:"main",kind:"snippet",badge:"⊞",text:"if __name__ == \"__main__\":\n    solve()",delta:[1,11],doc:"Script entrypoint"},{label:"fori",kind:"snippet",badge:"⊞",text:"for i in range(n):\n    ",delta:[1,5],doc:"Range loop"},{label:"fore",kind:"snippet",badge:"⊞",text:"for i, x in enumerate(arr):\n    ",delta:[1,5],doc:"Enumerated loop"},{label:"listcomp",kind:"snippet",badge:"⊞",text:"[x for x in iterable if condition]",delta:[0,34],doc:"List comprehension"},{label:"matrix",kind:"snippet",badge:"⊞",text:"[[0] * m for _ in range(n)]",delta:[0,27],doc:"2D matrix initialization"},{label:"fastio",kind:"snippet",badge:"⊞",text:"import sys\ninput = sys.stdin.readline\n",delta:[2,1],doc:"Fast input"},{label:"Counter",kind:"snippet",badge:"⊞",text:"from collections import Counter\ncounts = Counter(arr)",delta:[1,21],doc:"Frequency counter"},{label:"defaultdict",kind:"snippet",badge:"⊞",text:"from collections import defaultdict\nd = defaultdict(int)",delta:[1,20],doc:"Default dictionary"},{label:"heapq",kind:"snippet",badge:"⊞",text:"import heapq\nheapq.heappush(h, val)\nx = heapq.heappop(h)",delta:[1,22],doc:"Heap operations"},{label:"bisect",kind:"snippet",badge:"⊞",text:"import bisect\nidx = bisect.bisect_left(arr, target)",delta:[1,36],doc:"Binary search"},...["print","len","range","enumerate","zip","map","filter","sorted","min","max","sum","abs","divmod","pow","round","all","any","reversed","list","dict","set","tuple","str","int","float","bool","input"].map(f=>({label:f,kind:"function",badge:"ƒ",text:f+"(",delta:[0,f.length+1],doc:"Builtin function"})),...["append","extend","pop","insert","remove","index","count","sort","reverse","copy","clear","keys","values","items","get","setdefault","update","add","discard","union","intersection","difference","split","join","strip","replace","startswith","endswith"].map(m=>({label:m,kind:"function",badge:"ƒ",text:m+"(",delta:[0,m.length+1],doc:"Method"}))],java:[{label:"psvm",kind:"snippet",badge:"⊞",text:"public static void main(String[] args) {\n    \n}",delta:[1,5],doc:"Main method"},{label:"sout",kind:"snippet",badge:"⊞",text:"System.out.println();",delta:[0,19],doc:"Print line"},{label:"scanner",kind:"snippet",badge:"⊞",text:"Scanner sc = new Scanner(System.in);",delta:[0,36],doc:"Scanner initialization"},{label:"fastio",kind:"snippet",badge:"⊞",text:"BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nStringTokenizer st = null;",delta:[1,25],doc:"Fast I/O"},{label:"fori",kind:"snippet",badge:"⊞",text:"for (int i = 0; i < n; i++) {\n    \n}",delta:[1,5],doc:"for loop"},{label:"foreach",kind:"snippet",badge:"⊞",text:"for (int x : arr) {\n    \n}",delta:[1,5],doc:"Enhanced for loop"},{label:"arrlist",kind:"snippet",badge:"⊞",text:"List<Integer> list = new ArrayList<>();",delta:[0,39],doc:"ArrayList"},{label:"hashmap",kind:"snippet",badge:"⊞",text:"Map<Integer, Integer> map = new HashMap<>();",delta:[0,44],doc:"HashMap"},{label:"sort",kind:"snippet",badge:"⊞",text:"Arrays.sort(arr);",delta:[0,17],doc:"Sort array"},...["Scanner","BufferedReader","InputStreamReader","StringTokenizer","ArrayList","HashMap","HashSet","TreeMap","TreeSet","LinkedList","PriorityQueue","Arrays","Collections","Math","String","StringBuilder"].map(c=>({label:c,kind:"class",badge:"◊",text:c+" ",delta:[0,c.length+1],doc:"Class"})),...["println","print","length","size","add","get","set","remove","containsKey","contains","isEmpty","clear","sort","binarySearch","max","min","abs","sqrt","charAt","substring","toCharArray","equals","indexOf","parseInt","poll","peek","offer"].map(m=>({label:m,kind:"function",badge:"ƒ",text:m+"()",delta:[0,m.length+1],doc:"Method"}))],c:[{label:"main",kind:"snippet",badge:"⊞",text:"int main(void) {\n    \n    return 0;\n}",delta:[1,5],doc:"C main function"},{label:"printf",kind:"snippet",badge:"⊞",text:"printf(\"%d\\n\", ans);",delta:[0,20],doc:"Formatted output"},{label:"scanf",kind:"snippet",badge:"⊞",text:"scanf(\"%d\", &n);",delta:[0,16],doc:"Formatted input"},{label:"fori",kind:"snippet",badge:"⊞",text:"for (int i = 0; i < n; i++) {\n    \n}",delta:[1,5],doc:"for loop"},{label:"malloc",kind:"snippet",badge:"⊞",text:"int* arr = (int*)malloc(n * sizeof(int));",delta:[0,41],doc:"Heap memory allocation"},{label:"free",kind:"snippet",badge:"⊞",text:"free(arr);",delta:[0,10],doc:"Free pointer"},{label:"swap",kind:"snippet",badge:"⊞",text:"void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }",delta:[0,59],doc:"Swap integers"},...["#include <stdio.h>","#include <stdlib.h>","#include <string.h>","#include <math.h>","#include <stdbool.h>","#include <limits.h>","#include <ctype.h>"].map(h=>({label:h,kind:"header",badge:"#",text:h+"\n",delta:[1,1],doc:"Header"})),...["printf","scanf","malloc","calloc","realloc","free","sizeof","strlen","strcpy","strncpy","strcmp","memset","memcpy","qsort","bsearch","abs","sqrt","pow","floor","ceil","getchar","putchar"].map(f=>({label:f,kind:"function",badge:"ƒ",text:f+"()",delta:[0,f.length+1],doc:"Function"}))]};let _globalSuggHandle=null;function attachLeetCodeSuggestions(ed,getLang){const widgetDom=document.createElement("div");widgetDom.className="leetify-suggest-widget";widgetDom.style.display="none";const listDom=document.createElement("div");listDom.className="leetify-suggest-list";widgetDom.appendChild(listDom);const docDom=document.createElement("div");docDom.className="leetify-suggest-doc";docDom.style.display="none";widgetDom.appendChild(docDom);let currentPos=null,activeIdx=0,currentList=[],currentPrefix="",isVisible=!1;const widget={getId:()=>"leetify.suggest.widget",getDomNode:()=>widgetDom,getPosition:()=>isVisible&&currentPos?{position:currentPos,preference:[2,1]}:null};ed.addContentWidget(widget);let suggestEnabled=(()=>{try{const h=localStorage.getItem("csescode:hints");if(h!==null)return h==="true"}catch(e){}return true})();function setSuggestEnabled(v){suggestEnabled=v;if(!v)hide()};function hide(){if(!isVisible)return;isVisible=!1;widgetDom.style.display="none";ed.layoutContentWidget(widget)}function apply(item){if(!item||!currentPos)return;const model=ed.getModel();if(!model)return;const startCol=Math.max(1,currentPos.column-currentPrefix.length);const range={startLineNumber:currentPos.lineNumber,startColumn:startCol,endLineNumber:currentPos.lineNumber,endColumn:currentPos.column};ed.executeEdits("suggest",[{range,text:item.text}]);if(item.delta){const newLine=currentPos.lineNumber+item.delta[0];const newCol=item.delta[0]===0?startCol+item.delta[1]:item.delta[1];ed.setPosition({lineNumber:newLine,column:newCol})}hide();ed.focus()}function render(){listDom.innerHTML="";if(currentList.length===0){hide();return}currentList.forEach((item,idx)=>{const row=document.createElement("div");row.className="leetify-suggest-item"+(idx===activeIdx?" active":"");const badge=document.createElement("span");badge.className="leetify-suggest-kind "+item.kind;badge.textContent=item.badge;row.appendChild(badge);const label=document.createElement("span");label.className="leetify-suggest-label";const mIdx=item.label.toLowerCase().indexOf(currentPrefix.toLowerCase());if(mIdx!==-1){label.appendChild(document.createTextNode(item.label.slice(0,mIdx)));const matchSpan=document.createElement("span");matchSpan.className="leetify-suggest-match";matchSpan.textContent=item.label.slice(mIdx,mIdx+currentPrefix.length);label.appendChild(matchSpan);label.appendChild(document.createTextNode(item.label.slice(mIdx+currentPrefix.length)))}else{label.textContent=item.label}row.appendChild(label);if(item.detail){const detail=document.createElement("span");detail.className="leetify-suggest-detail";detail.textContent=item.detail;row.appendChild(detail)}row.onmousedown=e=>{e.preventDefault();apply(item)};listDom.appendChild(row)});const activeItem=currentList[activeIdx];if(activeItem&&activeItem.doc){docDom.textContent=activeItem.doc;docDom.style.display="block"}else{docDom.style.display="none"}const activeEl=listDom.children[activeIdx];if(activeEl){activeEl.scrollIntoView({block:"nearest"})}isVisible=!0;widgetDom.style.display="flex";ed.layoutContentWidget(widget)}function update(){if(!suggestEnabled)return;const model=ed.getModel();if(!model)return hide();const pos=ed.getPosition();if(!pos)return hide();const line=model.getLineContent(pos.lineNumber);const before=line.slice(0,pos.column-1);const match=before.match(/([#a-zA-Z0-9_]+)$/);if(!match||match[1].length<1){return hide()}currentPos=pos;currentPrefix=match[1];const lang=getLang()||"cpp";const baseList=DICT_SUGG[lang]||DICT_SUGG.cpp;const codeText=model.getValue();const docWords=[...new Set(codeText.match(/[a-zA-Z_][a-zA-Z0-9_]{2,}/g)||[])];const docItems=docWords.filter(w=>!baseList.some(b=>b.label===w)).map(w=>({label:w,kind:"variable",badge:"v",text:w,delta:[0,w.length],doc:"Document symbol"}));const all=[...baseList,...docItems];const pLower=currentPrefix.toLowerCase();const filtered=all.filter(item=>item.label.toLowerCase().includes(pLower));filtered.sort((a,b)=>{const aStarts=a.label.toLowerCase().startsWith(pLower);const bStarts=b.label.toLowerCase().startsWith(pLower);if(aStarts&&!bStarts)return-1;if(!aStarts&&bStarts)return 1;if(a.kind==="snippet"&&b.kind!=="snippet")return-1;if(a.kind!=="snippet"&&b.kind==="snippet")return 1;return a.label.length-b.label.length});currentList=filtered.slice(0,12);activeIdx=0;render()}const d1=ed.onDidChangeCursorPosition(e=>{if(e.reason===3)return;update()});const d2=ed.onKeyDown(e=>{if(!isVisible){if(e.browserEvent.ctrlKey&&e.browserEvent.code==="Space"){e.preventDefault();e.stopPropagation();update()}return}if(e.browserEvent.key==="ArrowDown"){e.preventDefault();e.stopPropagation();activeIdx=(activeIdx+1)%currentList.length;render()}else if(e.browserEvent.key==="ArrowUp"){e.preventDefault();e.stopPropagation();activeIdx=(activeIdx-1+currentList.length)%currentList.length;render()}else if(e.browserEvent.key==="Tab"||e.browserEvent.key==="Enter"){e.preventDefault();e.stopPropagation();apply(currentList[activeIdx])}else if(e.browserEvent.key==="Escape"){e.preventDefault();e.stopPropagation();hide()}});return{dispose:()=>{d1.dispose();d2.dispose();hide();ed.removeContentWidget(widget);widgetDom.remove()},setEnabled:(v)=>{suggestEnabled=v;if(!v)hide()}}};function rt({value:e,language:n,fontSize:r,theme:s,onChange:a}){const o=b(null),i=b(null),l=b(a);l.current=a;const d=b({value:e,language:n,fontSize:r,theme:s});return d.current={value:e,language:n,fontSize:r,theme:s},E(()=>{let u=!1,c;return(async()=>{et();const{monaco:h}=await W(async()=>{const{monaco:v}=await import("./monacoCore-BDGHH_Kx.js");return{monaco:v}},__vite__mapDeps([0,1,2,3]),import.meta.url);if(u||!o.current)return;tt(o.current),ae(h);const g=d.current,p=h.editor.create(o.current,{value:g.value,language:F[g.language].monacoId,fontSize:g.fontSize,theme:se(g.theme),automaticLayout:!0,minimap:{enabled:!1},scrollBeyondLastLine:!1,smoothScrolling:!0,padding:{top:12,bottom:12},fontFamily:"'Fira Code', Menlo, Consolas, monospace",fontLigatures:!0,lineNumbersMinChars:3,scrollbar:{verticalScrollbarSize:10,horizontalScrollbarSize:10,useShadows:!1},quickSuggestions:!0,suggestOnTriggerCharacters:!0,wordBasedSuggestions:"matchingDocuments",parameterHints:{enabled:!0},autoClosingBrackets:"always",autoClosingQuotes:"always",autoClosingDelete:"always",autoClosingOvertype:"always",autoSurround:"languageDefined",formatOnType:!0,formatOnPaste:!0,tabSize:4,insertSpaces:!0,detectIndentation:!0,bracketPairColorization:{enabled:!0},matchBrackets:"always",renderIndentGuides:!1,renderLineHighlight:"all",cursorBlinking:"smooth",cursorSmoothCaretAnimation:"on",cursorStyle:"line",cursorWidth:2,guides:{indentation:!1,bracketPairs:!1,highlightActiveIndentation:!1,bracketPairsHorizontal:!1},selectionHighlight:!0,occurrencesHighlight:"singleFile",renderWhitespace:"selection",folding:!0,renderValidationDecorations:"on"});i.current=p,window._csesMonacoEditor=p,c=p.onDidChangeModelContent(()=>{l.current(p.getValue())});const sugg=attachLeetCodeSuggestions(p,()=>d.current.language);_globalSuggHandle=sugg;

/* ─── Bracket highlight diagnostics + manual implementation ─── */
(function(){
  // Log current options
  const opts=p.getOptions();
  console.log("[Leetify] matchBrackets:", opts.get(72));
  console.log("[Leetify] bracketPairColorization:", opts.get(15));
  
  // Watch DOM for bracket-match classes to confirm CSS target
  setTimeout(()=>{
    const el=document.querySelector('.bracket-match');
    console.log("[Leetify] .bracket-match element found:", el);
    // Also check other possible class names
    ['bracket-match','paired-bracket','cdr-bracket-match','mtk-bracket'].forEach(cls=>{
      const found=document.querySelector('.'+cls);
      if(found) console.log('[Leetify] Found class:',cls,found);
    });
    // Log all classes on monaco-editor container that mention bracket
    const monacoEl=p.getContainerDomNode();
    if(monacoEl){
      const allEls=monacoEl.querySelectorAll('*');
      const bracketEls=[];
      allEls.forEach(el=>{if(el.className&&typeof el.className==='string'&&el.className.toLowerCase().includes('bracket'))bracketEls.push({cls:el.className,tag:el.tagName})});
      console.log('[Leetify] All bracket elements in editor:',bracketEls.slice(0,20));
    }
  },3000);

  /* Manual bracket pair highlighter using Monaco decorations */
  const bracketOpen=['{','(','['];
  const bracketClose=['}',')',']'];
  const bracketMap={'{':'}','(':')','[':']','}':'{',')':'(',']':'['};
  let bracketDecorations=[];
  
  p.onDidChangeCursorPosition(()=>{
    const model=p.getModel();
    const pos=p.getPosition();
    if(!model||!pos){
      bracketDecorations=p.deltaDecorations(bracketDecorations,[]);
      return;
    }
    const lineContent=model.getLineContent(pos.lineNumber);
    const col=pos.column-1; // 0-indexed
    // Check char at cursor and char before cursor
    const charAt=lineContent[col]||'';
    const charBefore=lineContent[col-1]||'';
    const char=bracketOpen.includes(charAt)||bracketClose.includes(charAt)?charAt:
               bracketOpen.includes(charBefore)||bracketClose.includes(charBefore)?charBefore:'';
    const charCol=bracketOpen.includes(charAt)||bracketClose.includes(charAt)?col:col-1;
    
    if(!char){bracketDecorations=p.deltaDecorations(bracketDecorations,[]);return;}
    
    const isOpen=bracketOpen.includes(char);
    const matchChar=bracketMap[char];
    let depth=0;
    let matchLine=-1,matchCol=-1;
    
    if(isOpen){
      // Search forward
      outer:for(let l=pos.lineNumber;l<=model.getLineCount();l++){
        const line=model.getLineContent(l);
        const start=l===pos.lineNumber?charCol:0;
        for(let c=start;c<line.length;c++){
          if(line[c]===char)depth++;
          else if(line[c]===matchChar){depth--;if(depth===0){matchLine=l;matchCol=c;break outer;}}
        }
      }
    } else {
      // Search backward
      outer:for(let l=pos.lineNumber;l>=1;l--){
        const line=model.getLineContent(l);
        const end=l===pos.lineNumber?charCol:line.length-1;
        for(let c=end;c>=0;c--){
          if(line[c]===char)depth++;
          else if(line[c]===matchChar){depth--;if(depth===0){matchLine=l;matchCol=c;break outer;}}
        }
      }
    }
    
    if(matchLine===-1){bracketDecorations=p.deltaDecorations(bracketDecorations,[]);return;}
    
    const decors=[
      {range:{startLineNumber:pos.lineNumber,startColumn:charCol+1,endLineNumber:pos.lineNumber,endColumn:charCol+2},options:{inlineClassName:'leetify-bracket-hl',stickiness:1}},
      {range:{startLineNumber:matchLine,startColumn:matchCol+1,endLineNumber:matchLine,endColumn:matchCol+2},options:{inlineClassName:'leetify-bracket-hl',stickiness:1}}
    ];
    bracketDecorations=p.deltaDecorations(bracketDecorations,decors);
  });
})();

requestAnimationFrame(()=>{u||p.layout()})})().catch(h=>{console.error("[Leetify for CSES] Failed to mount Monaco editor",h)}),()=>{u=!0,c?.dispose(),sugg?.dispose(),_globalSuggHandle=null,i.current?.dispose(),i.current=null}},[]),E(()=>{const u=i.current;u&&u.getValue()!==e&&u.setValue(e)},[e]),E(()=>{i.current&&W(async()=>{const{monaco:u}=await import("./monacoCore-BDGHH_Kx.js");return{monaco:u}},__vite__mapDeps([0,1,2,3]),import.meta.url).then(({monaco:u})=>{const c=i.current?.getModel();c&&u.editor.setModelLanguage(c,F[n].monacoId)})},[n]),E(()=>{i.current?.updateOptions({fontSize:r})},[r]),E(()=>{const u=i.current;u&&W(async()=>{const{monaco:c}=await import("./monacoCore-BDGHH_Kx.js");return{monaco:c}},__vite__mapDeps([0,1,2,3]),import.meta.url).then(({monaco:c})=>{ae(c),c.editor.setTheme(se(s)),u.render(!0)})},[s]),t("div",{ref:o,className:"h-full w-full"})}function G(){return crypto.randomUUID()}const st=[],R=j()(de((e,n)=>({casesByTask:{},seededTasks:{},getCases:r=>n().casesByTask[r]??st,seedIfNeeded:(r,s)=>e(a=>a.seededTasks[r]||s.length===0?a:{casesByTask:{...a.casesByTask,[r]:s.map(o=>({id:G(),...o}))},seededTasks:{...a.seededTasks,[r]:!0}}),addCase:r=>e(s=>({casesByTask:{...s.casesByTask,[r]:[...s.casesByTask[r]??[],{id:G(),input:"",output:""}]}})),updateCase:(r,s,a)=>e(o=>({casesByTask:{...o.casesByTask,[r]:(o.casesByTask[r]??[]).map(i=>i.id===s?{...i,...a}:i)}})),deleteCase:(r,s)=>e(a=>({casesByTask:{...a.casesByTask,[r]:(a.casesByTask[r]??[]).filter(o=>o.id!==s)}})),duplicateCase:(r,s)=>e(a=>{const o=a.casesByTask[r]??[],i=o.findIndex(c=>c.id===s),l=o[i];if(!l)return a;const d={...l,id:G()},u=[...o.slice(0,i+1),d,...o.slice(i+1)];return{casesByTask:{...a.casesByTask,[r]:u}}})}),{name:"leetify:testcases",storage:me(),merge:(e,n)=>{const r=e??{};return{...n,...r,casesByTask:{...n.casesByTask,...r.casesByTask},seededTasks:{...n.seededTasks,...r.seededTasks}}}})),T=j(e=>({status:"idle",lastRunTaskId:null,compileError:null,infraError:null,resultsByCase:{},startRun:n=>e({status:"running",lastRunTaskId:n,compileError:null,infraError:null}),setResults:(n,r,s)=>e(a=>({status:"idle",lastRunTaskId:n,compileError:r,infraError:null,resultsByCase:{...a.resultsByCase,...Object.fromEntries(s.map(o=>[o.caseId,o]))}})),setInfraError:(n,r)=>e({status:"idle",lastRunTaskId:n,compileError:null,infraError:r})}));function ie(e,n){const r=b(e);return r.current=e,J(()=>{let s;return(...a)=>{s&&clearTimeout(s),s=setTimeout(()=>r.current(...a),n)}},[n])}function ot({taskId:e,sampleTests:n,onRun:r,running:s,isOpen:C_open=!0,onToggle:C_toggle}){const[a,o]=N("cases"),[i,l]=N(0),d=R(m=>m.getCases(e)),u=R(m=>m.seedIfNeeded),c=R(m=>m.addCase),h=R(m=>m.updateCase),g=R(m=>m.deleteCase),p=T(m=>m.status),v=T(m=>m.lastRunTaskId),w=T(m=>m.compileError),I=T(m=>m.infraError),B=T(m=>m.resultsByCase);E(()=>{u(e,n)},[e,n]),E(()=>{p==="running"&&(o("result"),!C_open&&C_toggle&&C_toggle())},[p]);const k=Math.min(i,Math.max(0,d.length-1)),x=d[k],$=v===e;function M(){c(e),l(d.length)}function D(m){g(e,m),l(y=>Math.max(0,y-1))}return t("div",{className:"flex h-full flex-col bg-bg-raised",children:[t("div",{className:"sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-border-subtle px-4",children:[t(fe,{tabs:[{id:"cases",label:"Testcase"},{id:"result",label:"Test Result"}],activeId:a,onChange:m=>{o(m),!C_open&&C_toggle&&C_toggle()}}),C_toggle&&t(H,{label:C_open?"Collapse console":"Expand console",onClick:C_toggle,className:"h-6 w-6 text-fg-subtle hover:text-fg",children:t("span",{className:"text-[11px]",children:C_open?"▼":"▲"})})]}),a==="cases"?t("div",{className:"min-h-0 flex-1 overflow-auto p-4",children:[t("div",{className:"mb-3 flex flex-wrap items-center gap-2",children:[d.map((m,y)=>t("button",{onClick:()=>l(y),className:`rounded-lg px-4 py-1.5 text-[13px] font-medium transition-all duration-100 active:scale-[0.97] ${y===k?"bg-border text-fg":"bg-bg-overlay text-fg-muted hover:text-fg"}`,children:["Case ",y+1]},m.id)),t("button",{"aria-label":"Add testcase",title:"Add testcase",onClick:M,className:"inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted transition-all duration-100 hover:bg-bg-overlay hover:text-fg active:scale-95",children:t(Ve,{className:"h-3.5 w-3.5"})})]}),x?t(dt,{testCase:x,onChange:m=>h(e,x.id,m),onDelete:()=>D(x.id)},x.id):t(P,{title:"No test cases yet",hint:"Add one with the + button — sample tests seed automatically on problems that have them."})]}):t("div",{className:"min-h-0 flex-1 overflow-auto p-4",children:p==="running"?t("div",{className:"flex flex-col items-center gap-1.5 py-6 text-center",children:[t("p",{className:"text-[13px] font-medium text-fg-muted",children:"Running…"}),t("p",{className:"text-[12px] text-fg-subtle",children:"Compiling and running against your test cases."})]}):$?I?t("div",{className:"flex min-h-full items-center justify-center",children:t(P,{title:"Could not reach the judge",hint:I,icon:!0})}):t(K,{children:[t("div",{className:"mb-3 flex items-center justify-between",children:[t("div",{className:"flex flex-wrap items-center gap-2",children:d.map((m,y)=>t("button",{onClick:()=>l(y),className:`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-[13px] font-medium transition-all duration-100 active:scale-[0.97] ${y===k?"bg-border text-fg":"bg-bg-overlay text-fg-muted hover:text-fg"}`,children:[t(ct,{verdict:B[m.id]?.verdict}),"Case ",y+1]},m.id))}),t(H,{label:"Run again",onClick:r,className:"h-7 w-7",children:t(Q,{className:"h-3.5 w-3.5"})})]}),w&&t("div",{className:"mb-3 rounded-lg border border-border-subtle bg-bg-overlay/40 p-3",children:[t("p",{className:"mb-1.5 text-[11px] font-medium uppercase tracking-[0.05em] text-fg-muted",children:"Compile error"}),t("pre",{className:"overflow-auto whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed text-danger",children:w})]}),(()=>{const m=x?B[x.id]:void 0;return x&&m?t(ut,{testCase:x,result:m}):t(P,{title:"No result for this case",hint:"This case wasn't included in the last run."})})()]}):t("div",{className:"flex min-h-full items-center justify-center",children:t(P,{title:"Run a test to see results here",hint:"Click Run to compile and check your code against your test cases.",icon:!0})})})]})}const at={pass:"Accepted",fail:"Wrong Answer","runtime-error":"Runtime Error",timeout:"Time Limit Exceeded","compile-error":"Compile Error","infra-error":"Judge Unavailable"},it={pass:"bg-success",fail:"bg-danger","runtime-error":"bg-danger",timeout:"bg-warning","compile-error":"bg-fg-subtle","infra-error":"bg-warning"},lt={pass:"text-success",fail:"text-danger","runtime-error":"text-danger",timeout:"text-warning","compile-error":"text-fg-subtle","infra-error":"text-warning"};function ct({verdict:e}){return e?t("span",{"aria-hidden":"true",className:`h-1.5 w-1.5 rounded-full ${it[e]}`}):null}function ut({testCase:e,result:n}){return n.verdict==="compile-error"?t("p",{className:"text-[13px] text-fg-muted",children:"This case didn't run — the code failed to compile."}):n.verdict==="infra-error"?t(P,{title:"Couldn't run this case",hint:"The judge was unavailable for this case specifically. Try running again."}):t("div",{className:"flex flex-col gap-3",children:[t("div",{className:"flex items-center gap-2",children:[t("span",{className:`text-[12px] font-semibold ${lt[n.verdict]}`,children:at[n.verdict]}),n.timeMs!==null&&t("span",{className:"text-[11px] tabular-nums text-fg-subtle",children:[n.timeMs,"ms"]})]}),t(O,{label:"Input",value:e.input}),t(O,{label:"Expected Output",value:e.output}),n.verdict==="timeout"?t("p",{className:"text-[12px] text-warning",children:"Timed out — this case took too long to run."}):t(O,{label:"Actual Output",value:n.actualOutput??"",highlight:n.verdict==="fail"||n.verdict==="runtime-error"}),n.stderr&&t(O,{label:"Error Output",value:n.stderr,highlight:!0})]})}function O({label:e,value:n,highlight:r=!1}){return t("div",{className:"flex flex-col",children:[t("span",{className:"mb-1.5 text-[11px] font-medium uppercase tracking-[0.05em] text-fg-muted",children:e}),t("pre",{className:`overflow-auto whitespace-pre-wrap rounded-md border px-3 py-2 font-mono text-[13px] leading-relaxed ${r?"border-danger/40 bg-danger/5 text-fg":"border-border-subtle bg-bg-base text-fg"}`,children:n||" "})]})}const le=400;function dt({testCase:e,onChange:n,onDelete:r}){const[s,a]=N(e.input),[o,i]=N(e.output),l=ie(c=>n({input:c}),le),d=ie(c=>n({output:c}),le);function u(){navigator.clipboard?.writeText(s)}return t("div",{className:"group relative rounded-lg border border-border-subtle bg-bg-overlay/40 p-3",children:[t("div",{className:"absolute right-2 top-2 z-10 flex items-center gap-0.5 opacity-0 transition-opacity duration-100 group-hover:opacity-100 group-focus-within:opacity-100",children:[t(H,{label:"Copy input",onClick:u,className:"h-7 w-7",children:t(Ue,{className:"h-3.5 w-3.5"})}),t(H,{label:"Delete testcase",onClick:r,className:"h-7 w-7",children:t(ze,{className:"h-3.5 w-3.5"})})]}),t("div",{className:"flex flex-col gap-3",children:[t(ce,{label:"Input",value:s,onInput:c=>{a(c),l(c)}}),t(ce,{label:"Expected Output",value:o,onInput:c=>{i(c),d(c)}})]})]})}function ce({label:e,value:n,onInput:r}){return t("label",{className:"flex flex-col",children:[t("span",{className:"mb-1.5 text-[11px] font-medium uppercase tracking-[0.05em] text-fg-muted",children:e}),t("textarea",{value:n,onInput:s=>r(s.target.value),rows:2,spellcheck:!1,className:"resize-y rounded-md border border-border-subtle bg-bg-base px-3 py-2 font-mono text-[13px] leading-relaxed text-fg outline-none transition-colors duration-DEFAULT focus:border-accent"})]})}function P({title:e,hint:n,icon:r=!1}){return t("div",{className:"flex flex-col items-center gap-1.5 py-6 text-center",children:[r&&t("span",{className:"mb-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg-overlay text-fg-subtle",children:t(Q,{className:"h-4 w-4"})}),t("p",{className:"text-[13px] font-medium text-fg-muted",children:e}),t("p",{className:"text-[12px] text-fg-subtle",children:n})]})}function mt(e){if(!e)return[];const n=Array.from(e.querySelectorAll("pre")),r=[];for(let s=0;s+1<n.length;s+=2){const a=n[s]?.textContent?.trim()??"",o=n[s+1]?.textContent?.trim()??"";(a||o)&&r.push({input:a,output:o})}return r}function X(e,n){return`${e}:${n}`}const L=j()(de((e,n)=>({language:Ze,fontSize:(()=>{try{const v=parseInt(localStorage.getItem("csescode:fontSize"));if(!isNaN(v)&&v>=Ne&&v<=Se)return v}catch(e){}return Te})(),snapshots:{},setLanguage:r=>e({language:r}),setFontSize:r=>{try{localStorage.setItem("csescode:fontSize",String(r))}catch(e){}return e({fontSize:r})},getCode:(r,s)=>n().snapshots[X(r,s)]?.code??"",setCode:(r,s,a)=>e(o=>({snapshots:{...o.snapshots,[X(r,s)]:{code:a,updatedAt:Date.now()}}}))}),{name:"leetify:editor",storage:me(),merge:(e,n)=>{const r=e??{},s={...n.snapshots};for(const[a,o]of Object.entries(r.snapshots??{})){const i=s[a];(!i||o.updatedAt>=i.updatedAt)&&(s[a]=o)}const savedFs=(()=>{try{const v=parseInt(localStorage.getItem("csescode:fontSize"));if(!isNaN(v)&&v>=Ne&&v<=Se)return v}catch(e){}return r.fontSize})();return{...n,...r,fontSize:savedFs??n.fontSize,snapshots:s}}})),ft=600,ht=1200;function pt(e,n){const r=L(i=>i.setCode),s=b(),a=b();return E(()=>()=>{clearTimeout(s.current),clearTimeout(a.current)},[]),{save:J(()=>i=>{const{setStatus:l}=he.getState();l("saving"),clearTimeout(s.current),s.current=setTimeout(()=>{r(e,n,i),l("saved"),clearTimeout(a.current),a.current=setTimeout(()=>l("idle"),ht)},ft)},[e,n,r])}}const gt={cpp:`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);



    return 0;
}
`,python:`import sys
input = sys.stdin.readline

def solve():
    pass

solve()
`,java:`import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    }
}
`,c:`#include <stdio.h>

int main(void) {


    return 0;
}
`};function bt({containerRef:e,onCommit:n}){const[r,s]=N(null),a=b(null),o=b(null),i=b(n);i.current=n;const l=A(c=>{if(!e.current)return;const g=e.current.getBoundingClientRect().bottom-c.clientY,p=Math.min(Ce,Math.max(ke,g));a.current=p,o.current===null&&(o.current=requestAnimationFrame(()=>{o.current=null,s(a.current)}))},[e]),d=A(()=>{document.removeEventListener("pointermove",l),document.removeEventListener("pointerup",d),document.body.style.cursor="",document.body.style.userSelect="",o.current!==null&&(cancelAnimationFrame(o.current),o.current=null),a.current!==null&&i.current(a.current),a.current=null,s(null)},[l]),u=A(c=>{c.preventDefault(),document.addEventListener("pointermove",l),document.addEventListener("pointerup",d),document.body.style.cursor="row-resize",document.body.style.userSelect="none"},[l,d]);return{dragHeight:r,startDragging:u}}const Z="leetify:pendingSubmission";async function vt(e){await Pe(Z,e)}async function xt(){const e=await Ae(Z);return e&&await _e(Z),e??null}let Y=null;function yt(e){Y=e}function wt(){if(Y)return{href:Y};const n=Array.from(document.querySelectorAll(".navigation .nav a")).find(r=>r.textContent?.trim().toLowerCase()==="submit");return n?{href:n.href}:null}async function Nt(e){const n=wt();return n?(await vt(e),window.location.href=n.href,!0):!1}function St(e,n){const r=e.toLowerCase();switch(n){case"cpp":return r.includes("c++")?2:0;case"c":return r.includes("c")&&!r.includes("c++")&&!r.includes("c#")?1:0;case"python":return r.includes("python")?2:0;case"java":return r.includes("java")&&!r.includes("javascript")?2:0}}async function Et(){const e=document.querySelector('input[type="file"]');if(!e)return;const n=await xt();if(!n)return;const r=F[n.language].fileExtension,s=new File([n.code],`submission.${r}`,{type:"text/plain"}),a=new DataTransfer;a.items.add(s),e.files=a.files,e.dispatchEvent(new Event("change",{bubbles:!0}));const o=document.querySelector("select");if(!o)return;let i,l=0;for(const d of Array.from(o.options)){const u=St(d.text,n.language);u>l&&(l=u,i=d)}i&&(o.value=i.value,o.dispatchEvent(new Event("change",{bubbles:!0})))}async function Tt(){const e=document.cookie.match(/(?:^|;\s*)PHPSESSID=([^;]+)/);if(!e)return null;const n=new TextEncoder().encode(e[1]),r=await crypto.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(r)).map(s=>s.toString(16).padStart(2,"0")).join("")}const Ct=3e3;function kt({taskId:e,problemNode:n,isLoggedIn:r}){const s=L(f=>f.language),a=L(f=>f.setLanguage),o=L(f=>f.fontSize),i=L(f=>f.setFontSize),l=L(f=>f.snapshots[X(e,s)]),{save:d}=pt(e,s),u=l?.code??gt[s],c=S(f=>f.theme),h=S(f=>f.testPanelHeightPx),g=S(f=>f.setTestPanelHeightPx),p=J(()=>mt(n),[n]),v=b(null),{dragHeight:w,startDragging:I}=bt({containerRef:v,onCommit:g}),B=w??h,[k,x]=N(null),[$,M]=N(!1),[D,m]=N(!1),[C_open,setCOpen]=N(!0),[C_isOn,C_setIsOn]=N(()=>{try{const h=localStorage.getItem("csescode:hints");if(h!==null)return h==="true"}catch(e){}return!0}),y=R(f=>f.getCases(e)),pe=T(f=>f.startRun),ge=T(f=>f.setResults),be=T(f=>f.setInfraError);function q(f,z=Ct){x(f),setTimeout(()=>x(_=>_===f?null:_),z)}async function ee(){if(!r){q("Log in to CSES to use Run.");return}if(y.length===0){q("Add a test case first — there's nothing to run against.");return}setCOpen(!0),m(!0),pe(e);try{const f=await Tt(),z={type:"run-test-cases",taskId:e,language:s,code:u,cases:y.map(U=>({caseId:U.id,input:U.input,expectedOutput:U.output})),sessionHash:f},_=await chrome.runtime.sendMessage(z);ge(e,_.compileError,_.results)}catch{be(e,"Could not reach the judge — try again in a moment.")}finally{m(!1)}}async function ve(){M(!0);try{await Nt({taskId:e,code:u,language:s,createdAt:Date.now()})||q("Couldn't find CSES's Submit tab — are you logged in?")}finally{M(!1)}}E(()=>{const kh=ev=>{const mod=/mac/i.test(navigator.platform)?ev.metaKey:ev.ctrlKey;if(mod&&(ev.key==="'"||ev.code==="Quote")){ev.preventDefault(),ev.stopPropagation();if(!D&&!$&&r)ee()}else if(mod&&(ev.key==="Enter"||ev.code==="Enter"||ev.code==="NumpadEnter")){ev.preventDefault(),ev.stopPropagation();if(!D&&!$&&r)ve()}};window.addEventListener("keydown",kh,!0);return()=>window.removeEventListener("keydown",kh,!0)},[ee,ve,D,$,r]);return t("div",{ref:v,className:"flex h-full flex-col bg-bg-raised",children:[t(Ye,{language:s,onLanguageChange:a,fontSize:o,onFontSizeChange:i,onRun:ee,onSubmit:ve,isLoggedIn:r,running:D,submitting:$,intelliSenseOn:C_isOn,onToggleIntelliSense:()=>{C_setIsOn(nv=>{const next=!nv;try{localStorage.setItem("csescode:hints",String(next))}catch(e){}_globalSuggHandle&&_globalSuggHandle.setEnabled(next);return next})}}),k&&t("div",{className:"border-b border-border-subtle bg-bg-overlay px-4 py-1.5 text-[12px] text-fg-muted",children:k}),t("div",{className:"relative min-h-0 flex-1",children:[t(nt,{value:u,language:s,fontSize:o,theme:c,onChange:d}),t("div",{className:"pointer-events-none absolute bottom-1.5 right-4 select-none text-[11px] text-fg-subtle/60",children:[t("a",{href:"https://github.com/Vamp-Niklaus",target:"_blank",rel:"noreferrer",className:"pointer-events-auto text-fg-subtle/60 underline decoration-dotted underline-offset-2 transition-colors duration-100 hover:text-accent",children:"GitHub: Vamp-Niklaus"})]})]}),C_open&&t("div",{role:"separator","aria-orientation":"horizontal","aria-label":"Resize console panel",onPointerDown:f=>I(f),className:"group relative flex h-1 shrink-0 cursor-row-resize flex-col items-stretch justify-center",children:[t("div",{className:"h-px bg-border transition-all duration-100 group-hover:h-full group-hover:bg-accent"}),t("div",{className:"absolute inset-x-0 -top-1 -bottom-1"})]}),t("div",{style:{height:C_open?`${B}px`:"38px"},className:"shrink-0 overflow-hidden transition-[height] duration-150",children:t(ot,{taskId:e,sampleTests:p,onRun:ee,running:D,isOpen:C_open,onToggle:()=>setCOpen(o_c=>!o_c)})})]})};function Rt({taskId:e,problemNode:n,topicLabel:r,topicNode:s,submissionsNode:a,pageMeta:o,topOffsetPx:i}){const l=S(c=>c.splitPercent),d=S(c=>c.setSplitPercent),u=o?.navLinks.some(c=>c.label.trim().toLowerCase()==="submit")??!1;return t("div",{style:{height:`calc(100vh - ${i}px)`},className:"sticky top-0 flex w-full flex-col overflow-hidden bg-bg-base text-fg",children:[o&&t(De,{meta:o}),t("div",{className:"min-h-0 flex-1",children:t(Be,{splitPercent:l,onSplitChange:d,left:t(Me,{problemNode:n,topicLabel:r,topicNode:s,submissionsNode:a}),right:t(kt,{taskId:e,problemNode:n,isLoggedIn:u})})})]})}function Lt(){return document.querySelector(".content")}function At(){const e=document.querySelector(".navigation .title-block");if(!e)return null;const n=e.querySelector("h3 a"),r=e.querySelector("h1")?.textContent?.trim()||document.title,s=Array.from(e.querySelectorAll("ul.nav a")).map(a=>({label:a.textContent?.trim()??"",href:a.href,current:a.classList.contains("current")}));return{courseLabel:n?.textContent?.trim()??null,courseHref:n?.href??null,title:r,navLinks:s}}function _t(){return document.querySelector(".content-wrapper > .nav.sidebar")}
async function loadSubmissionToEditor(url){
  const res=await fetch(url,{credentials:"include"});
  if(!res.ok) throw new Error("Failed to fetch submission");
  const html=await res.text();
  const doc=new DOMParser().parseFromString(html,"text/html");
  let code="";
  const pres=Array.from(doc.querySelectorAll("pre"));
  if(pres.length>0){
    const codePre=pres.find(p=>p.classList.contains("prettyprint")||p.classList.contains("linenums"))||pres.reduce((a,b)=>a.textContent.length>b.textContent.length?a:b);
    const lis=codePre.querySelectorAll("li");
    code=lis&&lis.length>0?Array.from(lis).map(li=>li.textContent).join("\n"):(codePre.textContent||"");
  }
  if(!code){
    const ta=doc.querySelector("textarea");
    if(ta) code=ta.value;
  }
  if(!code) throw new Error("No code found in submission");
  let lang=null;
  const rows=Array.from(doc.querySelectorAll("table tr"));
  for(const tr of rows){
    const txt=tr.textContent.toLowerCase();
    if(txt.includes("compiler")||txt.includes("language")){
      if(txt.includes("c++")||txt.includes("g++")||txt.includes("clang++")) lang="cpp";
      else if(txt.includes("python")||txt.includes("pypy")) lang="python";
      else if(txt.includes("java")) lang="java";
      else if(txt.includes("c11")||txt.includes("gcc")||txt.includes("c99")) lang="c";
      break;
    }
  }
  if(!lang){
    if(code.includes("#include")||code.includes("std::")||code.includes("cout")) lang="cpp";
    else if(code.includes("def ")||code.includes("import sys")||code.includes("print(")) lang="python";
    else if(code.includes("import java")||code.includes("public class")||code.includes("System.out")) lang="java";
  }
  const finalLang=lang||(L.getState().language||"cpp");
  if(lang&&lang!==L.getState().language){
    L.getState().setLanguage(lang);
  }
  const tId=It();
  if(tId){
    L.getState().setCode(tId,finalLang,code);
  }
  if(window._csesMonacoEditor){
    window._csesMonacoEditor.setValue(code);
  }
  return {code,lang:finalLang};
}

function parseFallbackFromSidebar(fallbackNode){
  if(!fallbackNode) return [];
  const links=Array.from(fallbackNode.querySelectorAll('a[href*="/result/"]'));
  return links.map((a,idx)=>{
    const isAcc=a.querySelector(".full")!==null||a.classList.contains("full");
    const isZero=a.querySelector(".zero")!==null||a.classList.contains("zero");
    const status=isAcc?"Accepted":(isZero?"Wrong Answer":"Submitted");
    let time="";
    for(const child of Array.from(a.childNodes)){
      if(child.nodeType===3){
        const txt=child.textContent.trim();
        if(txt){ time=txt; break; }
      }
    }
    if(!time) time=a.textContent.trim().split(" ")[0];
    let detailsHref="";
    if(a){
      const raw=a.getAttribute("href")||a.href||"";
      if(raw){
        try{ detailsHref=new URL(raw,window.location.origin).href; }catch(e){ detailsHref=raw; }
      }
    }
    return {
      id:idx+1,
      time:time||"Recent",
      lang:"C++",
      runtime:"--",
      codeSize:"--",
      status,
      isAccepted:isAcc,
      isZero,
      detailsHref
    };
  });
}

async function fetchSubmissionsList(taskId){
  let viewUrl=null;
  const navA=Array.from(document.querySelectorAll("a")).find(a=>a.href&&a.href.includes("/view/"));
  if(navA) viewUrl=navA.href;
  if(!viewUrl&&taskId) viewUrl=`/problemset/view/${taskId}/`;
  if(!viewUrl){
    const m=location.href.match(/\/task\/(\d+)/)||location.href.match(/\/view\/(\d+)/);
    if(m) viewUrl=`/problemset/view/${m[1]}/`;
  }
  if(!viewUrl) return [];

  try{
    const res=await fetch(viewUrl,{credentials:"include"});
    if(!res.ok) return [];
    const html=await res.text();
    const doc=new DOMParser().parseFromString(html,"text/html");
    const trs=Array.from(doc.querySelectorAll("table.wide tr, table tr"));
    const dataRows=trs.filter(tr=>tr.querySelectorAll("td").length>=5);
    return dataRows.map((tr,idx)=>{
      const tds=Array.from(tr.querySelectorAll("td"));
      const time=tds[0]?.textContent?.trim()||"";
      const lang=tds[1]?.textContent?.trim()||"C++";
      const runtime=tds[2]?.textContent?.trim()||"--";
      const codeSize=tds[3]?.textContent?.trim()||"--";
      const scoreTd=tds[4];
      const isAcc=scoreTd?.classList?.contains("full")||scoreTd?.querySelector(".full")!==null;
      const isZero=scoreTd?.classList?.contains("zero")||scoreTd?.querySelector(".zero")!==null;
      const status=isAcc?"Accepted":(isZero?"Wrong Answer":"Submitted");
      const detailsA=tds[5]?.querySelector("a.details-link")||tr.querySelector('a[href*="/result/"]');
      let detailsHref="";
      if(detailsA){
        const raw=detailsA.getAttribute("href")||detailsA.href||"";
        if(raw){
          try{ detailsHref=new URL(raw,window.location.origin).href; }catch(e){ detailsHref=raw; }
        }
      }
      return {
        id:idx+1,
        time,
        lang,
        runtime,
        codeSize,
        status,
        isAccepted:isAcc,
        isZero,
        detailsHref
      };
    }).filter(Boolean);
  }catch(err){
    console.warn("[CSESCode] Failed to fetch submissions view:",err);
    return [];
  }
}

function SubmissionsPane({fallbackNode}){
  const [items,setItems]=N(()=>parseFallbackFromSidebar(fallbackNode));
  const [loading,setLoading]=N(!0);
  const [restoringUrl,setRestoringUrl]=N(null);
  const [successUrl,setSuccessUrl]=N(null);

  E(()=>{
    let active=true;
    const taskId=It();
    fetchSubmissionsList(taskId).then(fetched=>{
      if(active){
        if(fetched&&fetched.length>0) setItems(fetched);
        setLoading(!1);
      }
    }).catch(()=>{
      if(active) setLoading(!1);
    });
    return ()=>{active=false};
  },[]);

  const onRestore=async(href)=>{
    if(!href||restoringUrl) return;
    setRestoringUrl(href);
    try{
      await loadSubmissionToEditor(href);
      setRestoringUrl(null);
      setSuccessUrl(href);
      setTimeout(()=>setSuccessUrl(null),2200);
    }catch(err){
      console.error("[CSESCode] Restore failed:",err);
      setRestoringUrl(null);
    }
  };

  if(loading&&items.length===0){
    return t("div",{className:"flex flex-col items-center justify-center py-16 text-center text-fg-muted",children:[
      t("div",{className:"mb-3 inline-block h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent"}),
      t("div",{className:"text-[13px] text-fg-muted",children:"Loading submissions…"})
    ]});
  }

  if(!loading&&items.length===0){
    return t("div",{className:"flex flex-col items-center justify-center py-16 text-center text-fg-muted",children:[
      t("div",{className:"text-2xl mb-2",children:"📝"}),
      t("div",{className:"text-[14px] font-medium text-fg",children:"No submissions yet"}),
      t("div",{className:"text-[12px] text-fg-muted mt-1",children:"Submit your code using the Submit button to see your results here."})
    ]});
  }

  return t("div",{className:"csescode-sub-container",children:
    t("table",{className:"csescode-sub-table",children:[
      t("thead",{children:
        t("tr",{children:[
          t("th",{style:{width:"34%"},children:"Status"}),
          t("th",{style:{width:"16%"},children:"Language"}),
          t("th",{style:{width:"18%"},children:"Runtime"}),
          t("th",{style:{width:"18%"},children:"Code Size"}),
          t("th",{style:{width:"14%",textAlign:"right"},children:""})
        ]})
      }),
      t("tbody",{children:items.map((item,idx)=>{
        const isRestoring=restoringUrl===item.detailsHref;
        const isSuccess=successUrl===item.detailsHref;
        return t("tr",{key:item.detailsHref||idx,className:"csescode-sub-row",children:[
          t("td",{children:
            t("div",{className:"csescode-status-col",children:[
              item.detailsHref?t("a",{
                href:item.detailsHref,
                className:item.isAccepted?"csescode-status-acc":"csescode-status-err",
                title:"View test results",
                children:[
                  t("span",{style:{width:"7px",height:"7px",borderRadius:"50%",background:item.isAccepted?"#2cbb5d":"#ef4444",display:"inline-block"}}),
                  item.status
                ]
              }):t("span",{
                className:item.isAccepted?"csescode-status-acc":"csescode-status-err",
                children:[
                  t("span",{style:{width:"7px",height:"7px",borderRadius:"50%",background:item.isAccepted?"#2cbb5d":"#ef4444",display:"inline-block"}}),
                  item.status
                ]
              }),
              t("span",{className:"csescode-sub-time",children:item.time})
            ]})
          }),
          t("td",{children:
            t("span",{className:"csescode-lang-pill",children:item.lang||"C++"})
          }),
          t("td",{children:
            t("span",{className:"csescode-metric-val",children:[
              t("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",style:{opacity:.6},children:[
                t("circle",{cx:12,cy:12,r:10}),
                t("polyline",{points:"12 6 12 12 16 14"})
              ]}),
              item.runtime||"--"
            ]})
          }),
          t("td",{children:
            t("span",{className:"csescode-metric-val",children:[
              t("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",style:{opacity:.6},children:[
                t("polyline",{points:"16 18 22 12 16 6"}),
                t("polyline",{points:"8 6 2 12 8 18"})
              ]}),
              item.codeSize||"--"
            ]})
          }),
          t("td",{children:
            t("div",{className:"csescode-actions-cell",style:{justifyContent:"flex-end"},children:[
              item.detailsHref&&t("button",{
                type:"button",
                className:"csescode-restore-btn",
                onClick:()=>onRestore(item.detailsHref),
                disabled:isRestoring,
                title:isRestoring?"Restoring code…":(isSuccess?"Restored to editor!":"Restore code to editor"),
                "aria-label":"Restore code to editor",
                children:isRestoring?t("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.2,strokeLinecap:"round",strokeLinejoin:"round",style:{animation:"csescode-spin 0.8s linear infinite"},children:[
                  t("path",{d:"M21 2v6h-6"}),
                  t("path",{d:"M3 12a9 9 0 0 1 15-6.7L21 8"}),
                  t("path",{d:"M3 22v-6h6"}),
                  t("path",{d:"M21 12a9 9 0 0 1-15 6.7L3 16"})
                ]}):(isSuccess?t("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round",children:[
                  t("polyline",{points:"20 6 9 17 4 12"})
                ]}):t("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.2,strokeLinecap:"round",strokeLinejoin:"round",children:[
                  t("path",{d:"M21 2v6h-6"}),
                  t("path",{d:"M3 12a9 9 0 0 1 15-6.7L21 8"}),
                  t("path",{d:"M3 22v-6h6"}),
                  t("path",{d:"M21 12a9 9 0 0 1-15 6.7L3 16"})
                ]}))
              })
            ]})
          })
        ]});
      })})
    ]})
  });
}
function Pt(e){const n=document.createElement("div");n.className="topic-list";const r=document.createElement("div");r.className="submissions-list";let s=n;for(const o of Array.from(e.children)){if(o.tagName==="HR"){s=r;continue}s.appendChild(o)}return{topicLabel:n.querySelector("h4")?.textContent?.trim()||"Problems",topicEl:n,submissionsEl:r}}function It(e=location.href){return e.match(/\/task\/(\d+)/)?.[1]??null}const Bt=""+chrome.runtime.getURL("assets/theme-CFyqH5wF.css"),ue="leetify-cses-host";async function Mt(){const e=It();if(!e||document.getElementById(ue)||document.querySelector('input[type="file"]')||(await Re(),!S.getState().enabled))return;const n=Lt(),r=_t(),s=At(),a=r?Pt(r):null;r?.remove();const o=document.createElement("div");o.id=ue,o.style.flex="1 1 100%",o.style.width="100%",o.style.minWidth="0";const i=o.attachShadow({mode:"open"}),l=document.createElement("link");l.rel="stylesheet",l.href=Bt,i.appendChild(l);const d=document.createElement("div");d.id="leetify-cses-root",i.appendChild(d),Dt(d),S.subscribe(h=>{d.dataset.theme=h.theme}),n?.parentElement?n.parentElement.replaceChild(o,n):document.body.appendChild(o);const u=document.querySelector(".skeleton");if(u&&(u.style.maxWidth="none",u.style.margin="0"),s){const h=s.navLinks.find(g=>g.label.trim().toLowerCase()==="submit");yt(h?.href??null),document.querySelector(".navigation")?.remove()}const c=o.getBoundingClientRect().top;Le(t(Rt,{taskId:e,problemNode:n,topicLabel:a?.topicLabel??"Problems",topicNode:a?.topicEl??null,submissionsNode:a?.submissionsEl??null,pageMeta:s,topOffsetPx:c}),d)}function Dt(e){e.dataset.theme=S.getState().theme}Mt();Et();export{W as _};
//# sourceMappingURL=index.tsx-tWGCF9KQ.js.map
