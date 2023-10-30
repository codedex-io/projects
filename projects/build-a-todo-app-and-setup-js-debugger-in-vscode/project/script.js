/*
Project memory. This will contain all the todos that are created by the user.

todo={
    todoTitle,
    todoNumOfPeople,
    todoDate,
    todoDescription,
    isEditting
}
*/
let todos = [];
let errors = [];
let todoListElement = document.getElementById("todo-list");
let editForm = document.getElementById("editForm");
function addTodo(event, todos, validateCallback) {
  event.preventDefault();
  const todoTitle = event.target[0].value;
  const todoNumOfPeople = event.target[1].value;
  const todoDate = new Date(event.target[2].value);
  const todoDescription = event.target[3].value;
  const todo = {
    todoTitle,
    todoNumOfPeople,
    todoDate,
    todoDescription,
  };
  errors = validateCallback(todo, errors);
  if (errors.length > 0) {
    alert("Uh oh! There are some errors in your form \n" + errors.join("\n"));
    return todos;
  }
  const newTodos = [...todos, todo];
  return newTodos;
}

function renderTodos(todos) {
  const todoListHTML = todos
    .map((todo, index) => generateTodoHTML(todo, index))
    .join("");
  todoListElement.innerHTML = todoListHTML;
}

function generateTodoHTML(todo, index) {
  return `
   <div data-se=${index} class="card-body my-2 p-2 border dorder-dark">
    <h5 class="card-title">${todo.todoTitle}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${todo.todoDate}</h6>
    <h6 class="card-subtitle mb-2 text-muted">${todo.todoNumOfPeople}</h6>
    <p class="card-text">${todo.todoDescription}</p>
    <button type="click" id="done" class="btn btn-success">Done</button>
    </div>
</div>    
    `;
}

function completeTodo(todos, todoId) {
  todos.splice(todoId, 1);
  return todos;
}

function validateTodo(todo, errors) {
  errors = [];
  if (todo.todoTitle.length < 5) {
    errors.push("Todo title must be at least 5 characters long");
  }
  if (todo.todoNumOfPeople < 1) {
    errors.push("Number of people must be greater than 0");
  }
  if (todo.todoDate == "Invalid Date") {
    errors.push("Date must be in the format of YYYY-MM-DD");
  }
  if (todo.todoDate.getTime() < Date.now()) {
    errors.push("Date must be in the future");
  }
  if (todo.todoDescription.length < 10) {
    errors.push("Description must be at least 10 characters long");
  }
  return errors;
}

document.getElementById("submitTodo").addEventListener("submit", (event) => {
  todos = addTodo(event, todos, validateTodo);
  renderTodos(todos);
});

document.getElementById("todo-list").addEventListener("click", (event) => {
  if (event.target.id === "done") {
    todos = completeTodo(
      todos,
      event.target.parentElement.getAttribute("data-se")
    );
    renderTodos(todos);
  }
});
