import {taskData} from './create_project.js';

export {displayTaskInfo, taskDialog};

const taskDialog = document.getElementById('task-dialog');
const dueDateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');
const priorityInput = document.getElementById('priority-input');

let taskObjSelector;

const displayTaskInfo = (elementTaskId, taskDuedateParent) => {
    for (let i = 0; i < taskData[1].length; i++) {
        if (taskData[1][i].taskId == elementTaskId) {

            let taskParentContainer = document.getElementById(`soloTaskContainer-${taskData[1][i].taskId}`);

            const taskInfoContainer = document.createElement('div');
            taskInfoContainer.classList.add('taskInfoContainer');
            taskInfoContainer.setAttribute('id', `taskInfoContainer-${taskData[1][i].taskId}`);

            const taskInfoInfoContainer = document.createElement('div');
            taskInfoInfoContainer.classList.add('taskInfoInfoContainer');

            const editTaskBtn = document.createElement('button');
            editTaskBtn.classList.add('editTaskBtn');
            editTaskBtn.textContent = 'Edit';
            editTaskBtn.onclick = function() {
                taskDialog.showModal();
                taskObjSelector = taskData[1][i].taskId;

                dueDateInput.value = taskData[1][i].dueDate;
                descriptionInput.value = taskData[1][i].description;
                priorityInput.value = taskData[1][i].priority;

                // console.log(document.getElementById(`soloTaskContainer-${taskData[1][i].taskId}`))
                // document.getElementById(`soloTaskContainer-${taskData[1][i].taskId}`).style.borderBottom = 
                //     taskData[1][i].priority == 'Low' ? 'green' : 'red';

            }

            const taskInfoDuedateLabel = document.createElement('div');
            taskInfoDuedateLabel.classList.add('taskInfoDuedateLabel');
            taskInfoDuedateLabel.textContent = 'Due Date: ';
            const taskInfoDuedate = document.createElement('div');
            taskInfoDuedate.classList.add('taskInfoDuedate');
            taskInfoDuedate.textContent = taskData[1][i].dueDate;

            const taskInfoPriorityLabel = document.createElement('div');
            taskInfoPriorityLabel.classList.add('taskInfoPriorityLabel');
            taskInfoPriorityLabel.textContent = 'Priority: ';
            const taskInfoPriority = document.createElement('div');
            taskInfoPriority.classList.add('taskInfoPriority');
            taskInfoPriority.textContent = taskData[1][i].priority;

            const taskInfoDescriptionLabel = document.createElement('div');
            taskInfoDescriptionLabel.classList.add('taskInfoDescriptionLabel');
            taskInfoDescriptionLabel.textContent = 'Description: ';
            const taskInfoDescription = document.createElement('div');
            taskInfoDescription.classList.add('taskInfoDescription');
            taskInfoDescription.textContent = taskData[1][i].description;

            const deleteTaskBtn = document.createElement('button');
            deleteTaskBtn.classList.add('deleteTaskBtn');
            deleteTaskBtn.textContent = 'Delete Task';
            deleteTaskBtn.onclick = function() {

                for (let k = 0; k < taskData[1].length; k++) {
                    if (taskData[1][k].taskId == taskData[1][i].taskId) {
                        taskData[1].splice(k, 1);
                        localStorage.setItem("data", JSON.stringify(taskData));
                    }
                }
                // remove entire soloTaskContainer
                this.parentElement.parentElement.parentElement.remove();

            }

            taskParentContainer.appendChild(taskInfoContainer);

            taskInfoContainer.appendChild(taskInfoInfoContainer);
            taskInfoContainer.appendChild(editTaskBtn)

            taskInfoInfoContainer.appendChild(taskInfoDuedateLabel);
            taskInfoInfoContainer.appendChild(taskInfoDuedate);
            taskInfoInfoContainer.appendChild(taskInfoPriorityLabel);
            taskInfoInfoContainer.appendChild(taskInfoPriority);
            taskInfoInfoContainer.appendChild(taskInfoDescriptionLabel);
            taskInfoInfoContainer.appendChild(taskInfoDescription);
            taskInfoInfoContainer.appendChild(deleteTaskBtn);
            

            const closeAccpetModalBtn = document.getElementById('close-accept-modal-btn');
            closeAccpetModalBtn.onclick = function() {
                taskDialog.close();
            }

            const acceptAccpetModalBtn = document.getElementById('accept-task-edit-btn');
            acceptAccpetModalBtn.onclick = function() {

                for (let i = 0; i < taskData[1].length; i++) {
                    if (taskData[1][i].taskId == taskObjSelector) {
                        taskData[1][i].dueDate = dueDateInput.value;
                        taskData[1][i].priority = priorityInput.value;
                        taskData[1][i].description = descriptionInput.value;

                        taskInfoDuedate.textContent = taskData[1][i].dueDate;
                        taskInfoPriority.textContent = taskData[1][i].priority;
                        taskInfoDescription.textContent = taskData[1][i].description;

                        taskDuedateParent.textContent = taskData[1][i].dueDate;

                        // console.log(document.getElementById(`soloTaskContainer-${taskData[1][i].taskId}`))
                        document.getElementById(`soloTaskContainer-${taskData[1][i].taskId}`).style.borderBottom = 
                            taskData[1][i].priority == 'Low' ? '5px solid green' : 
                            taskData[1][i].priority == 'Medium' ? '5px solid yellow' : 
                            taskData[1][i].priority == 'High' ? '5px solid red' : 
                                '5px solid gray';
                        
                        localStorage.setItem("data", JSON.stringify(taskData));
                    }
                }

                taskDialog.close();

            }

        }
    }
}