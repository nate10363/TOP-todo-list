import {taskData} from './create_project.js';
export {markTaskComplete, updateTaskCompletedColor};




// the the object completed value between true and false

const markTaskComplete = (taskItem) => {

  for (let i = 0; i < taskData.length; i++) {
    for (let j = 0; j < taskData[i].projectTasks.length; j++) {
      if (`taskDiv-${taskData[i].projectTasks[j].projectId}` == taskItem) {
            
        taskData[i].projectTasks[j].completed = !taskData[i].projectTasks[j].completed;
        localStorage.setItem("data", JSON.stringify(taskData));
        console.log(taskData[i].projectTasks[j].completed);
        // console.log(`taskDiv-${taskData[i].projectTasks[j].projectId}`, taskItem);
      }
    }
  }

}

const updateTaskCompletedColor = (taskItem, buttonEl) => {

  for (let i = 0; i < taskData.length; i++) {
    for (let j = 0; j < taskData[i].projectTasks.length; j++) {
      if (`taskDiv-${taskData[i].projectTasks[j].projectId}` == taskItem) {
            
        if (taskData[i].projectTasks[j].completed) {
          buttonEl.style.backgroundColor = '#034f04';
        } else {
          buttonEl.style.backgroundColor = '#5c0303';
        }
        
      }
    }
  }

}