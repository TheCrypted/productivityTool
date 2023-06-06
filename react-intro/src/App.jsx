import {useEffect, useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {AddTodo} from "./AddTodo.jsx";
import {Sidebar} from "./Sidebar.jsx";
import {TaskSection} from "./TaskSection.jsx";



function App() {
    let maxDif = useRef(3)
    const todosAlpha = [
        {
            id: 1,
            text: 'Learn React',
            date: "2023-06-6",
            priority: 1,
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
            priority: 3,
            completed: false
        }
    ]

    let [todos, setTodos] = useState(todosAlpha)
    let [modeAlpha, setModeAlpha] = useState(0)
    let count = useRef(todosAlpha.length)
    let dateToday = new Date()
    let thisDay = todos.filter((todo) => calcDate(dateSplit(todo.date)) <= 1);
    let thisMonth = todos.filter((todo) => calcDate(dateSplit(todo.date)) > 1 && calcDate(dateSplit(todo.date)) <= 30);
    let remainingTasks = todos.filter((todo) => calcDate(dateSplit(todo.date)) > 30)

    useEffect(() => {
        thisDay = todos.filter((todo) => calcDate(dateSplit(todo.date)) <= 1);
        thisMonth = todos.filter((todo) => calcDate(dateSplit(todo.date)) > 1 && calcDate(dateSplit(todo.date)) <= 30);
        remainingTasks = todos.filter((todo) => calcDate(dateSplit(todo.date)) > 30)
    }, [todos])

    function doneActivity(todo) {
        setTodos(todos.filter((todoC)=>todoC !== todo))
    }
    function calcDate(date){
        return (parseInt(date[0]) - dateToday.getDate()) + (parseInt(date[1]) - dateToday.getMonth() - 1)*30
    }

    function sortTodo(todos) { //bubble sort T_T
        const length = todos.length;
        for (let i = 0; i < length - 1; i++) {
            for (let j = 0; j < length - i - 1; j++) {
                if (todos[j].priority > todos[j + 1].priority) {
                    // Swap the elements
                    const temp = todos[j].priority;
                    todos[j].priority = todos[j + 1].priority;
                    todos[j + 1].priority = temp;
                }
            }
        }
        return todos;
    }
    function dateSplit(date){
        return date.split("-").reverse();
    }
    function switchMode(){
        setModeAlpha(0)
    }
    function switchModeTwo(){
        setModeAlpha(1)
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

    let sortedTodos = sortTodo(todos)

    return (
        <>
        <AddTodo onAddText={addTodo} />
        <div className="mainContent">
            <div>
                <Sidebar switchMode={switchMode} switchModeTwo={switchModeTwo}/>
            </div>
            { (modeAlpha === 0) &&
            <div className="taskList">
                <ul>
                    <h2>Tasks for Today:</h2>
                    <TaskSection iterable={thisDay} setIterable={setTodos} todos={todos}/>
                </ul>
                    <ul>
                    <h2>Tasks for this Month:</h2>
                    <TaskSection iterable={thisMonth} setIterable={setTodos} todos={todos} />
                    </ul>
                    <ul>
                    <h2>Remaining tasks:</h2>
                    <TaskSection iterable={remainingTasks} setIterable={setTodos} todos={todos} />
                    </ul>
                    <ul>
                    <h2>All tasks:</h2>
                    <TaskSection iterable={todos} setIterable={setTodos} todos={todos} />
                    </ul>
            </div>
            }
            { (modeAlpha === 1) &&
                <div className="taskList">
                    <ul>
                        <h2>Tasks by Priority:</h2>
                        <TaskSection iterable={sortedTodos} setIterable={setTodos} todos={todos}/>
                    </ul>
                </div>
            }
        </div>
        </>
    )
}

export default App