import { createEffect } from "./reactivity";

export function render(renderer, container) {
  // over-simplified render function
  insert(renderer(), container);
}

/** the basic operation to create the DOM tree
 * element could be anything, see the if/else
 *
 * One convention is that if **a function is passed, then we make it reactive**
 */
export function insert(element, container, position) {
  const type = typeof element;

  let currentPosition = null;

  if (Array.isArray(element)) {
    element.forEach((el) => insert(el, container, position));
  } else if (element == null || type === "string" || type === "number") {
    // use text node for primitive values
    // notice that we use an empty textnode even if element is null/undefined
    // this is to keep the position stable
    // Well this assumption doesn't hold I guess, but this is for demo purpose so ....
    const textNode = document.createTextNode(element);
    if (position == null) {
      container.append(textNode);
    } else {
      container.childNodes[position].replaceWith(textNode);
    }
    return container.childNodes.length - 1;
  } else if (type === "function") {
    // if a function is passed, it means that this needs to be reactive
    createEffect(() => {
      if (currentPosition == null) {
        currentPosition = insert(element(), container, position);
      } else {
        insert(element(), container, currentPosition);
      }
    });
  } else if (element instanceof HTMLElement) {
    if (position == null) {
      container.append(element);
    } else {
      container.childNodes[position].replaceWith(element);
    }
  }
}
