import {addTask} from "../../../../actions/tasks"

export default function taskAddPage(){
    return (
        <form action={addTask}>
            <input type="text" placeholder="task title" name="title" />         <br /> <br />
            <button> Add </button>
        </form>
    )
}

