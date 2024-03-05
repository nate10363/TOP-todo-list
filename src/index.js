import _ from 'lodash';
import './style.css';
import {displayProjectsNavbar, displayProjectsMain, navbarListContainer, projItemsContainer} from './display_projects.js';
import {addProjectToStorage} from './create_project';
import {taskData} from './create_project';
import {displayTasksToProject} from './display_tasks.js';
import {addDays} from '/Users/nathanieldavenport/Documents/TOP-todo-list/node_modules/date-fns/addDays.js';
import {differenceInCalendarDays} from '/Users/nathanieldavenport/Documents/TOP-todo-list/node_modules/date-fns/differenceInCalendarDays.js'


const createProjectBtn = document.getElementById('create-project-btn');
const newProjectBtn = document.getElementById('add-project-btn');
const projectDialog = document.getElementById('project-dialog');
const closeModalBtn = document.getElementById('close-modal-btn');


createProjectBtn.addEventListener('click', () => {
    addProjectToStorage();

    navbarListContainer.innerHTML = '';
    projItemsContainer.innerHTML = '';


    taskData[0].forEach((projArr) => {
      displayProjectsNavbar(projArr);
      displayProjectsMain(projArr);
    })

    

    if (taskData[1]) {
      taskData[1].forEach((arrEl) => {
      displayTasksToProject(arrEl);
      })
    }
      
    projectDialog.close();
})



newProjectBtn.addEventListener('click', () => {
  projectDialog.showModal();
});

closeModalBtn.addEventListener('click', () => {
  projectDialog.close();
})

window.addEventListener('DOMContentLoaded', () => {

  if (!taskData[0]) {
    return;
  } else {

    projItemsContainer.innerHTML = '';

    taskData[0].forEach((projArr) => {
      displayProjectsNavbar(projArr);
      displayProjectsMain(projArr);
    })

    if (taskData[1]) {

      taskData[1].forEach((arrEl) => {
        displayTasksToProject(arrEl);
      })

    } 
  }
})

// const logStorageBtn = document.getElementById('log-storage');
// logStorageBtn.addEventListener('click', () => {
//   console.log(taskData)
// })

const sortAllBtn = document.getElementById('sortAllBtn');
sortAllBtn.addEventListener('click', () => {

  if (!taskData[0]) {
    return;
  } else {

    navbarListContainer.innerHTML = '';
    projItemsContainer.innerHTML = '';

    taskData[0].forEach((projArr) => {
      displayProjectsNavbar(projArr);
      displayProjectsMain(projArr);
    })

    if (taskData[1]) {

      taskData[1].forEach((arrEl) => {
        displayTasksToProject(arrEl);
      })

    } 
  }

})




const sortDayBtn = document.getElementById('sortDayBtn');
sortDayBtn.addEventListener('click', () => {
  
  let dayTaskArr = [];
  let dayProjArr = [];
  let dayProjArrTotal = [];

  taskData[1].forEach((el) => {

    
    const date = new Date(); 
    const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

    if (dateString == el.dueDate) { {
      dayTaskArr.push(el);
      let proj = Array.prototype.find.call(taskData[0], (x) => x.projectIdNum == el.parentProjectIdNum);

      dayProjArr.push(proj);

    }

    dayProjArr.forEach((el) => {

      if (dayProjArrTotal.includes(el)) {
        console.log('protons decay faster than you can filter')
      } else {
        dayProjArrTotal.push(el);
      }

    })
      
    } else {

    }

  });


  if (!taskData[0]) {
    return;
  } else {

    navbarListContainer.innerHTML = '';
    projItemsContainer.innerHTML = '';

    dayProjArrTotal.forEach((taskArr) => {
      displayProjectsNavbar(taskArr);
      displayProjectsMain(taskArr);
    })

    if (dayTaskArr) {

      dayTaskArr.forEach((arrEl) => {
        displayTasksToProject(arrEl);
      })

    } 
  }




})



const sortWeekBtn = document.getElementById('sortWeekBtn');
sortWeekBtn.addEventListener('click', () => {

  let weekTaskArr = [];
  let weekProjArr = [];
  let weekProjArrTotal = [];

  taskData[1].forEach((el) => {

    const today = new Date();
    const todaySimple = new Date(today.getTime() - (today.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

    const differenceInDays = differenceInCalendarDays(el.dueDate, todaySimple);


    if (differenceInDays <= 7) {
      weekTaskArr.push(el);
      let index = Array.prototype.find.call(taskData[0], (x) => x.projectIdNum == el.parentProjectIdNum);
      weekProjArr.push(index);
    }

    weekProjArr.forEach((el) => {

      if (weekProjArrTotal.includes(el)) {
        console.log('your filtering is to a blue moon as a blue moon is to the expansion of the universe in the first 10^-35s');
      } else {
        weekProjArrTotal.push(el);
      }

    })
    
  })


  if (!taskData[0]) {
    return;
  } else {

    navbarListContainer.innerHTML = '';
    projItemsContainer.innerHTML = '';

    weekProjArrTotal.forEach((projArr) => {
      displayProjectsNavbar(projArr);
      displayProjectsMain(projArr);
    })

    if (weekTaskArr) {

      weekTaskArr.forEach((arrEl) => {
        displayTasksToProject(arrEl);
      })

    } 
  }

})