
import circleOff  from "./images/circle-off.svg";
import addButton  from "./images/add-button.svg";
import crossSquare from "./images/cross-square.svg";
import trashBtnOff from "./images/trash-not.svg";
import trashBtnOn from "./images/trash-active.svg";
import poundImg   from "./images/pound.svg";
import dateImg from "./images/date.svg";
import prioImg from "./images/flag.svg"
import checkImg from "./images/alarm.svg"
import redFlag from './images/red-flag.svg'
import greenFlag from './images/green-flag.svg'
import yellowFlag from './images/yellow-flag.svg'
import cancel from './images/cross-svg.svg';
import confirm from './images/check-svg.svg';
import circleDel from './images/circle-remove.svg';

function toTitleCase(str) {
  if (!str) console.log('epstein');
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function createElement(type, text='') {
  const element = document.createElement(type);
  if (text !== '') element.textContent = text;
  return element; 
}
function createAddButton() {
  const plusButton = createElement('button');
  plusButton.setAttribute('type', 'image');
  plusButton.classList.add('close-add');
  const plusImage = createElement('img');
  plusImage.src = addButton;

  plusButton.appendChild(plusImage);
  return plusButton;
}
function createAddTodoText() {
  const addTaskText = createElement('p', 'Add To-do');
  addTaskText.classList.add('add-task-msg');
  return addTaskText;
}
function renderAddRow() {
  const addRowContainer = createElement('div');
  const plusButton = createAddButton();
  const addTaskText = createAddTodoText(); 
  
  addRowContainer.appendChild(plusButton);
  addRowContainer.appendChild(addTaskText);
  return addRowContainer;
}
function createAddRow() {
  const AddRowContainer = renderAddRow();
  AddRowContainer.classList.add('add-todo-row')
  return AddRowContainer
}

function createTextInput(name, temp) {
  const input = createElement('p');
  input.setAttribute('contenteditable', 'true');
  input.dataset.placeholder = temp;
  input.classList.add(`edit-${name}`);

  return input;
}
function createAddEditor() {
  const addTodoRow = document.querySelector('.add-todo-row');
  addTodoRow.innerHTML = '';
  addTodoRow.classList.replace('add-todo-row', 'editor');
  return addTodoRow;
}
function createCloseBtn() {
  const searchButton = createElement('button');
  searchButton.setAttribute('type', 'image');
  searchButton.classList.add('close-add');
  
  const searchImage = createElement('img');
  searchImage.src = crossSquare;

  searchButton.appendChild(searchImage);
  return searchButton;
}

function createGenericContainer(name) {
  const div = createElement('div');
  div.classList.add(name);
  return div;
}
function createOption(name, img) {
  const rname = toTitleCase(name);
  const optionContainer = createElement('div');
  optionContainer.classList.add(`add-${name}`);
  
  const image = createImage(img);
  const p = createElement('p', rname);

  optionContainer.appendChild(image);
  optionContainer.appendChild(p);

  return optionContainer;
}
function createDateInput() {
  const input = createElement('input');
  input.type = 'date';
  input.id = 'hidden-date'
  
  return input;
}
function createPrioritySelection(pic, text) {
  const div = createElement('div');
  const img = createImage(pic);
  const p = createElement('p', text)

  div.appendChild(img);
  div.appendChild(p);

  return div;
}
function createPriorityPopper() {
  const div = createElement('div');
  div.classList.add('hidden-priority');

  const lowPriority = createPrioritySelection(greenFlag, 'Low Priority')
  const mediumPriority = createPrioritySelection(yellowFlag, 'Medium Priority')
  const highPriority = createPrioritySelection(redFlag, 'High Priority')

  lowPriority.dataset.priority = 'low';
  mediumPriority.dataset.priority = 'medium';
  highPriority.dataset.priority = 'high';

  div.appendChild(lowPriority);
  div.appendChild(mediumPriority);
  div.appendChild(highPriority);

  return div;
}
function createChecklistPopper() {
  const div = createElement('div');
  div.classList.add('hidden-check');

  const h2 = createElement('h2');
  h2.textContent = 'Checklist';
  const input = createTextInput('check', '..Putting fries in the bag.') 
  const buttonContainer = createElement('div');
  const createAddButton = createElement('button', 'Add Task')
  buttonContainer.appendChild(createAddButton);

  div.appendChild(h2);
  div.appendChild(input);
  div.appendChild(buttonContainer);

  return div;
}

function createOptionsContainer() {
  const div = createGenericContainer('option-container');

  const addDateBtn  = createOption('date', dateImg);
  const dateInput = createDateInput();
  addDateBtn.appendChild(dateInput);

  const addPrioBtn  = createOption('priority', prioImg);
  const priorityPopper = createPriorityPopper();
  addPrioBtn.appendChild(priorityPopper);

  const addCheckBtn = createOption('checklist', checkImg);
  const checkListPopper = createChecklistPopper();
  addCheckBtn.appendChild(checkListPopper);

  div.appendChild(addDateBtn);
  div.appendChild(addPrioBtn);
  div.appendChild(addCheckBtn);

  return div;
}
function createLastBtn(name) {
  const optionContainer = createElement('button');
  optionContainer.classList.add(`${name}-btn`);
  optionContainer.textContent = toTitleCase(name); ;

  return optionContainer;
}
function createConfirmContainer() {
  const div = createGenericContainer('last-container');
  const createCancelBtn  = createLastBtn('cancel');
  const createConfirmBtn = createLastBtn('confirm');

  div.appendChild(createCancelBtn);
  div.appendChild(createConfirmBtn);

  return div;
}

export function renderAddEditor() {
  const addTodoRow = createAddEditor();
  addTodoRow.appendChild(createTextInput('name', 'Enter todo title...'));
  addTodoRow.appendChild(createCloseBtn());
  addTodoRow.appendChild(createTextInput('desc', 'Description'));
  addTodoRow.appendChild(createOptionsContainer());
  addTodoRow.appendChild(createConfirmContainer());
}

function createCircleOff(className) {
  const element = document.createElement('img');
  element.classList.add(className);
  element.src = circleOff;
  return element;
}
function createTodoRow(project) {
  const rowContainer = document.createElement('div');

  const infoContainer = document.createElement('div');
  const dropDownContainer = document.createElement('div');

  const nameBox = document.createElement('p');
  const imageCircleOff = createCircleOff('img-circle');

  rowContainer.classList.add(`row-container`)
  rowContainer.dataset.id = `${[project.id]}`
  rowContainer.dataset.action = `closed`
  nameBox.classList.add('project-name');
  infoContainer.classList.add('project-row');
  
  dropDownContainer.classList.add('rebecca-purple')

  nameBox.textContent = project.name;
  infoContainer.appendChild(imageCircleOff);
  infoContainer.appendChild(nameBox);
  
  rowContainer.appendChild(infoContainer);
  rowContainer.appendChild(dropDownContainer);

  return rowContainer
}

function createTodoContainer(project) {
  const todoContainer = document.createElement('div')
  project.todos.forEach(todo => {
    todoContainer.appendChild(createTodoRow(todo))
  });
  todoContainer.appendChild(createAddRow())
  todoContainer.classList.add('todo-container')
  return todoContainer;
}

function toggleDisplay(e) {
  if (e.style.display === 'none') {
    e.style.display = 'block';
  } else {
    e.style.display = 'none';
  }
}

export function renderToDos(projectId, parent) {
  const dropDownContainer = parent.querySelector('.rebecca-purple');
  toggleDisplay(dropDownContainer)
}

function createList(name) {
  return document.createElement('li');
}
function createImage(src) {
  const img = document.createElement('img')
  img.src = src;
  return img;
}
function createListTitle() {
  const li = createList();
  
  const buttonsContainer = document.createElement('div');
  const addButtonImg = createImage(addButton);
  const trashBtnImg = createImage(trashBtnOff);

  addButtonImg.classList.add('add-project-btn');
  trashBtnImg.classList.add('del-project-btn');
  trashBtnImg.dataset.state = 'off';

  buttonsContainer.appendChild(addButtonImg);
  buttonsContainer.appendChild(trashBtnImg);
  li.appendChild(document.createTextNode('My Projects'));
  li.appendChild(buttonsContainer);

  return li;
}
function createListProject(project) {
  const li = createList('My Projects');
  const poundButtonImg = createImage(poundImg);
  li.dataset.id = `${project.id}`
  li.appendChild(poundButtonImg);
  li.appendChild(document.createTextNode(project.name));
  return li;
}
function createListProjectDel(project) {
  const li = createListProject(project);
  const btn = createCheckBtn();
  btn.children[0].dataset.id = project.id;
  li.appendChild(btn);

  return li;
}
export function updateProjectList(state) {
  const myProjects = document.querySelector('.my-projects');
  myProjects.innerHTML =  ''
  myProjects.appendChild(createListTitle());

  const projects = state.projects // []
  projects.forEach(project => {
    myProjects.appendChild(createListProject(project))
  })
}
function createCheckBtn() {
  const div = createElement('div');
  const img = createImage(circleDel)
  const button = document.createElement('button');

  div.classList.add('del-button-container');
  button.classList.add('proj-del-button');

  button.appendChild(img);
  div.appendChild(button);

  return div;
}
function createProjectName(project) {
  const nameContainer = document.createElement('div');
  const p = document.createElement('p');
  p.textContent = `${project.name}`;
  nameContainer.appendChild(p)
  nameContainer.classList.add('project-name')
  return nameContainer;
}

export function renderProjects(project, parent) {
  parent.textContent = '';
  
  parent.appendChild(createProjectName(project)) // state.projects[i]
  parent.appendChild(createTodoContainer(project))
} 

export function showForm() {
  const formContainer = document.querySelector('#form-container');
  formContainer.style.display = "block";
  document.querySelector('form').style.display = "block";
}

export function closeForm() {
  resetForm();
  const formContainer = document.querySelector('#form-container');
  formContainer.style.display = "block" ? "none" : "block";
}

function resetForm() {
  const formContainer = document.querySelector('#form-container');
  formContainer.reset();
}

function createTempAdd() {
  const tempRow = document.createElement('li');
  tempRow.appendChild(createTextInput('proj-name', 'My New Project...'));
  tempRow.appendChild(createImage(confirm));
  tempRow.appendChild(createImage(cancel));

  tempRow.classList.add('temp-row');
  tempRow.childNodes[1].classList.add('confirm-add');
  tempRow.childNodes[2].classList.add('cancel-add');
  
  return tempRow;
}
export function renderAddProj() {
  const myProjects = document.querySelector('.my-projects');
  const tempRow = document.querySelector('.temp-row');

  if (tempRow) {
    tempRow.remove();
    myProjects.dataset.state = 'idle';
    return false;
  }

  myProjects.appendChild(createTempAdd());
  myProjects.dataset.state = 'adding';
  return true;

}
export function renderDelMode(state) {
  const delIcon = document.querySelector('.del-project-btn');

  if (delIcon.dataset.state === 'off') {
    const myProjects = document.querySelector('.my-projects');
    

    myProjects.innerHTML =  '';
    myProjects.appendChild(createListTitle());
    
    const projects = state.projects;
    projects.forEach(project => {
      myProjects.appendChild(createListProjectDel(project));
    })
    
    toggleDelState();
    return true;
  } else {
    return false;
  }
  
}

function toggleDelState() {
  const delIcon = document.querySelector('.del-project-btn');

  delIcon.src = trashBtnOn;
  delIcon.dataset.state = 'on';

  console.log(delIcon.dataset.state ) 
}