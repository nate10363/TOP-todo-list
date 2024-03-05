import {taskData} from './create_project.js';
import {displayTaskInfo} from './display_task_info.js';

export {displayTasksToProject};



const displayTasksToProject = (arrItem) => {


    const projItemTaskContainer = document.getElementById(`projItemTaskContainer-${arrItem.parentProjectIdNum}`)

    // console.log(projItemTaskContainer)

        
    const soloTaskContainer = document.createElement('div');
    soloTaskContainer.classList.add('soloTaskContainer');
    soloTaskContainer.setAttribute('id', `soloTaskContainer-${arrItem.taskId}`);


    projItemTaskContainer.appendChild(soloTaskContainer);



    for (let j = 0; j < taskData[1].length; j++) {

    // const friendlySoloTaskContainer = document.createElement('div');
    // newSoloTaskContainer.classList.add('soloTaskContainer');

        soloTaskContainer.style.borderBottom = taskData[1][j].priority == 'Low' ? "5px solid #034f04" : 
            taskData[1][j].priority == 'Medium' ? "5px solid #9c6a00" :  
            taskData[1][j].priority == 'High' ? "5px solid #5c0303" : "5px solid gray";
        
        localStorage.setItem("data", JSON.stringify(taskData));

    }

    const taskTitleContainer = document.createElement('div');
    taskTitleContainer.classList.add('taskTitleContainer');
    taskTitleContainer.setAttribute('id', `taskTitleContainer-${arrItem.parentProjectIdNum}`);

    const completionBtn = document.createElement('button');
    completionBtn.classList.add('completionBtn');
    completionBtn.setAttribute('id', `completionBtn-${arrItem.parentProjectIdNum}`);
    completionBtn.style.backgroundColor = arrItem.completed ? 'green' : 'red';
    completionBtn.onclick = function() {
        arrItem.completed = !arrItem.completed;
        localStorage.setItem("data", JSON.stringify(taskData));
        completionBtn.style.backgroundColor = arrItem.completed ? 'green' : 'red';
        if (arrItem.completed) {
            taskTitle.style.textDecoration = "line-through";
            taskTitle.style.color = "gray";
        } else {
            taskTitle.style.textDecoration = "none";
            taskTitle.style.color = "black";
        }

    }

    const titleDateViewParentDiv = document.createElement('div');
    titleDateViewParentDiv.classList.add('titleDateViewParentDiv');

    const titleDateViewDiv = document.createElement('div');
    titleDateViewDiv.classList.add('titleDateViewDiv');

    const taskTitle = document.createElement('h3');
    taskTitle.classList.add('taskTitle');
    taskTitle.textContent = arrItem.title;
    taskTitle.style.textDecoration = arrItem.completed ? "line-through" : "none";
    taskTitle.style.color = arrItem.completed ? "gray" : "black";

    const taskDuedate = document.createElement('p');
    taskDuedate.classList.add('taskDuedate');
    taskDuedate.textContent = arrItem.dueDate;

    const viewTaskInfoBtn = document.createElement('button');
    viewTaskInfoBtn.classList.add('viewTaskInfoBtn');
    viewTaskInfoBtn.setAttribute('id', `viewTaskInfoBtn-${arrItem.parentProjectIdNum}`);
    viewTaskInfoBtn.textContent = 'View';
    viewTaskInfoBtn.onclick = function() {

        viewTaskInfoBtn.classList.toggle('viewingTaskInfo');
        localStorage.setItem("data", JSON.stringify(taskData));


        if  (viewTaskInfoBtn.classList.contains('viewingTaskInfo')) {
            displayTaskInfo(arrItem.taskId, taskDuedate);
            localStorage.setItem("data", JSON.stringify(taskData));
        } else {
            document.getElementById(`soloTaskContainer-${arrItem.taskId}`)
                .removeChild(document.getElementById(`taskInfoContainer-${arrItem.taskId}`));
                taskDuedate.textContent = arrItem.dueDate;
                localStorage.setItem("data", JSON.stringify(taskData));
        }


    }


    // * current problem
    soloTaskContainer.appendChild(taskTitleContainer);
    taskTitleContainer.appendChild(titleDateViewParentDiv);
    taskTitleContainer.appendChild(viewTaskInfoBtn);
    titleDateViewParentDiv.appendChild(completionBtn);
    titleDateViewParentDiv.appendChild(titleDateViewDiv);
    titleDateViewDiv.appendChild(taskTitle);
    titleDateViewDiv.appendChild(taskDuedate);
    

    // * current problem
    // document.getElementById(`soloTaskContainer-${arr[i].taskId}`).style.borderBottom = 
    //                     arr[i].priority == 'Low' ? '5px solid green' : 
    //                     arr[i].priority == 'Medium' ? '5px solid yellow' : 
    //                     arr[i].priority == 'High' ? '5px solid red' : 
    //                         '5px solid gray';


        // }
    // } 
}