import {useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {AddTodo} from "./AddTodo.jsx";

function App() {
    const todosAlpha = [
        {
            id: 1,
            text: 'Learn React',
            completed: true
        }, {
            id: 2,
            text: 'Learn Redux',
            completed: true
        }, {
            id: 3,
            text: 'Learn Node',
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
                    return (
                        <div className="todoItem" key={todo.id}>
                            <li>
                                {todo.text}
                            </li>
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
