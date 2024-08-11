// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
    const id = nextId;
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

// Function to create a task card
function createTaskCard(task) {
    const card = $(`
        <div class="task-card card mb-3" data-id="${task.id}">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description || 'No description'}</p>
                <button class="btn btn-danger delete-btn">Delete</button>
            </div>
        </div>
    `);

    card.find('.delete-btn').on('click', handleDeleteTask);
    return card;
}

// Function to render the task list
function renderTaskList() {
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    taskList.forEach(task => {
        const card = createTaskCard(task);
        card.draggable({
            helper: "clone",
            start: function(event, ui) {
                // Optional: Set additional properties or data when dragging starts
            }
        });

        const lane = `#${task.status}-cards`;
        $(lane).append(card);
    });

    $('.lane').droppable({
        accept: ".task-card",
        drop: handleDrop
    });
}

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const title = $('#task-name-input').val();
    const description = $('#task-description-input').val();
    const dueDate = $('#task-due-date-input').val();
    
    if (title.trim() === '') {
        alert('Task name is required.');
        return;
    }

    const id = generateTaskId();

    const newTask = {
        id: id,
        title: title,
        description: description || 'No description',
        status: 'todo',
        dueDate: dueDate
    };

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    $('#formModal').modal('hide'); // Close the modal after adding the task
    renderTaskList();
}

// Function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).closest('.task-card').data('id');

    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = $(ui.helper).data('id');
    const newStatus = $(event.target).closest('.lane').attr('id').replace('-cards', '');

    const task = taskList.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
        localStorage.setItem('tasks', JSON.stringify(taskList));
        renderTaskList();
    }
}

// Initialize the page
$(document).ready(function () {
    renderTaskList();

    $('#new-task-btn').on('click', function() {
        $('#formModal').modal('show');
    });

    $('#new-task-form').on('submit', handleAddTask);

    $('.lane').droppable({
        accept: ".task-card",
        drop: handleDrop
    });
});
