import generator from "@babel/generator";
import { parse } from "@babel/parser";
import template from "@babel/template";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import fs from "fs";

const tplIIFE = template.default(`
  (() => {
    %%body%%
  })()
`);

const tplCreateChild = template.default(`
  const %%identifier%% = %%child%%;
`);

const tplCreateNode = template.default(`
  const node = document.createElement(%%tagName%%);
  %%children%%;
  return node;
`);

const tplInsertExpression = template.default(`
  insert(() => %%expression%%, node);
`);

const tplCreateCustomElement = template.default(`
  %%node%%(%%props%%)
`);

const tplAppendChild = template.default(`
  node.appendChild(%%child%%);
`);

const tplCreateTextNode = template.default(`
  const %%identifier%%  = document.createTextNode(%%expression%%);
`);

const tplSetUpAttribute = template.default(`
  node[%%name%%] = %%expression%%
`);

// Our goal is to transform JSX into function calls
// in which special function call `insert()` is automatically inserted
// so that the JSXExpression like `{count()}` could be reactive.
const transformJSXElement = (element) => {
  const tagName = element.openingElement.name.name;
  // for intrinsic elements we can just create DOM nodes
  // but for custom components we need to run it first to know what it is
  // so we handle them differently
  if (tagName[0].toLowerCase() === tagName[0]) {
    return transformJSXIntrinsicElement(element);
  } else {
    return transformJSXCustomElement(element);
  }
};

// for custom components
// we return something similar to the default JSX internals in React
// e.g. <T>...</T> => T({children:...})
const transformJSXCustomElement = (element) => {
  const tagName = element.openingElement.name.name;
  const attributes = element.openingElement.attributes ?? [];
  const children = element.children != null ? [...element.children] : [];
  // since this is custom component we don't know how to create DOM nodes
  // so just recursively transform the children and keep the rest untouched
  const transformedChildren = children.flatMap((child) => {
    // for JSXElement, transform and append
    if (child.type === "JSXElement") {
      const expression = transformJSXElement(child).expression;
      return [expression];
    } else if (child.type === "JSXExpressionContainer") {
      return [child.expression];
    } else if (child.type === "JSXText") {
      return [t.stringLiteral(child.value)];
    } else {
      throw new Error("TODO: unsupported jsx children type:" + child.type);
    }
  });

  return tplCreateCustomElement({
    node: t.identifier(tagName),
    props: t.objectExpression([
      ...attributes.map((attribute) =>
        t.objectProperty(
          t.stringLiteral(attribute.name.name),
          attribute.value.expression
        )
      ),
      t.objectProperty(
        t.stringLiteral("children"),
        t.arrayExpression(transformedChildren)
      ),
    ]),
  });
};

// for intrinsic elements, we just create the DOM node
// use `insert()` for expression
// <p><button>{count()}</button></p>
// ↓
// (() => {
//  const node = document.createElement('p')
//  const node1 = (() => {
//     const node = document.createElement('button')
//     insert(() => count(), node)
//     return node
//  })()
//  node.appendChild(node1)
//  return node
// })()
const transformJSXIntrinsicElement = (element) => {
  let nodeCount = 0;

  const tagName = element.openingElement.name.name;
  // children could be string, or some other jsxlement
  const children = element.children != null ? [...element.children] : [];
  const transformedChildren = children.flatMap((child) => {
    nodeCount += 1;
    if (child.type === "JSXElement") {
      const expression = transformJSXElement(child).expression;
      const createChild = tplCreateChild({
        identifier: `node${nodeCount}`,
        child: expression,
      });
      const appendChild = tplAppendChild({
        child: t.identifier(`node${nodeCount}`),
      });
      return [createChild, appendChild];
    } else if (child.type === "JSXExpressionContainer") {
      return [
        tplInsertExpression({
          expression: child.expression,
        }),
      ];
    } else if (child.type === "JSXText") {
      return [
        tplCreateTextNode({
          identifier: `node${nodeCount}`,
          expression: t.stringLiteral(child.value),
        }),
        tplAppendChild({
          child: t.identifier(`node${nodeCount}`),
        }),
      ];
    } else {
      throw new Error("TODO: unsupported jsx children type: " + child.type);
    }
  });

  // attributes set up
  const attributes = element.openingElement.attributes ?? [];
  const updateAttributes = attributes.map((attribute) =>
    tplSetUpAttribute({
      name: t.stringLiteral(attribute.name.name.toLowerCase()),
      expression: attribute.value.expression ?? attribute.value,
    })
  );
  return tplIIFE({
    body: tplCreateNode({
      tagName: t.stringLiteral(tagName),
      children: [...updateAttributes, ...transformedChildren],
    }),
  });
};

function compile(code) {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  traverse.default(ast, {
    JSXElement: function (path) {
      path.replaceWith(transformJSXElement(path.node));
    },
  });

  const imports = `
import { insert } from '../lib/dom';
  `;
  return imports + generator.default(ast).code;
}

function readFiles() {
  return new Promise((resolve) => {
    fs.readdir("./demo", (err, files) => {
      resolve(files);
    });
  });
}

async function start() {
  const files = await readFiles();
  for (const file of files) {
    const code = fs.readFileSync("demo/" + file, "utf8");
    fs.writeFileSync("built/" + file, compile(code));
  }
}

start();
