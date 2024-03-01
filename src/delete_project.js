import {taskData} from './create_project.js';
import {createProjects} from './map_to_dom.js'

export {deleteProject};

const deleteProject = (projectId, element) => {
  for (let i = 0; i < taskData.length; i++) {

    element.parentElement.remove();

    if (taskData[i].projectIdNum == projectId) {
      taskData.splice(i, 1);
      localStorage.setItem("data", JSON.stringify(taskData));
      document.getElementById('items-container').innerHTML = '';
      createProjects();
    }
  }
}