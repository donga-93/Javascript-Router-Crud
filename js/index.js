document.addEventListener('DOMContentLoaded', function() {

  const container  = document.querySelector('#blogs')
  const taskURL = `http://localhost:3000/tasks`
  const taskForm = document.querySelector('#task-form')
  let allTasks = []

  fetch(`${taskURL}`)
    .then( response => response.json() )
    .then( taskData => taskData.forEach(function(task) {
      allTasks = taskData
      container.innerHTML += `
      <div id=task-${task.id}>
        <h2>Title:${task.title}</h2>
        <h4>Description: ${task.description}</h4>
        <p>Status:${task.status}</p>
        <button style="background-color:blue; font-size:18px; color: white; cursor: pointer" data-id=${task.id} id="edit-${task.id}" data-action="edit">Edit</button>
        <button style="background-color:red; font-size:18px; color: white; cursor: pointer" data-id=${task.id} id="delete-${task.id}" data-action="delete">Delete</button>
      </div>
      <div id=edit-task-${task.id}>
      </div>`
    })) // end of book fetch


    taskForm.addEventListener('submit', (e) => {
    event.preventDefault();

    const titleInput = taskForm.querySelector('#title').value
    const authorInput = taskForm.querySelector('#description').value
    const descInput = taskForm.querySelector('#status').value

    fetch(`${taskURL}`, {
      method: 'POST',
      body: JSON.stringify({
        title: titleInput,
        description: authorInput,
        status: descInput
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( response => response.json())
      .then( task => {
        allTasks.push(task)
        container.innerHTML += `
        <div id=task-${task.id}>
          <h2>${task.title}</h2>
          <h4>Author: ${task.author}</h4>
          <p>${task.description}</p>
          <button data-id=${task.id} id="edit-${task.id}" data-action="edit">Edit</button>
          <button data-id=${task.id} id="delete-${task.id}" data-action="delete">Delete</button>
        </div>
        <div id=edit-task-${task.id}>
        </div>`
      })
      window.location.replace('/tasks.html')

  }) // end of eventListener for adding a task

  container.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'edit') {

      const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
      editButton.disabled = true

      const taskData = allTasks.find((task) => {
        return task.id == e.target.dataset.id
      })

      const editForm = container.querySelector(`#edit-task-${e.target.dataset.id}`)
      editForm.innerHTML = `
        <form class='form' id='edit-task' action='index.html' method='post'>
          <form id="task-form">
          <div class="input-group mb-3">
          <span class="badge badge-primary">Title</span>
          <input type="text" required id="edit-title" class="form-control" placeholder="${taskData.title}" aria-label="Username">
       </div>
       <div class="input-group mb-3">
          <span class="badge badge-secondary">Description</span>
          <input type="text" required id="edit-description" class="form-control" placeholder="${taskData.description}" aria-label="Username">
       </div>
       <div class="input-group mb-3">
          <span class="badge badge-success">Status</span>
          <input type="text" required id="edit-status" class="form-control" placeholder="${taskData.status}" aria-label="Username">
       </div>
      <button type="submit" class="btn btn-success btn-block mb-4">Edit Task</button>
        </form>`

        editForm.addEventListener("submit", (e) => {
          event.preventDefault()

          const titleInput = document.querySelector("#edit-title").value
          const authorInput = document.querySelector("#edit-description").value
          const descInput = document.querySelector("#edit-status").value
          const editedTask = document.querySelector(`#task-${taskData.id}`)

          fetch(`${taskURL}/${taskData.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              title: titleInput,
              description: authorInput,
              status: descInput
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then( response => response.json() )
          .then( task => {
            editedTask.innerHTML = `
            <div id=task-${task.id}>
              <h2>${task.title}</h2>
              <h4>Author: ${task.description}</h4>
              <p>${task.status}</p>
              <button data-id=${task.id} id="edit-${task.id}" data-action="edit">Edit</button>
              <button data-id=${task.id} id="delete-${task.id}" data-action="delete">Delete</button>
            </div>
            <div id=edit-task-${task.id}>
            </div>`
            editForm.innerHTML = ""
          })
          window.location.replace('/tasks.html')
      }) // end of this event Listener for edit submit

    } else if (e.target.dataset.action === 'delete') {
      document.querySelector(`#task-${e.target.dataset.id}`).remove()
        fetch(`${taskURL}/${e.target.dataset.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( response => response.json())
        window.location.replace('/tasks.html')
      }

  }) // end of eventListener for editing and deleting a task

})
