import { getTime } from 'date-fns';
import {taskData} from './create_project';

export {addTaskToStorage}

class NewTaskObject {
    constructor(title = 'Set your titles', parentProjectIdNum = 'not yet', description = 'fried', dueDate = 'Not set', priority = 'Standard', completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.taskId = `${title.toLowerCase().split(" ").join("-")}-${Date.now()}`;
        this.completed = completed;

        this.parentProjectIdNum = parentProjectIdNum

        this.dateTime = new Date();
        this.dateTime2 = this.dateTime.getTime();

    }
}

const addTaskToStorage = (parentIdNum, input) => {

    if (taskData.length <= 1) {
        taskData.push([]);
        taskData[1].push(new NewTaskObject(input, parentIdNum));
        localStorage.setItem("data", JSON.stringify(taskData));
    } else {
        // taskData[1] represents all of the tasks stored in local storage
        taskData[1].push(new NewTaskObject(input, parentIdNum));
        localStorage.setItem("data", JSON.stringify(taskData));
    }
}




// filtering tasks based on date can be done by creating a project item container from the project info stored in the task object