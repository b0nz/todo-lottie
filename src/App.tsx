import * as React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import Lottie from "react-lottie";
import animationData from "./433-checked-done.json";

interface Todo {
  id: number;
  value: string;
}

const App: React.FC = () => {
  const [todo, setTodo] = React.useState<Todo[]>([]);
  const [successConfirmation, setSuccessConfirmation] = React.useState<boolean>(
    false
  );

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      setTodo([
        ...todo,
        { id: Math.random(), value: e.target.todo_input.value },
      ]);
      setSuccessConfirmation(!successConfirmation);
      const myForm = document.getElementById("todo_form") as HTMLFormElement;
      myForm.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (idTodo: number) => {
    setTodo(todo.filter((f) => f.id !== idTodo));
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto p-4">
        <div>
          <form id="todo_form" className="flex mb-5" onSubmit={handleSubmit}>
            <input
              name="todo_input"
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full md:w-1/4 appearance-none leading-normal mr-3"
              type="text"
              placeholder="Input todo"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </form>
        </div>
        <hr />
        <div className="mt-3">
          <label>Todo List :</label>
          {todo &&
            todo.map((item) => {
              return (
                <div
                  className="w-full rounded overflow-hidden shadow-lg my-3 bg-white"
                  key={item.id}
                >
                  <div className="flex px-6 py-4 justify-between">
                    <p className="font-bold text-xl">{item.value}</p>
                    <button
                      className="text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <SweetAlert
          title=""
          show={successConfirmation}
          onConfirm={() => setSuccessConfirmation(!successConfirmation)}
          customButtons={
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setSuccessConfirmation(!successConfirmation)}
            >
              Okay
            </button>
          }
        >
          <div className="-mt-20 mb-1">
            <Lottie options={defaultOptions} width={300} />
            <h1 className="-mt-20 font-bold text-xl">SUCCESS</h1>
          </div>
        </SweetAlert>
      </div>
    </div>
  );
};

export default App;
