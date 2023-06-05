import {useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {AddTodo} from "./AddTodo.jsx";

function App() {
    let maxDif = useRef(3)
    const todosAlpha = [
        {
            id: 1,
            text: 'Learn React',
            date: "2023-06-6",
            priority: 3,
            completed: true
        }, {
            id: 2,
            text: 'Learn Redux',
            date: "2023-06-9",
            priority: 2,
            completed: true
        }, {
            id: 3,
            text: 'Learn Node',
            date: "2023-06-9",
            priority: 1,
            completed: false
        }
    ]

    let [todos, setTodos] = useState(todosAlpha)
    let count = useRef(todosAlpha.length)
    let dateToday = new Date()

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
        <div className="mainContent">
            <div></div>
            <ul>
                {todos.map((todo) => {
                    let color = "rgba(" + (255- todo.priority*55) + ", 50," + todo.priority*30 + ")"
                    let date = todo.date.split("-").reverse();
                    let dateCode = (parseInt(date[0]) - dateToday.getDate()) + (parseInt(date[1]) - dateToday.getMonth())*30;
                    if (dateCode > maxDif.current) {
                        maxDif.current = dateCode
                    }
                    let rgb = "rgb("+ Math.floor(255 - (dateCode/maxDif.current * 255)) +", 80, 80)"
                    console.log(dateCode)
                    return (
                        <div className="todoItem" key={todo.id}>
                            <div className="priorityBar" style={{ backgroundColor: color }}></div>
                            <li>
                                {todo.text}
                            </li>
                            <div className="date">
                                <div>Complete by:</div>
                                <div id="dateAc" style={{ backgroundColor: rgb }}>{
                                    date.join("-")
                                }
                                </div>
                            </div>
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
