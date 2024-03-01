import {taskData} from './create_project.js';
export {deleteTask};



const deleteTask = (element, parentId) => {

  element.parentElement.remove();
  // console.log(element, parentId)

  for (let i = 0; i < taskData.length; i++) {
    for (let j = 0; j < taskData[i].projectTasks.length; j++) {
      if (`taskDiv-${taskData[i].projectTasks[j].projectId}` == parentId) {
        taskData[i].projectTasks.splice(j, 1);
        localStorage.setItem("data", JSON.stringify(taskData));
      }
    }
  }
}