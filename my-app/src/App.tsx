import React, { useRef, useState } from "react";
import "./App.css";

interface ITodo {
  id: any;
  text: string;
  checked: boolean;
}

const App = () => {
  const [todoData, setTodoData] = useState<ITodo[]>([
    {
      id: 1,
      text: "공부하기",
      checked: true,
    },
    {
      id: 2,
      text: "밥먹기",
      checked: true,
    },
    {
      id: 3,
      text: "쉬기",
      checked: false,
    },
    {
      id: 4,
      text: "쉬",
      checked: false,
    },
    {
      id: 5,
      text: "쉬",
      checked: false,
    },
  ]);

  const nextId = useRef<number>(6)

  const [todoAddText, setTodoAddText] = useState<string>("");

  const handleTodoAdd = () => {
    const body = {
      id: nextId,
      text : todoAddText,
      checked : false
    }

    setTodoData([...todoData , body])
    nextId.current += 1;
    // let copyTodoData = [...todoData];

    // copyTodoData.push({
    //   id: copyTodoData.length + 2,
    //   text: todoAddText,
    //   checked: false,
    // });

    // setTodoData(copyTodoData);
  };

  const handleTodoClear = () => {};

  const handleDelete = (id: number) => {
    setTodoData(todoData.filter((data) => data.id !== id));
  };

  return (
    <div className="wrap">
      <div className="todo_wrap">
        <h1>ToDo list만들기</h1>
        <div className="todo_box">
          <div className="todo_item_add_box">
            <input
              type="text"
              onChange={(e) => setTodoAddText(e.target.value)}
            />
            <button onClick={handleTodoAdd}>+</button>
          </div>
          {todoData.map((item, index) => (
            <div className="todo_item" key={index}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => {
                  let copyTodoData = [...todoData];
                  copyTodoData[index].checked = e.target.checked;

                  setTodoData(copyTodoData);
                }}
              />
              <span>{item.text}</span>
              <button onClick={() => handleDelete(item.id)}>X</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;
