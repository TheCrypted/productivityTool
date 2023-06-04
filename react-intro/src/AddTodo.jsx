import {useState} from "react";

export function AddTodo({onAddText}) {
	const [newT, setNewT] = useState("")
	return (
		<>
			<form className="topBar">
				<input className="inputBar" onChange={(e) =>{
					setNewT(e.target.value)
				}
				}/>
				<button type="submit" onClick={(e) => {
					e.preventDefault()
					onAddText(newT)
				}}>ADD</button>
			</form>
		</>
	)
}