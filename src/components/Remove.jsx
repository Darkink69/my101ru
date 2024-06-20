import removeCount from "../store/removeCount";
import { observer } from "mobx-react-lite";

const Remove = observer(() => {
  return (
    <div>
      {/* <p>{"count = " + counter.count}</p> */}
      <button onClick={() => removeCount.one()}>КНОПКА</button>
    </div>
  );
});

export default Remove;
