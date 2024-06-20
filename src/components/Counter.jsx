import counter from "../store/counter";
import { observer } from "mobx-react-lite";

const Counter = observer(() => {
  return (
    <div>
      <p>{"count = " + counter.count}</p>
      <button onClick={() => counter.increment()}>+</button>
      <button onClick={() => counter.decrement()}>-</button>
    </div>
  );
});

export default Counter;
