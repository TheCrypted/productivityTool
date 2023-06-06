import {useRef} from "react";
export function TaskSection({iterable, setIterable, todos}) {
	function calcDate(date){
		return (parseInt(date[0]) - dateToday.getDate()) + (parseInt(date[1]) - dateToday.getMonth() - 1)*30
	}

	function dateSplit(date){
		console.log(date)
		return date.split("-").reverse();
	}
	let dateToday = new Date()

	let maxDif = useRef(3)

	function doneActivity(todo) {
		setIterable(todos.filter((todoC)=>todoC !== todo))
	}
	return ( <>
			{iterable.map((todo) => {
				let color = "rgba(" + (255 - todo.priority * 55) + ", 50," + todo.priority * 30 + ")"
				let date = dateSplit(todo.date)
				let dateCode = calcDate(date);
				if (dateCode > maxDif.current) {
					maxDif.current = dateCode
				}
				let rgb = "rgb(" + Math.floor(255 - (dateCode / maxDif.current * 255)) + ", 80, 80)"
				return (
					<div className="todoItem" key={todo.id}>
						<div className="priorityBar" style={{backgroundColor: color}}></div>
						<li>
							{todo.text}
						</li>
						<div className="date">
							<div>Complete by:</div>
							<div id="dateAc" style={{backgroundColor: rgb}}>{
								date.join("-")
							}
							</div>
						</div>
						<button onClick={() => doneActivity(todo)}>Mark Done</button>
					</div>
				)
			})}
		</>
		)
}

