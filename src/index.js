import "./styles.css";
import { createToDo } from "./todo.js";
import { createProject } from "./project.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./storage.js";
import { renderProjects, renderToDos, showForm, updateProjectList, renderAddEditor, renderAddProj, renderDelMode } from "./dom.js";
import { format } from "date-fns";
import { state } from "./storage.js";

const myToDoContainer = document.querySelector('#mytodo');
const sideBarContainer = document.querySelector('#sidebar');

function update() {
  if (!state.selectedProjectId && state.projects.length > 0) {
    state.selectedProjectId = state.projects[0].id;
  }
  const project = state.projects.find(
    p => p.id === state.selectedProjectId
  );

  renderProjects(project, myToDoContainer);
  updateProjectList(state);
  changeHighlight(state);
  saveToLocalStorage(state);
}
function deleteProject() {
  if (!renderDelMode(state)) { update(); return }
  // this selects the first proj del button this is  wropng
  const myProjContainer = document.querySelector('.my-projects');

  const confirmDeleteProject = (e) => {
    if (!e.target.closest('.proj-del-button')) return;

    const projectId = e.target.closest('.proj-del-button').dataset.id;
    if (!projectId) return;

    if (state.projects.length === 1) {
      alert('only one project left');
      return;
    }

    state.projects = state.projects.filter(p => {
      console.log(`${p.id} | ${projectId}`)
      return p.id !== projectId;
    });
    console.log(state.projects);
    state.selectedProjectId = null;
    myProjContainer.removeEventListener('click', confirmDeleteProject);
    update();
  }; 
  myProjContainer.addEventListener('click', confirmDeleteProject);
}
function addProject() { 
  if (!renderAddProj()) { return } 

  const confirmAddButton = document.querySelector('.confirm-add');
  const confirmAddProject = () => {
    const projectName = document.querySelector('.edit-proj-name');
    if (validateProjectName(projectName)) { 
      alert('empty'); 
      return; 
    };

    const newProject = createProject({ name: projectName.textContent });
    state.projects.push(
      newProject
    );
    state.selectedProjectId = newProject.id;
    confirmAddButton.removeEventListener('click', confirmAddProject);

    update();
  }; 
  confirmAddButton.addEventListener('click', confirmAddProject);

}
function validateProjectName(element) {
  const text = element.textContent;
  // also add different limitations
  return text === '';
}
function changeTextListener(popper) {
  popper?.showPicker();

  const updateDateText = () => {
    const dateText = document.querySelector('div.add-date > p');
    dateText.textContent = popper.value;

    popper.removeEventListener('change', updateDateText);
  };
  popper.addEventListener('change', updateDateText);
}
function changePriorityText(selected, dom) {
  const element = document.querySelector(`.${dom}`);
  const hiddenList = element.querySelector('.hidden-priority').cloneNode(true);
  element.innerHTML = '';

  const img = selected.querySelector('img').cloneNode(true);
  const p = selected.querySelector('p').cloneNode(true);

  console.log(hiddenList)
  element.appendChild(img);
  element.appendChild(p);
  element.appendChild(hiddenList);
}
function changeHighlight(state) {

  const myProjContainer = document.querySelectorAll('.my-projects > li');
  const arr = Array.from(myProjContainer);

  arr.forEach( li => {
    const isTrue = li.dataset.id === state.selectedProjectId;
    li.classList.toggle('selected', isTrue);
  })
}

// try to retrieve if there are projects in the local state data
const storedData = loadFromLocalStorage();
if (storedData) {
  // rehydrate JSON objs into JS objs
  state.projects = storedData.projects.map(projectData => {
    const project = createProject(projectData);
    projectData.todos.forEach(todoData => {
      project.addTodo(createToDo(todoData));
    });

    return project;
  });

  if (state.projects.length > 0) {
    state.selectedProjectId = state.projects[0].id;
  }
}
update(); // initial render

myToDoContainer.addEventListener('focusout', (e) => {
  if (e.target.matches('[contenteditable]')) {
    if (e.target.textContent.trim() === '') {
      e.target.innerHTML = '';
    }
  } 
});

myToDoContainer.addEventListener('click', (e) => {
  
  if (e.target.closest('.add-todo-row')) { 
    e.preventDefault();
    renderAddEditor();
  }

  if (e.target.closest('[data-id]')) {
    e.preventDefault();
    const action = e.target.closest('[data-action]');
    
    if (action.dataset.action === 'closed') {
      const row = e.target.closest('[data-id]');
      const projectId = row.dataset.id
      renderToDos(projectId, row)
      action.dataset.action = 'open'; 
    }
    if (action.dataset.action === 'open') {
      action.dataset.action = 'closed'; 
    }
    return;
  }

  if (e.target.closest('.editor')) {

    if (e.target.closest('.edit-check')) {
      console.log('this is edit checklist text input');
      return;
    }
    if (e.target.closest('.cancel-btn')) {
      update();
      return;
    }

    if (e.target.closest('.option-container')) {
      const option = e.target.closest('.option-container');
      e.preventDefault();

      const poppers = {
        'add-date': option.querySelector('#hidden-date'),
        'add-priority': option.querySelector('.hidden-priority'),
        'add-checklist': option.querySelector('.hidden-check')
      };
      
      const action = Object.keys(poppers).find(key => e.target.closest(`.${key}`));

      if (!action) return;
      const clickedPopper = poppers[action];
      if (action === 'add-date') {
        changeTextListener(clickedPopper)
        return;
      }
      if (action === 'add-priority') { // click popper to open
        const popper = poppers[action];
        const selected = e.target.closest('[data-priority]');
        popper.classList.toggle('active');
        console.log(action)
        if (selected) changePriorityText(selected, action);
      }
      if (action === 'add-checklist') {
        const popper = poppers[action];
        console.log(e.target.dataset.priority)
        popper.classList.toggle('active');
      }

    }

    if(e.target.closest('.confirm-btn')) {
      console.log('Nnija')
    } 
  }



})

sideBarContainer.addEventListener('click', (e) => {
  if (e.target.closest('[data-id]')) {
    const row = e.target.closest('[data-id]');
    if (!row) return;

    e.preventDefault();
    
    const project = state.projects.find(
      project => project.id === row.dataset.id
    );
    
    if (!project) return;
    state.selectedProjectId = row.dataset.id;

    update();
  }

  if (e.target.closest('.add-project-btn')) {
    addProject();
  }
  if (e.target.closest('.del-project-btn')) {
    deleteProject();
  }
  if (e.target.closest('.cancel-add')) {
    update();
  }
});

console.log(state)

