"use strict";

//variables

const form = document.querySelector(".form");
const input = document.querySelector(".input__input");
const inputWrap = document.querySelector(".input");
const task = document.querySelector(".task");
const edit = document.querySelector(".Task__edit");
const deleteTask = document.querySelector(".task__delete");
const noTask = document.querySelector(".noTaskLeft");
const deleteAll = document.querySelector(".deleteAll");
const allTasks = document.querySelectorAll(".task");
const label = document.getElementById(".label");
const pattern = document.querySelector('.pattern');
const clearDone = document.querySelector('.clearDone');

//colors

const turquoise = "rgba(139,142,213, 1)";
const orange = "rgba(251, 162, 143, 1)";
const orange_hover = "rgba(249,81,46, 0.8)";
const white = "rgb(245, 255, 250)";
const light_green = "rgba(143,188,143, 1)";

const animateToZero = [
  {opacity: '0'}
];

const animateToOne = [
  {opacity: '1'}
];

const animation = {
  duration: 1000,
  iterations: 1,
}

const appearance = {
  duration: 1000,
  iterations: 1,
  animationFillMode: "forwards",
}

form.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') {
    return;
  }

  addTask();
});

document.querySelector('.page').addEventListener('click', (e) => {
  const check = document.querySelectorAll('.task__save');
  
  if (!e.target.matches('.task__save') && check.length > 0){
    clearEdits();
  }
  
});

//delete button

deleteAll.addEventListener("click", () => {
  const allTasks = document.querySelectorAll(".task");
  let i = 0;
  for (const key of allTasks) {

      key.animate(animateToZero, animation);

      setTimeout(() => {
        key.closest(".task").remove();
        taskChecker();
      }, 900 + i);

      i = i + 30;
  }
});

//clearDone buton 

clearDone.addEventListener("click", () => {
  const allTasks = document.querySelectorAll(".done");
  let i = 0;
  for (const key of allTasks) {

      key.animate(animateToZero, animation);

      setTimeout(() => {
        key.closest(".task").remove();
        taskChecker();
      }, 900 + i);

      i = i + 30;
  }
});

//all click task checker

function taskChecker() {
  let tasksCounter = form.children.length - 5;

  function check() {
    switch(true) {
      
      case (form.children.length === 6) :
        noTask.innerHTML = `You have 1 task to do`;
        deleteAll.animate(animateToOne, appearance);
        deleteAll.removeAttribute('disabled');
        clearDone.animate(animateToOne, appearance);
        clearDone.removeAttribute('disabled');
        setTimeout(() => {
          deleteAll.style.opacity = '1';
          clearDone.style.opacity = '1';
        }, 900);

        return;

      case (form.children.length > 6) :
        (noTask.innerHTML = `You have ${tasksCounter} tasks to do`);

        return;

      default :
        (noTask.innerHTML = 'You have nothing for today');
        deleteAll.animate(animateToZero, animation);
        deleteAll.setAttribute('disabled', true);
        clearDone.animate(animateToZero, animation);
        clearDone.setAttribute('disabled', true);
        setTimeout(() => {
          deleteAll.style.opacity = '0';
          clearDone.style.opacity = '0';
        }, 900);

        return;
    }
  }

  check();
}

//add task

inputWrap.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.matches(".input__cleaner")) {
    input.value = "";
  }

  if (e.target.matches(".input__button")) {
    if (input.value.length < 1) {
      pattern.animate(animateToOne, animation);
      input.focus();

      return;
    }

    addTask();
  }
});

//form events

form.addEventListener("click", (e) => {
  e.preventDefault();

  switch (true) {
    case e.target.matches(".task__delete"):
      const animate = [
        {opacity: '0'}
      ];

      const animation = {
        duration: 1000,
        iterations: 1,
      }

      e.target.closest(".task").animate(animate, animation);

      setTimeout(() => {
        e.target.closest(".task").remove();
        taskChecker();
      }, 1000);

      return;

    case e.target.matches(".task__edit"):
      clearEdits();
      const target = e.target.closest(".task").children[1];
      let value = e.target.closest(".task").children[1].value;
      target.removeAttribute("readonly");
      target.focus();
      target.value = "";
      target.value = value;
      e.target.closest(".task").children[2].classList.add("task__save");
      e.target.closest(".task").children[2].classList.remove("task__edit");
      e.target.closest(".task").children[2].innerHTML = "Save";

      return;

    case e.target.matches(".task__save"):
      e.target.closest(".task").children[1].setAttribute("readonly", true);
      e.target.closest(".task").children[2].classList.add("task__edit");
      e.target.closest(".task").children[2].classList.remove("task__save");
      e.target.closest(".task").children[2].innerHTML = "Edit";

      return;

    case e.target.matches(".task__toggler"):
      e.target.closest(".task").children[2].classList.remove("task__toggler");
      e.target
        .closest(".task")
        .children[2].classList.add("task__toggler--done");

      return;

    case ((e.target.matches("#label") &&
    !e.target.matches('.label__active'))):

      const doneMarker = e.target.closest('.task');

      doneMarker.style.backgroundColor = light_green;
      doneMarker.children[1].style.backgroundColor = light_green;
      doneMarker.children[2].style.backgroundColor = light_green;
      doneMarker.children[1].style.textDecoration = "line-through";
      doneMarker.children[2].style.textDecoration = "line-through";
      doneMarker.children[2].setAttribute('disabled', true);
      doneMarker.classList.add('done');
      return;

  }
});


function clearEdits() {
  const allTheTasks = document.querySelectorAll(".task");
      for (const task of allTheTasks) {
        task.children[1].setAttribute("readonly", true);
        task.children[2].classList.add("task__edit");
        task.children[2].classList.remove("task__save");
        task.children[2].innerHTML = "Edit";
      }
}

function addTask() {
  form.insertAdjacentHTML(
    "beforeend",
    `
  <div class="task">
  <div class="round">
    <input type="checkbox" checked id="checkbox" class=".input__orange">
    <label for="checkbox" id="label" class="label__orange"></label>
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
  `
  );

  input.value = "";
  input.focus();
  taskChecker();
}
