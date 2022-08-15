import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

interface ITodo {
  idx: number;
  title: String;
  content: string;
  createUser: String;
  createDate: Date;
}

interface ITodoDel {
  idx: number;
}

const App = () => {
  /**
   * 숙제1 css ui/ux 보기좋게 변경
   * 숙제2 추가 수정 모두 모달팝업에서 이루어 지게끔 변경
   * 추가일경우 데이터 모두없는 input 태그
   * 수정일경우 데이터가 입력되어있는 input 태그로 구성
   * - 컴포넌트 활용까지 하면 금상천화
   */
  const [todoData, setTodoData] = useState<ITodo[]>([]);

  const [todoAddText, setTodoAddText] = useState<ITodo>({
    idx: 0,
    title: "",
    content: "",
    createUser: "",
    createDate: new Date(),
  });

  /* Todo List 조회 */
  const getTodoList = async () => {
    //async await 방식 - 보통 리액트 프로젝트 이걸로 많이씀
    const res = await axios.get("http://3.35.218.236/api/todo");

    if (res.status === 200) {
      setTodoData(res.data.data);
    }

    //Promise 방식
    /* 
    axios
      .get("http://3.35.218.236/api/todo")
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          setTodoData(res.data.data);
        }
      })
      .catch((e) => {});
      */
  };

  /* Todo List 추가 */
  const handleTodoAdd = () => {
    /* 유효성체크 */
    if (!validationChk()) {
      return;
    }

    axios
      .post("http://3.35.218.236/api/todo", todoAddText)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          window.alert("추가되었습니다.");
          getTodoList();
        }
      })
      .catch((e) => {});
  };

  /* 유효성 체크 */
  const validationChk = () => {
    if (todoAddText.title === "") {
      window.alert("title 을 입력해주세요.");
      return false;
    }

    if (todoAddText.content === "") {
      window.alert("content 을 입력해주세요.");
      return false;
    }

    if (todoAddText.createUser === "") {
      window.alert("createUser 을 입력해주세요.");
      return false;
    }

    return true;
  };

  /* Todo List 삭제 */
  const handleDelete = (idx: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      const data: ITodoDel = {
        idx: idx,
      };

      axios
        .delete("http://3.35.218.236/api/todo", {
          data: data,
        })
        .then((res) => {
          if (res.status === 200) {
            window.alert("삭제되었습니다.");
            getTodoList();
          }
        })
        .catch((e) => {});
    }
  };

  /* Todo List 모두 삭제 */
  const handleAllDelete = () => {
    if (window.confirm("정말정말정정말 삭제하시겠습니까?")) {
      axios
        .delete("http://3.35.218.236/api/todo/all")
        .then((res) => {
          if (res.status === 200) {
            alert("정말정말삭제되었스빈다");
            getTodoList();
          }
        })
        .catch((e) => {});
    }
  };

  /* 화면 로드 후 리스트 조회 */
  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className="wrap">
      <div className="todo_wrap">
        <h1>ToDo list만들기</h1>
        <div className="todo_box">
          <div className="todo_item_add_box">
            <div>
              <label>title</label>
              <input
                type="text"
                onChange={(e) => {
                  setTodoAddText((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label>content</label>
              <input
                type="text"
                onChange={(e) =>
                  setTodoAddText((prevState) => ({
                    ...prevState,
                    content: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>userName</label>
              <input
                type="text"
                onChange={(e) =>
                  setTodoAddText((prevState) => ({
                    ...prevState,
                    createUser: e.target.value,
                  }))
                }
              />
            </div>
            <button onClick={handleTodoAdd}>+</button>
            <button onClick={handleAllDelete}>모두삭제</button>
          </div>
          {todoData.length !== 0 ? (
            todoData.map((item, index) => (
              <div className="todo_item" key={index}>
                <span>{item.title}</span>
                <button onClick={() => handleDelete(item.idx)}>X</button>
              </div>
            ))
          ) : (
            <div>Todo 아이템이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
