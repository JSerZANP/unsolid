
import { insert } from '../lib/dom';
  import { render } from "../lib/dom";
import { createSignal } from "../lib/reactivity";
function Counter({
  children
}) {
  const [count, setCount] = createSignal(1);
  const [count2, setCount2] = createSignal(2);
  const [count3, setCount3] = createSignal(3);
  const increment = () => setCount(count() + 1);
  const increment2 = () => setCount2(count2() + 1);
  const increment3 = () => setCount3(count3() + 1);
  return (() => {
    const node = document.createElement("div");
    const node1 = document.createTextNode("\n      ");
    node.appendChild(node1);
    const node2 = (() => {
      const node = document.createElement("p");
      const node1 = document.createTextNode("\n        increment by 1:");
      node.appendChild(node1);
      insert(() => " ", node);
      const node3 = document.createTextNode("\n        ");
      node.appendChild(node3);
      const node4 = (() => {
        const node = document.createElement("button");
        node["onclick"] = increment;
        const node1 = document.createTextNode("\n          ");
        node.appendChild(node1);
        insert(() => children, node);
        const node3 = document.createTextNode("\n          ");
        node.appendChild(node3);
        insert(() => count(), node);
        const node5 = document.createTextNode("\n        ");
        node.appendChild(node5);
        return node;
      })();
      node.appendChild(node4);
      const node5 = document.createTextNode("\n      ");
      node.appendChild(node5);
      return node;
    })();
    node.appendChild(node2);
    const node3 = document.createTextNode("\n      ");
    node.appendChild(node3);
    const node4 = (() => {
      const node = document.createElement("p");
      const node1 = document.createTextNode("\n        increment by 2:\n        ");
      node.appendChild(node1);
      const node2 = (() => {
        const node = document.createElement("button");
        node["onclick"] = increment2;
        const node1 = document.createTextNode("\n          ");
        node.appendChild(node1);
        insert(() => children, node);
        const node3 = document.createTextNode("\n          ");
        node.appendChild(node3);
        insert(() => count2() * 2, node);
        const node5 = document.createTextNode("\n        ");
        node.appendChild(node5);
        return node;
      })();
      node.appendChild(node2);
      const node3 = document.createTextNode("\n      ");
      node.appendChild(node3);
      return node;
    })();
    node.appendChild(node4);
    const node5 = document.createTextNode("\n      ");
    node.appendChild(node5);
    const node6 = (() => {
      const node = document.createElement("p");
      const node1 = document.createTextNode("\n        render bold text if even:");
      node.appendChild(node1);
      insert(() => " ", node);
      const node3 = document.createTextNode("\n        ");
      node.appendChild(node3);
      const node4 = (() => {
        const node = document.createElement("button");
        node["onclick"] = increment3;
        const node1 = document.createTextNode("\n          ");
        node.appendChild(node1);
        insert(() => children, node);
        const node3 = document.createTextNode("\n          ");
        node.appendChild(node3);
        insert(() => count3() + " -", node);
        const node5 = document.createTextNode("\n          ");
        node.appendChild(node5);
        insert(() => count3() % 2 === 0 ? (() => {
          const node = document.createElement("b");
          const node1 = document.createTextNode("even");
          node.appendChild(node1);
          return node;
        })() : "odd", node);
        const node7 = document.createTextNode("\n        ");
        node.appendChild(node7);
        return node;
      })();
      node.appendChild(node4);
      const node5 = document.createTextNode("\n      ");
      node.appendChild(node5);
      return node;
    })();
    node.appendChild(node6);
    const node7 = document.createTextNode("\n    ");
    node.appendChild(node7);
    return node;
  })();
}
render(() => (() => {
  const node = document.createElement("div");
  const node1 = document.createTextNode("\n      ");
  node.appendChild(node1);
  const node2 = (() => {
    const node = document.createElement("p");
    const node1 = document.createTextNode("`npm run compile` to build the JSX(/src/main.js \u2192 /dist/main.js)");
    node.appendChild(node1);
    return node;
  })();
  node.appendChild(node2);
  const node3 = document.createTextNode("\n      ");
  node.appendChild(node3);
  const node4 = (() => {
    const node = document.createElement("p");
    const node1 = document.createTextNode(" and click the buttons below to test interation");
    node.appendChild(node1);
    return node;
  })();
  node.appendChild(node4);
  const node5 = document.createTextNode("\n      ");
  node.appendChild(node5);
  const node6 = Counter({
    "children": ["count:"]
  });
  node.appendChild(node6);
  const node7 = document.createTextNode("\n    ");
  node.appendChild(node7);
  return node;
})(), document.querySelector("#root"));