(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))r(d);new MutationObserver(d=>{for(const n of d)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function c(d){const n={};return d.integrity&&(n.integrity=d.integrity),d.referrerpolicy&&(n.referrerPolicy=d.referrerpolicy),d.crossorigin==="use-credentials"?n.credentials="include":d.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(d){if(d.ep)return;d.ep=!0;const n=c(d);fetch(d.href,n)}})();let h=null;function N(e){let t=e;const c=new Set;return[()=>{const n=h;return n!=null&&c.add(n),t},n=>{if(t!==n){t=n;for(const u of c)u()}}]}function O(e){let t=h;h=e,e(),h=t}function A(e,t){t.appendChild(e())}function s(e,t,c){const r=typeof e;console.log("insert",e,r);let d=null;if(Array.isArray(e))e.forEach(n=>s(n,t,c));else if(e===null||r==="string"||r==="number"){const n=document.createTextNode("");return n.textContent=e,c==null?t.append(n):t.childNodes[c].replaceWith(n),t.childNodes.length-1}else r==="function"?O(()=>{console.log("run effect"),d==null?d=s(e(),t,c):s(e(),t,d)}):e instanceof HTMLElement&&(c==null?t.append(e):t.childNodes[c].replaceWith(e))}function j({children:e}){const[t,c]=N(1),[r,d]=N(2),[n,u]=N(3),C=()=>c(t()+1),i=()=>d(r()+1),a=()=>u(n()+1);return(()=>{const l=document.createElement("p"),T=document.createTextNode(`
      `);l.appendChild(T);const g=(()=>{const o=document.createElement("button");o.onclick=C;const p=document.createTextNode(`
        `);o.appendChild(p),s(()=>e,o);const m=document.createTextNode(`
        `);o.appendChild(m),s(()=>t(),o);const f=document.createTextNode(`
      `);return o.appendChild(f),o})();l.appendChild(g);const y=document.createTextNode(`
      `);l.appendChild(y);const b=(()=>{const o=document.createElement("button");o.onclick=i;const p=document.createTextNode(`
        `);o.appendChild(p),s(()=>e,o);const m=document.createTextNode(`
        `);o.appendChild(m),s(()=>r()*2,o);const f=document.createTextNode(`
      `);return o.appendChild(f),o})();l.appendChild(b);const E=document.createTextNode(`
      `);l.appendChild(E);const v=(()=>{const o=document.createElement("button");o.onclick=a;const p=document.createTextNode(`
        `);o.appendChild(p),s(()=>e,o);const m=document.createTextNode(`
        `);o.appendChild(m),s(()=>n()+" -",o);const f=document.createTextNode(`
        `);o.appendChild(f),s(()=>n()%2===0?(()=>{const x=document.createElement("b"),k=document.createTextNode("even");return x.appendChild(k),x})():"odd",o);const S=document.createTextNode(`
      `);return o.appendChild(S),o})();l.appendChild(v);const L=document.createTextNode(`
    `);return l.appendChild(L),l})()}A(()=>(()=>{const e=document.createElement("div"),t=document.createTextNode(`
      `);e.appendChild(t);const c=(()=>{const i=document.createElement("p"),a=document.createTextNode("`npm run compile` to build the JSX(/src/main.js → /dist/main.js)");return i.appendChild(a),i})();e.appendChild(c);const r=document.createTextNode(`
      `);e.appendChild(r);const d=(()=>{const i=document.createElement("p"),a=document.createTextNode(" and click the buttons below to test interation");return i.appendChild(a),i})();e.appendChild(d);const n=document.createTextNode(`
      `);e.appendChild(n);const u=j({children:["count:"]});e.appendChild(u);const C=document.createTextNode(`
    `);return e.appendChild(C),e})(),document.querySelector("#root"));
