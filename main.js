"use strict"

const form = document.querySelector('.form');
const input = document.querySelector('.input__input');
const inputWrap = document.querySelector('.input');
const task = document.querySelector('.task');
const edit = document.querySelector('.Task__edit');
const deleteTask = document.querySelector('.task__delete');
const noTask = document.querySelector('.noTaskLeft');
const deleteAll = document.querySelector('.deleteAll');
const allTasks = document.querySelectorAll('.task');

deleteAll.addEventListener('click', () => {
  const allTasks = document.querySelectorAll('.task');

  for (const key of allTasks) {
    key.remove();
  }
});

function noTaskLeft() {
  buttonChecker();
  if (form.children.length > 3) {
    noTask.innerHTML = 'Tasks to do';
  } else {
    noTask.innerHTML = 'No Tasks Left';
  }
}

function buttonChecker() {
  const tasks = document.querySelectorAll('.task');

  tasks.forEach(el => console.log(el));
}

document.querySelector('.page').addEventListener('click', (e) => {
  noTaskLeft();
});

inputWrap.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.matches('.input__cleaner')) {
    
    input.value = '';
  }
  
  if (e.target.matches('.input__button')) {
    form.insertAdjacentHTML('beforeend', `
    <div class="task">
    <a class="task__toggler task__toggler--done"></a>
    <input 
        type="text"
        class="task__input"
        value="${input.value}"
        readonly ="true" 
      >
      <button class="task__edit">
        Edit
      </button>
      <button class="task__delete">
        Delete
      </button>
    </div>
    `);

    input.value = '';

  }
});

form.addEventListener('click', (e) => {
  e.preventDefault();
  
  let value = e.target.closest('.task').children[1].value;

  const target = e.target.closest('.task').children[1];


  switch (true) {
    case (e.target.matches('.task__delete')) :
      e.target.closest('.task').remove();

      return;
    
    case (e.target.matches('.task__edit')) :
      target.removeAttribute('readonly');
      target.focus();
      target.value = '';
      target.value = value;
      e.target.closest('.task').children[2].classList.add('task__save');
      e.target.closest('.task').children[2].classList.remove('task__edit');
      e.target.closest('.task').children[2].innerHTML = 'Save';

      return;

    case (e.target.matches('.task__save')) :
      target.setAttribute('readonly', true);
      e.target.closest('.task').children[2].classList.add('task__edit');
      e.target.closest('.task').children[2].classList.remove('task__save');
      e.target.closest('.task').children[2].innerHTML = 'Edit';

      return;

    case (e.target.matches('.task__toggler')) :
      e.target.closest('.task').children[2].classList.remove('task__toggler');
      e.target.closest('.task').children[2].classList.add('task__toggler--done');

  }
});

form.addEventListener('click', (e) => {


  const allTasks = document.querySelector('.task');

  if (allTasks.children.length) {
    console.log(allTasks.children.length);
  }

// Convert buttons NodeList to an array
  var btnsArr = Array.prototype.slice.call(allTasks);

  console.log(btnsArr);

  for (const item of allTasks) {
    if (item.children[2].className === 'task__save' && !e.target.item.children.className === 'task__save') {
      for (const key of allTasks) {
        key.children[2].classList.remove('task__save');
        key.children[2].classList.add('task__edit');
      }
    }
  }
});
