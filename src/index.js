import _ from 'lodash';
import './style.css';
import {displayProjects} from './map_to_dom';
import {addProjectToStorage} from './create_project';


const createProjectBtn = document.getElementById('create-project-btn');
const newProjectBtn = document.getElementById('add-project-btn');
const projectDialog = document.getElementById('project-dialog');
const closeModalBtn = document.getElementById('close-modal-btn');


createProjectBtn.addEventListener('click', () => {
    addProjectToStorage();
    displayProjects();
    projectDialog.close();
})



newProjectBtn.addEventListener('click', () => {
  projectDialog.showModal();
});

closeModalBtn.addEventListener('click', () => {
  projectDialog.close();
})

window.addEventListener('DOMContentLoaded', () => {
  displayProjects();
})