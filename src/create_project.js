export {
    addProjectToStorage, taskData, ProjectObject, newProjectInput
}


const newProjectInput = document.getElementById('new-project-input');
const taskData = JSON.parse(localStorage.getItem("data")) || [];
const clearStorageDialog = document.getElementById('clear-storage-dialog');
const confirmClearStorageBtn = document.getElementById('confirm-clear-storage-btn');
const closeClearStorageBtn = document.getElementById('close-clear-storage-btn');

// The new structure of the data holding system will be taskData[0] = the object containing project names and ids
//      Every level after that will be a new task containing an identifier for the project to which it belongs


class ProjectObject {
    constructor(projectName = 'Default') {
        this.projectName = projectName;
        this.projectIdNum = `${projectName.toLowerCase().split(" ").join("-")}-${Date.now()}`;
        // this.projectTasks = [];
    }
}

// const projectNamesArr = [];

const addProjectToStorage = () => {

    if (taskData.length == 0) {

        taskData.push([]);
        taskData[0].push(new ProjectObject(newProjectInput.value));
        localStorage.setItem("data", JSON.stringify(taskData));
        newProjectInput.value = '';
        // console.log('if working on addProjectToStorage');

    } else {

        // taskData[0] is taskData[projectNamesArr] aka the array where project names and ids are stored
        taskData[0].push(new ProjectObject(newProjectInput.value));
        localStorage.setItem("data", JSON.stringify(taskData));
        newProjectInput.value = '';
        // console.log('else working on addProjectToStorage');

    }
}

const clearStorageBtn = document.getElementById('clear-storage');
clearStorageBtn.addEventListener('click', () => {

    clearStorageDialog.showModal();

})

confirmClearStorageBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})

closeClearStorageBtn.addEventListener('click', () => {
    clearStorageDialog.close();
})