import {useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {AddTodo} from "./AddTodo.jsx";

function App() {
    const todosAlpha = [
        {
            id: 1,
            text: 'Learn React',
            date: "06-06-2023",
            priority: 3,
            completed: true
        }, {
            id: 2,
            text: 'Learn Redux',
            date: "06-06-2023",
            priority: 2,
            completed: true
        }, {
            id: 3,
            text: 'Learn Node',
            date: "06-06-2023",
            priority: 1,
            completed: false
        }
    ]

    let [todos, setTodos] = useState(todosAlpha)
    let count = useRef(todosAlpha.length)

    function doneActivity(todo) {
        setTodos(todos.filter((todoC)=>todoC !== todo))
    }

    function addTodo(newT) {
        count.current ++;
        setTodos([...todos, {
            id: count.current + 1,
            text: newT.text,
            date: newT.date,
            priority: newT.priority,
            completed: false
        }])
    }

    return (
        <>
        <AddTodo onAddText={addTodo} />
        <div>
            <ul>
                {todos.map((todo) => {
                    let color = "rgba(" + (255- todo.priority*55) + ", 50," + todo.priority*30 + ")"
                    return (
                        <div className="todoItem" key={todo.id}>
                            <div className="priorityBar" style={{ backgroundColor: color }}></div>
                            <li>
                                {todo.text}
                            </li>
                            <div className="date">{todo.date.split("/").join("-")}</div>
                            <button onClick={() => doneActivity(todo)}>Mark Done</button>
                        </div>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

export default App
