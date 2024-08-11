// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

    if (nextId === null) {
        nextId = 1;
    } else {
        nextId++;
    }
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return nextId - 1;
    
}

// Todo: create a function to create a task card
function createTaskCard(task) {

    const card = $(`
        <div class="task-card" data-id="${task.id}">
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        </div>
    `);

    card.find('.delete-btn').on('click', handleDeleteTask);
    card.find('.edit-btn').on('click', function() {

    });

    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    const container = $('#task-container');
    container.empty();

    taskList.forEach(task => {
        const card = createTaskCard(task);
        card.draggable({
            helper: "clone",
            start: function(event, ui) {
               
            }
        });
        container.append(card);
    });

    $('.status-lane').droppable({
        accept: ".task-card",
        drop: handleDrop
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

    event.preventDefault();

    const title = $('#task-title').val();
    const description = $('#task-description').val();
    const id = generateTaskId();

    const newTask = {
        id: id,
        title: title,
        description: description,
        status: 'todo'
    };

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
