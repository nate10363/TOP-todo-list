export {acceptTaskEditBtn, editTask, dueDateInput, descriptionInput, priorityInput};
import {taskDialog, displayProjects, currentId, changeBorders} from './map_to_dom.js';
import {taskData} from './create_project.js';

const acceptTaskEditBtn = document.getElementById('accept-task-edit-btn');
const dueDateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');
const priorityInput = document.getElementById('priority-input');
const closeAccpetModalBtn = document.getElementById('close-accept-modal-btn');

const editTask = (item) => {
    
    for (let i = 0; i < taskData.length; i++) {
        for (let j = 0; j < taskData[i].projectTasks.length; j++) {
            if (`taskDiv-${taskData[i].projectTasks[j].projectId}` == item) {

                taskData[i].projectTasks[j].dueDate = dueDateInput.value;
                taskData[i].projectTasks[j].description = descriptionInput.value;
                taskData[i].projectTasks[j].priority = priorityInput.value;
                localStorage.setItem("data", JSON.stringify(taskData));
                // changeBorders();

                // document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.border = "2px solid red";

            }
        }
    }
}

const clearTaskDialog = () => {
    dueDateInput.value = '';
    descriptionInput.value = '';
    priorityInput.value = '';
}

acceptTaskEditBtn.addEventListener('click', () => {
    editTask(currentId);
    clearTaskDialog();
    taskDialog.close();
    displayProjects();
    // 
    // Borders();
})

closeAccpetModalBtn.addEventListener('click', () => {
    clearTaskDialog();
    taskDialog.close();
})