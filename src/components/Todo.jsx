import { observer } from "mobx-react-lite";
import todo from "../store/todo";

const Todo = observer(() => {
  return (
    <div>
      <button onClick={() => todo.fetchTodos()}>FETCH!</button>
      <p>{todo.tracks[0]?.title}</p>

      {todo.tracks?.map((t) => (
        <div key={t.title}>{t.title}</div>
      ))}
    </div>
  );
});

export default Todo;
