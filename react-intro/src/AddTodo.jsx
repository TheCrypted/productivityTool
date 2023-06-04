import {useEffect, useRef, useState} from "react";

export function AddTodo({onAddText}) {
	const [newT, setNewT] = useState({
		text: "",
		priority: 0,
		date: "1/1/2014",
	})
	// let [text, setText] = useState("");
	// let [priority, setPriority] = useState(0);
	// let [date, setDate] = useState("");
	let priority = useRef(0)
	let date = useRef("")
	let text = useRef("")
	useEffect(()=>{
		setNewT({
			text: text.current,
			priority: priority.current,
			date: date.current
		})
		console.log(newT.text)
	}, [text.current, date.current, priority.current])
	return (
		<>
			<form className="topBar">
				<input className="inputBar" onChange={(e) =>{
					// text = e.target.value;
					text.current = e.target.value
					// console.log(text.current)
				}
				}/>
				<label>Priority</label>
				<select onChange={(e) => {
					priority.current = (parseInt(e.target.value));
                    // setNewT(e.target.value)
				}
				}>
					<option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
				</select>
				<input className="dateInput" type="date" onChange={(e)=>{
					date.current = (e.target.value);
				}
				} />
				<button type="submit" onClick={(e) => {
					e.preventDefault()
					onAddText(newT)
				}}>ADD</button>
			</form>
		</>
	)
}