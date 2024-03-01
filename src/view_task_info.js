export {displayTaskInfo, hideTaskInfo};
import {taskData} from './create_project.js';
import {taskDialog} from './map_to_dom.js';

const displayTaskInfo = (parent, friend) => {

    // console.log(friend.getAttribute('id'))

    if (!parent.classList.contains('parent-viewing-task-info')) {


        const viewTaskInfoBtn = document.getElementById((`view-btn-${friend.getAttribute('id')}`));
        viewTaskInfoBtn.classList.add('viewing-task-info');

        const taskInfoContainer = document.createElement('div');
        taskInfoContainer.classList.add('task-info-container');

        const taskInfoDueDateLabel = document.createElement('h4');
        taskInfoDueDateLabel.classList.add('task-dueDate-label-para');
        taskInfoDueDateLabel.textContent = 'Due date: '
        const taskInfoDueDate = document.createElement('p');
        taskInfoDueDate.classList.add('task-dueDate-para')

        const taskInfoDescriptionLabel = document.createElement('h4');
        taskInfoDescriptionLabel.classList.add('task-description-label-para');
        taskInfoDescriptionLabel.textContent = 'Description: ';
        const taskInfoDescription = document.createElement('p');
        taskInfoDescription.classList.add('task-description-para')

        const taskInfoPriorityLabel = document.createElement('h4');
        taskInfoPriorityLabel.classList.add('task-priority-label-para');
        taskInfoPriorityLabel.textContent = 'Priority: ';
        const taskInfoPriority = document.createElement('p');
        taskInfoPriority.classList.add('task-priority-para')

        const hideButton = document.createElement('button');
        hideButton.classList.add('hide-btn');
        hideButton.textContent = 'Hide';

        const dueDateParentDiv = document.createElement('div');
        const descriptionParentDiv = document.createElement('div');
        const priorityParentDiv = document.createElement('div');

        dueDateParentDiv.classList.add('task-info-parent-div');
        descriptionParentDiv.classList.add('task-info-parent-div');
        priorityParentDiv.classList.add('task-info-parent-div');
    
        parent.appendChild(taskInfoContainer);

        taskInfoContainer.appendChild(dueDateParentDiv);
        taskInfoContainer.appendChild(descriptionParentDiv);
        taskInfoContainer.appendChild(priorityParentDiv);

        dueDateParentDiv.appendChild(taskInfoDueDateLabel);
        dueDateParentDiv.appendChild(taskInfoDueDate);
        descriptionParentDiv.appendChild(taskInfoDescriptionLabel);
        descriptionParentDiv.appendChild(taskInfoDescription);
        priorityParentDiv.appendChild(taskInfoPriorityLabel);
        priorityParentDiv.appendChild(taskInfoPriority);
        taskInfoContainer.appendChild(hideButton);

        fillTaskInfo(friend.getAttribute('id'), taskInfoDueDate, taskInfoDescription, taskInfoPriority);

        hideButton.onclick = function() {
            hideTaskInfo(this.parentElement, this.parentElement.parentElement);
        }

        parent.style.height = '350px';
    } 
    
}

const hideTaskInfo = (element, friend) => {
    element.remove();
    friend.style.height = '50px';

    document.getElementById((`view-btn-${friend.getAttribute('id')}`)).classList.remove('viewing-task-info');
}

const fillTaskInfo = (parentId, dateParam, descriptionParam, priorityParam) => {

    

    for (let i = 0; i < taskData.length; i++) {
        for (let j = 0;  j < taskData[i].projectTasks.length; j++) {

            if (`taskDiv-${taskData[i].projectTasks[j].projectId}` == parentId) {

                dateParam.textContent = taskData[i].projectTasks[j].dueDate;
                descriptionParam.textContent = taskData[i].projectTasks[j].description;
                priorityParam.textContent = taskData[i].projectTasks[j].priority;

            }
        }
    }

}