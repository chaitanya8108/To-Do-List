// Load existing todos from local storage when the page loads
window.onload = function() {
    loadTodos();
};

// Function to load todos from local storage
function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoList = document.getElementById("todo-list");

    savedTodos.forEach(todo => {
        const li = createTodoItem(todo);
        todoList.appendChild(li);
    });
}

// Function to add a todo item
function addTodo() {
    const input = document.getElementById("todo-input");
    const todoText = input.value.trim();
    const addBtn = document.querySelector("#addBtn");

    if (todoText !== "") {
        const todoList = document.getElementById("todo-list");

        // Create a new list item
        const li = createTodoItem(todoText);
        todoList.appendChild(li);

        // Save to local storage
        saveTodoToLocalStorage(todoText);

        // Clear the input box
        input.value = "";
    }
}

// Function to create a todo item (li element with edit/delete buttons)
function createTodoItem(todoText) {
    const li = document.createElement("li");
    li.textContent = todoText;

    // Create the edit button
    const editBtn = document.createElement("button");
    editBtn.setAttribute("id", "editBtn");
    editBtn.textContent = "Edit";
    editBtn.onclick = function() {
        const input = document.getElementById("todo-input");
        input.value = li.firstChild.textContent;
        const addBtn = document.querySelector("#addBtn");
        addBtn.innerText = "Edit";
        addBtn.onclick = function() {
            const newTodoText = input.value.trim();
            li.firstChild.textContent = newTodoText;
            addBtn.innerText = "Add";
            input.value = "";
            addBtn.onclick = addTodo;

            // Update local storage
            updateTodoInLocalStorage(li.firstChild.textContent, newTodoText);
        };
    };

    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "delBtn");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
        const todoList = document.getElementById("todo-list");
        todoList.removeChild(li);
        // Remove from local storage
        deleteTodoFromLocalStorage(todoText);
    };

    // Create a div for the buttons
    const div = document.createElement("div");
    div.setAttribute("id", "btn-container");

    // Append edit and delete buttons in a div
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    // Append div to the list item
    li.appendChild(div);

    return li;
}

// Save a new todo to local storage
function saveTodoToLocalStorage(todoText) {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

// Update an existing todo in local storage
function updateTodoInLocalStorage(oldTodoText, newTodoText) {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoIndex = savedTodos.indexOf(oldTodoText);
    if (todoIndex > -1) {
        savedTodos[todoIndex] = newTodoText;
    }
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

// Delete a todo from local storage
function deleteTodoFromLocalStorage(todoText) {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = savedTodos.filter(todo => todo !== todoText);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));   
}

// Create the reset functionality
const h1 = document.querySelector("h1");
h1.onclick = function() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    localStorage.removeItem("todos"); // Clear local storage
};

// Allow adding a todo when pressing the Enter key
// document.getElementById("todo-input").addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         addTodo();
//     }
// });


// Changing the body color on every click on body
const body = document.querySelector("body");

const bodyCol = () => {
    const colors = [
        "linear-gradient(90deg, hsla(141, 54%, 86%, 1) 0%, hsla(333, 73%, 85%, 1) 50%, hsla(211, 58%, 79%, 1) 100%)",
        "linear-gradient(90deg, hsla(313, 39%, 93%, 1) 0%, hsla(320, 78%, 79%, 1) 50%, hsla(193, 81%, 84%, 1) 100%)",
        "linear-gradient(90deg, hsla(200, 70%, 80%, 1) 0%, hsla(160, 60%, 70%, 1) 50%, hsla(120, 50%, 60%, 1) 100%)",
        "linear-gradient(90deg, hsla(120, 60%, 90%, 1) 0%, hsla(180, 70%, 80%, 1) 50%, hsla(240, 60%, 70%, 1) 100%)",
        "linear-gradient(90deg, hsla(60, 50%, 90%, 1) 0%, hsla(100, 60%, 80%, 1) 50%, hsla(40, 70%, 70%, 1) 100%)",
        "linear-gradient(90deg, hsla(10, 60%, 90%, 1) 0%, hsla(30, 70%, 80%, 1) 50%, hsla(50, 60%, 70%, 1) 100%)"
    ];

    let rndCol = Math.floor(Math.random() * colors.length); // Generate a random index

    // Apply the random background color
    body.style.background = colors[rndCol];
};

// Add event listener for mouseover
body.addEventListener("click", bodyCol);



