export {displayProjectsNavbar, displayProjectsMain, navbarListContainer, projItemsContainer};
import {taskData} from './create_project.js';
import {addTaskToStorage} from './create_task.js';
import {displayTasksToProject} from './display_tasks.js';
import {displayTaskInfo} from './display_task_info.js';

const navbarListContainer = document.getElementById('navbar-list-container');
const projItemsContainer = document.getElementById('projects-items-container');
let blankArr = [];

const displayProjectsNavbar = (el) => {

    
    const navbarSoloItemContainer = document.createElement('div');
    navbarSoloItemContainer.classList.add('navbarProjContainer');

    const navbarProjItem = document.createElement('div');
    navbarProjItem.classList.add('navbarProjItem');
    navbarProjItem.setAttribute('id', `navbarProjItem-${el.projectIdNum}`);
    navbarProjItem.setAttribute('name', el.projectIdNum);
    navbarProjItem.textContent = el.projectName;
    navbarProjItem.onclick = function() {

        projItemsContainer.innerHTML = '';
        displayProjectsMain(el);

        for (let i = 0; i < taskData[1].length; i++) {
            if (taskData[1][i].parentProjectIdNum == el.projectIdNum) {
                displayTasksToProject(taskData[1][i])
            }
        }
    
    }


    // end of solo project relayed from navbar

    const deleteNavbarProjItemBtn = document.createElement('button');
    deleteNavbarProjItemBtn.classList.add('btn', 'deleteNavbarProjItemBtn')
    deleteNavbarProjItemBtn.textContent = 'Delete';
    deleteNavbarProjItemBtn.onclick = function() {


        this.parentElement.remove();

        if (taskData[1]) {
            for (let j = taskData[1].length - 1; j >= 0; j--) {
                if (taskData[1][j].parentProjectIdNum == el.projectIdNum ) {
                    taskData[1].splice(j, 1);
                    localStorage.setItem("data", JSON.stringify(taskData));
                }
            }
        }




        for (let i = taskData[0].length - 1; i >= 0; i--) {
            if (taskData[0][i].projectIdNum == el.projectIdNum) {
                taskData[0].splice(i, 1);
                // console.log('splicing projects working')
                localStorage.setItem("data", JSON.stringify(taskData));
            }
        }

        if (!taskData[0]) {
            return;
            } else {
            // displayProjectsNavbar(taskData[0]);
            // displayProjectsMain();

                projItemsContainer.innerHTML = '';
                
                taskData[0].forEach((projArr) => {

                displayProjectsMain(projArr);

            })

            if (taskData[1]) {
                taskData[1].forEach((arrEl) => {
                    displayTasksToProject(arrEl);
                    // console.log(arrEl);
                  })
            } 
                // displayProjects();
        }
            

}

    navbarListContainer.appendChild(navbarSoloItemContainer);

    navbarSoloItemContainer.appendChild(navbarProjItem);
    navbarSoloItemContainer.appendChild(deleteNavbarProjItemBtn);
    

}

const displayProjectsMain = (el) => {
    
    

        // individual project container
        const projItemDom = document.createElement('div');
        projItemDom.classList.add('projItemDom');
        projItemDom.setAttribute('id', `projItemDom-${el.projectIdNum}`);

        // individual project container header
        const projItemDomTitle = document.createElement('h2');
        projItemDomTitle.textContent = el.projectName;

        // individual project container to hold tasks
        const projItemTaskContainer = document.createElement('div');
        projItemTaskContainer.classList.add('projItemTaskContainer');
        projItemTaskContainer.setAttribute('id', `projItemTaskContainer-${el.projectIdNum}`);
        projItemTaskContainer.setAttribute('name', el.projectIdNum);

        // individual project input to create new tasks
        const addTaskInput = document.createElement('input');
        addTaskInput.classList.add('addTaskInput');
        addTaskInput.setAttribute('id', `addTaskInput-${el.projectIdNum}`);
        addTaskInput.setAttribute('name', el.projectIdNum);
        addTaskInput.placeholder = 'Task Name';
        addTaskInput.style.textAlign = 'center';

        // individual project button to create new tasks
        const addTaskBtn = document.createElement('button');
        addTaskBtn.classList.add('addTaskBtn');
        addTaskBtn.setAttribute('id', `addTaskBtn-${el.projectIdNum}`);
        addTaskBtn.setAttribute('name', el.projectIdNum);
        addTaskBtn.textContent = 'Add Task';
        addTaskBtn.onclick = function() {
            // for some reason, I had to switch the function values of el.projectIdNum and addTaskInput.value
                // when referenced against the NewTaskObject constructor inputs
            
            addTaskToStorage(el.projectIdNum, addTaskInput.value, 
                            'fried', 'Not set', 
                            'Standard', false);
            addTaskInput.value = '';

            if (taskData[1]) {
                projItemsContainer.innerHTML = '';

                taskData[0].forEach((projArr) => {
                displayProjectsMain(projArr);
                // console.log(projArr.projectIdNum);
                })

                taskData[1].forEach((arrEl) => {
                    displayTasksToProject(arrEl);
                    // console.log(arrEl);
                  })
            } 

        }

        // append indivudal projects to the project container
        projItemsContainer.appendChild(projItemDom);

        projItemDom.appendChild(projItemDomTitle);
        projItemDom.appendChild(projItemTaskContainer);
        projItemDom.appendChild(addTaskInput);
        projItemDom.appendChild(addTaskInput);
        projItemDom.appendChild(addTaskBtn);

}






//         document.getElementById(`soloTaskContainer-${arr[i].taskId}`).style.borderBottom = 
//                             arr[i].priority == 'Low' ? '5px solid green' : 
//                             arr[i].priority == 'Medium' ? '5px solid yellow' : 
//                             arr[i].priority == 'High' ? '5px solid red' : 
//                                 '5px solid gray';