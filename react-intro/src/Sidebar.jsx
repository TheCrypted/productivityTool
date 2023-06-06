export function Sidebar({switchMode, switchModeTwo}) {
	return (
		<div className="sidebar">
			<h2>Filter by:</h2>
			<div className="filtersDiv">
				<div onClick={() => {
					// console.log(mode.current)
					switchMode()
				}}>Deadline</div>
				<div onClick={() => {
					// console.log(mode.current)
					switchModeTwo()
				}}>Priority</div>
				<div>Custom</div>
			</div>
		</div>
	)
}