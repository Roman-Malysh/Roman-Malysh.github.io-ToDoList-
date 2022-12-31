"use strict"

//variables

const form = document.querySelector('.form');
const input = document.querySelector('.input__input');
const inputWrap = document.querySelector('.input');
const task = document.querySelector('.task');
const edit = document.querySelector('.Task__edit');
const deleteTask = document.querySelector('.task__delete');
const noTask = document.querySelector('.noTaskLeft');
const deleteAll = document.querySelector('.deleteAll');
const allTasks = document.querySelectorAll('.task');
const label = document.getElementById('.label');

//delete button

deleteAll.addEventListener('click', () => {
  const allTasks = document.querySelectorAll('.task');

  for (const key of allTasks) {
    key.remove();
  }
});

//all click task checker

document.querySelector('.page').addEventListener('click', () => {
    let tasksCounter = form.children.length - 3;
    console.log(form.children.length );

    function taskChecker() {
      if (form.children.length > 3) {
        noTask.innerHTML = `You have ${tasksCounter} tasks to do`;
      } else {
        noTask.innerHTML = 'No Tasks Left';
      }
    }
    taskChecker();
});

//add task

inputWrap.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.matches('.input__cleaner')) {
    
    input.value = '';
  }
  
  if (e.target.matches('.input__button')) {
    form.insertAdjacentHTML('beforeend', `
    <div class="task">
    <div class="round">
      <input type="checkbox" checked id="checkbox">
      <label for="checkbox" id="label"></label>
  </div>
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

//form events

form.addEventListener('click', (e) => {
  e.preventDefault();
  
  console.log(e.target);
  switch (true) {
    case (e.target.matches('.task__delete')) :
      e.target.closest('.task').remove();

      return;
    
    case (e.target.matches('.task__edit')) :
      const allTheTasks = document.querySelectorAll('.task'); 
    for (const task of allTheTasks){
      task.children[1].setAttribute('readonly', true);
      task.children[2].classList.add('task__edit');
      task.children[2].classList.remove('task__save');
      task.children[2].innerHTML = 'Edit';
    } 
      const target = e.target.closest('.task').children[1];
      let value = e.target.closest('.task').children[1].value;
      target.removeAttribute('readonly');
      target.focus();
      target.value = '';
      target.value = value;
      e.target.closest('.task').children[2].classList.add('task__save');
      e.target.closest('.task').children[2].classList.remove('task__edit');
      e.target.closest('.task').children[2].innerHTML = 'Save';

      return;

    case (e.target.matches('.task__save')) :
      e.target.closest('.task').children[1].setAttribute('readonly', true);
      e.target.closest('.task').children[2].classList.add('task__edit');
      e.target.closest('.task').children[2].classList.remove('task__save');
      e.target.closest('.task').children[2].innerHTML = 'Edit';

      return;

    case (e.target.matches('.task__toggler')) :
      e.target.closest('.task').children[2].classList.remove('task__toggler');
      e.target.closest('.task').children[2].classList.add('task__toggler--done');

      return;

    case (e.target.matches('#label')) :
      e.target.closest('.round').closest('.task').children[0].style.backgroundColor = 'rgba(136,202,108, 0.2)';
      e.target.closest('.round').closest('.task').children[1].style.backgroundColor = 'rgba(136,202,108, 0.2)';
      e.target.closest('.round').closest('.task').children[2].style.backgroundColor = 'rgba(136,202,108, 0.2)';
      e.target.closest('.round').closest('.task').children[3].style.backgroundColor = 'rgba(136,202,108, 0.7)';
      e.target.closest('.round').closest('.task').style.backgroundColor = 'rgba(136,202,108, 0.7)';
      e.target.closest('.round').closest('.task').children[1].style.textDecoration = 'line-through';
  
    return;
  }
});

