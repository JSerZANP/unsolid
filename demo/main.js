import { render } from "../lib/dom";
import { createSignal } from "../lib/reactivity";

function Counter({ children }) {
  const [count, setCount] = createSignal(1);
  const [count2, setCount2] = createSignal(2);
  const [count3, setCount3] = createSignal(3);

  const increment = () => setCount(count() + 1);
  const increment2 = () => setCount2(count2() + 1);
  const increment3 = () => setCount3(count3() + 1);

  return (
    <div>
      <p>
        increment by 1:{" "}
        <button onClick={increment}>
          {children}
          {count()}
        </button>
      </p>
      <p>
        increment by 2:
        <button onClick={increment2}>
          {children}
          {count2() * 2}
        </button>
      </p>
      <p>
        render bold text if even:{" "}
        <button onClick={increment3}>
          {children}
          {count3() + " -"}
          {count3() % 2 === 0 ? <b>even</b> : "odd"}
        </button>
      </p>
    </div>
  );
}

render(
  () => (
    <div>
      <p>`npm run compile` to build the JSX(/src/main.js → /dist/main.js)</p>
      <p> and click the buttons below to test interation</p>
      <Counter>count:</Counter>
    </div>
  ),
  document.querySelector("#root")
);
