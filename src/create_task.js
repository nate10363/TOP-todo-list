import {taskData} from './create_project';

export {addTask}

class Task {
    constructor(title = 'Set your titles', description = 'fried', dueDate = 'Due Date', priority = 'Standard', completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = `${title.toLowerCase().split(" ").join("-")}-${Date.now()}`;
        this.completed = completed;
    }
}

const addTask = (buttonEl, input) => {

    for (let i = 0; i < taskData.length; i++) {
        if (taskData[i].projectIdNum == buttonEl) {
            taskData[i].projectTasks.push(new Task(input));
            localStorage.setItem("data", JSON.stringify(taskData));
        }
    }

}