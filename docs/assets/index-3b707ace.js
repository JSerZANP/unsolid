(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();let T=null;function E(e){let t=e;const r=new Set;return[()=>{const n=T;return n!=null&&r.add(n),t},n=>{if(t!==n){t=n;for(const i of r)i()}}]}function w(e){let t=T;T=e,e(),T=t}function M(e,t){s(e(),t)}function s(e,t,r){const u=typeof e;let o=null;if(Array.isArray(e))e.forEach(n=>s(n,t,r));else if(e==null||u==="string"||u==="number"){const n=document.createTextNode(e);return r==null?t.append(n):t.childNodes[r].replaceWith(n),t.childNodes.length-1}else u==="function"?w(()=>{o==null?o=s(e(),t,r):s(e(),t,o)}):e instanceof HTMLElement&&(r==null?t.append(e):t.childNodes[r].replaceWith(e))}function W({children:e}){const[t,r]=E(1),[u,o]=E(2),[n,i]=E(3),y=()=>r(t()+1),p=()=>o(u()+1),m=()=>i(n()+1);return(()=>{const a=document.createElement("div"),v=document.createTextNode(`
      `);a.appendChild(v);const L=(()=>{const c=document.createElement("p"),h=document.createTextNode(`
        increment by 1:`);c.appendChild(h),s(()=>" ",c);const f=document.createTextNode(`
        `);c.appendChild(f);const C=(()=>{const d=document.createElement("button");d.onclick=y;const N=document.createTextNode(`
          `);d.appendChild(N),s(()=>e,d);const x=document.createTextNode(`
          `);d.appendChild(x),s(()=>t(),d);const b=document.createTextNode(`
        `);return d.appendChild(b),d})();c.appendChild(C);const l=document.createTextNode(`
      `);return c.appendChild(l),c})();a.appendChild(L);const S=document.createTextNode(`
      `);a.appendChild(S);const k=(()=>{const c=document.createElement("p"),h=document.createTextNode(`
        increment by 2:
        `);c.appendChild(h);const f=(()=>{const l=document.createElement("button");l.onclick=p;const d=document.createTextNode(`
          `);l.appendChild(d),s(()=>e,l);const N=document.createTextNode(`
          `);l.appendChild(N),s(()=>u()*2,l);const x=document.createTextNode(`
        `);return l.appendChild(x),l})();c.appendChild(f);const C=document.createTextNode(`
      `);return c.appendChild(C),c})();a.appendChild(k);const O=document.createTextNode(`
      `);a.appendChild(O);const A=(()=>{const c=document.createElement("p"),h=document.createTextNode(`
        render bold text if even:`);c.appendChild(h),s(()=>" ",c);const f=document.createTextNode(`
        `);c.appendChild(f);const C=(()=>{const d=document.createElement("button");d.onclick=m;const N=document.createTextNode(`
          `);d.appendChild(N),s(()=>e,d);const x=document.createTextNode(`
          `);d.appendChild(x),s(()=>n()+" -",d);const b=document.createTextNode(`
          `);d.appendChild(b),s(()=>n()%2===0?(()=>{const g=document.createElement("b"),q=document.createTextNode("even");return g.appendChild(q),g})():"odd",d);const j=document.createTextNode(`
        `);return d.appendChild(j),d})();c.appendChild(C);const l=document.createTextNode(`
      `);return c.appendChild(l),c})();a.appendChild(A);const P=document.createTextNode(`
    `);return a.appendChild(P),a})()}M(()=>(()=>{const e=document.createElement("div"),t=document.createTextNode(`
      `);e.appendChild(t);const r=(()=>{const p=document.createElement("p"),m=document.createTextNode("`npm run compile` to build the JSX(/src/main.js → /dist/main.js)");return p.appendChild(m),p})();e.appendChild(r);const u=document.createTextNode(`
      `);e.appendChild(u);const o=(()=>{const p=document.createElement("p"),m=document.createTextNode(" and click the buttons below to test interation");return p.appendChild(m),p})();e.appendChild(o);const n=document.createTextNode(`
      `);e.appendChild(n);const i=W({children:["count:"]});e.appendChild(i);const y=document.createTextNode(`
    `);return e.appendChild(y),e})(),document.querySelector("#root"));
