export {
    addProjectToStorage, taskData, Project
}

const newProjectInput = document.getElementById('new-project-input');
const taskData = JSON.parse(localStorage.getItem("data")) || [];
const clearStorageDialog = document.getElementById('clear-storage-dialog');
const confirmClearStorageBtn = document.getElementById('confirm-clear-storage-btn');
const closeClearStorageBtn = document.getElementById('close-clear-storage-btn');


class Project {
    constructor(projectName = 'Default') {
        this.projectName = projectName;
        this.projectIdNum = `${projectName.toLowerCase().split(" ").join("-")}-${Date.now()}`;
        this.projectTasks = [];
    }
}

const addProjectToStorage = () => {
    taskData.push(new Project(newProjectInput.value));
    localStorage.setItem("data", JSON.stringify(taskData));
    newProjectInput.value = '';
    console.log(JSON.parse(localStorage.getItem("data")));
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