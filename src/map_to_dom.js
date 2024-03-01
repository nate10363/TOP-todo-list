import {taskData} from './create_project';
import {addTask} from './create_task';
import {deleteProject} from './delete_project.js';
import {deleteTask} from './delete_task.js';
import {displayTaskInfo, hideTaskInfo} from './view_task_info.js';
import {acceptTaskEditBtn, editTask, dueDateInput, descriptionInput, priorityInput} from './edit_task';
import {markTaskComplete, updateTaskCompletedColor} from './mark_task_complete.js';

export { displayProjects, displayProjectsNavbar, createProjects, taskDialog, currentId }

const projectListContainer = document.getElementById('project-list-container');
const itemsContainer = document.getElementById('items-container');
const taskDialog = document.getElementById('task-dialog');

let currentId = '';


const displayProjectsNavbar = () => taskData.map((el) => {
    
    const navItem = document.createElement('div');
    navItem.classList.add('nav-item');
    const projNavItem = document.createElement('div');
    projNavItem.classList.add('proj-nav-item');
    projNavItem.onclick = function() {
        console.log('projNavItem');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-project-btn');

    projectListContainer.appendChild(navItem);
    navItem.appendChild(projNavItem);
    navItem.appendChild(deleteBtn);

    projNavItem.textContent = el.projectName;
    deleteBtn.textContent = 'Delete';

    deleteBtn.onclick = function() {
        deleteProject(el.projectIdNum, this);
    }
});

const createProjects = () => taskData.map((el) => {

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-item');
    projectDiv.setAttribute('id', el.projectIdNum);
    const h2 = document.createElement('h2');
    h2.classList.add('project-header');

    const tasksDiv = document.createElement('div');
    tasksDiv.classList.add('tasks-div');
    tasksDiv.setAttribute('id', `tasks-div-${el.projectIdNum}`);
    const taskInput = document.createElement('input');
    const taskBtn = document.createElement('button');

    itemsContainer.appendChild(projectDiv);
    projectDiv.appendChild(h2);
    projectDiv.appendChild(tasksDiv);
    projectDiv.appendChild(taskInput);
    projectDiv.appendChild(taskBtn);

    h2.textContent = el.projectName;
    taskInput.placeholder = 'New task'
    taskBtn.textContent = 'Add task';
    taskBtn.onclick = function() {
        addTask(projectDiv.id, taskInput.value);
        taskInput.value = '';
        tasksDiv.innerHTML = '';
        displayTasks();
    };

});

const displayTasks = () => {

    for (let i = 0; i < taskData.length; i++) {

        const parentContainer = document.getElementById(`tasks-div-${taskData[i].projectIdNum}`);
        parentContainer.innerHTML = '';

        for (let j = 0; j < taskData[i].projectTasks.length; j++) {

            const singleTaskDiv = document.createElement('div');
            singleTaskDiv.classList.add('single-task-div');
            singleTaskDiv.setAttribute('id', `taskDiv-${taskData[i].projectTasks[j].projectId}`);
            singleTaskDiv.style.borderBottom = taskData[i].projectTasks[j].priority == 'Low' ? "5px solid #034f04" : 
                taskData[i].projectTasks[j].priority == 'Medium' ? "5px solid #9c6a00" :  
                taskData[i].projectTasks[j].priority == 'High' ? "5px solid #5c0303" : "5px solid gray";


            // if (priorityInput.value == 'Low') {
            //     //                 document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "5px solid green";
            //     //             } else if (priorityInput.value == 'Medium') {
            //     //                 document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "5px solid yellow";
            //     //             } else if (priorityInput.value == 'High') {
            //     //                 document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "5px solid red";
            //     //             } else {
            //     //                 document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "2px solid lightgray";
            //     //             }

            const taskName = document.createElement('p');
            taskName.classList.add('task-name');
            
            const taskNameDiv = document.createElement('div');
            taskNameDiv.classList.add('task-name-div');
            const taskSupp = document.createElement('div');
            taskSupp.classList.add('task-btn-div');
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = 'Edit';
            const deleteTaskBtn = document.createElement('button');
            deleteTaskBtn.classList.add('delete-task-btn');
            deleteTaskBtn.textContent = 'Delete';

            const dueDateTaskInfoDiv = document.createElement('div');
            dueDateTaskInfoDiv.classList.add('dueDate-taskInfo-div');
            const dueDate = document.createElement('p');
            dueDate.classList.add('due-date');
            const viewTaskInfo = document.createElement('button');
            viewTaskInfo.textContent = 'View';
            viewTaskInfo.classList.add('view-task-info');
            viewTaskInfo.setAttribute('id', `view-btn-taskDiv-${taskData[i].projectTasks[j].projectId}`);

            const completionButton = document.createElement('button');
            completionButton.classList.add('completion-button');
            completionButton.style.backgroundColor = taskData[i].projectTasks[j].completed ? "#034f04" : "#5c0303";
            completionButton.textContent = '';
            completionButton.onclick = function() {
                markTaskComplete(this.parentElement.parentElement.getAttribute('id'));
                updateTaskCompletedColor(this.parentElement.parentElement.getAttribute('id'), this);
                // console.log(parentContainer.getAttribute('id'));
            }
            
            const nameEditDiv = document.createElement('div');
            nameEditDiv.classList.add('name-edit-div');
            nameEditDiv.appendChild(taskNameDiv);
            nameEditDiv.appendChild(completionButton);
            nameEditDiv.appendChild(taskSupp);
            
            parentContainer.appendChild(singleTaskDiv);
            singleTaskDiv.appendChild(nameEditDiv);
            taskNameDiv.appendChild(taskName);
            taskNameDiv.appendChild(dueDateTaskInfoDiv);
            dueDateTaskInfoDiv.appendChild(dueDate);
            dueDateTaskInfoDiv.appendChild(viewTaskInfo);
                    
            taskName.textContent = taskData[i].projectTasks[j].title;
            dueDate.textContent = taskData[i].projectTasks[j].dueDate;
    
            taskSupp.appendChild(editBtn);
            taskSupp.appendChild(deleteTaskBtn);

            deleteTaskBtn.onclick = function() {
                deleteTask(this.parentElement.parentElement, 
                    this.parentElement.parentElement.parentElement.getAttribute('id'));
            }


            editBtn.onclick = function() {
                taskDialog.showModal();
                currentId = this.parentElement.parentElement.parentElement.getAttribute('id');

                for (let i = 0; i < taskData.length; i++) {
                    for (let j = 0; j < taskData[i].projectTasks.length; j++) {
                        if (`taskDiv-${taskData[i].projectTasks[j].projectId}` == currentId) {
            
                            dueDateInput.value = taskData[i].projectTasks[j].dueDate;
                            descriptionInput.value = taskData[i].projectTasks[j].description;
                            priorityInput.value = taskData[i].projectTasks[j].priority;

                        }
                    }
                }

            }

            // for (let i = 0; i < taskData.length; i++) {
            //     for (let j = 0; j < taskData[i].projectTasks.length; j++) {
            //         if (this.parentElement.parentElement.parentElement.getAttribute('id') == currentId) {
        
            //             if (priorityInput.value == 'Low') {
            //                 document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "5px solid green";
            //             } else if (priorityInput.value == 'Medium') {
            //                 document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "5px solid yellow";
            //             } else if (priorityInput.value == 'High') {
            //                 document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "5px solid red";
            //             } else {
            //                 document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "2px solid lightgray";
            //             }
        
            //         }
            //     }
            // }

            // function to view task info
            viewTaskInfo.onclick = function() {

                displayTaskInfo(this.parentElement.parentElement.parentElement.parentElement, this.parentElement.parentElement.parentElement.parentElement);

            }
        }
    }

}

// const changeBorders = () => {
//     for (let i = 0; i < taskData.length; i++) {
//         for (let j = 0; j < taskData[i].projectTasks.length; j++) {
//             if (`taskDiv-${taskData[i].projectTasks[j].projectId}` == currentId) {

//                 if (priorityInput.value == 'Low') {
//                     document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "5px solid green";
//                 } else if (priorityInput.value == 'Medium') {
//                     document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "5px solid yellow";
//                 } else if (priorityInput.value == 'High') {
//                     document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "5px solid red";
//                 } else {
//                     document.getElementById(`taskDiv-${taskData[i].projectTasks[j].projectId}`).style.borderBottom = "2px solid lightgray";
//                 }

//             }
//         }
//     }
// }

const displayProjects = () => {
    projectListContainer.innerHTML = '';
    itemsContainer.innerHTML = '';
    displayProjectsNavbar();
    createProjects();
    displayTasks();
    // changeBorders();
};