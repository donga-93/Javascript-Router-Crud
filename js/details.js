// const id = new URLSearchParams(window.location.search).get('id');
// const container = document.querySelector('.details');
// const deleteBtn = document.querySelector('.delete');

// const renderDetails = async () => {
//     const res = await fetch('http://localhost:3000/tasks/' + id);
//     const tasks = await res.json();

//     const template = `
//     <h1>${tasks.title}</h1>
//     <h1>${tasks.status}</h1>
//     <p>${tasks.description}</p>
//   `
//   container.innerHTML = template;

// }

// deleteBtn.addEventListener('click', async (e) => {
//   const res = await fetch('http://localhost:3000/tasks/' + id, {
//     method: 'DELETE'
//   })
//   window.location.replace('/tasks.html');
// })


// window.addEventListener('DOMContentLoaded', () => renderDetails());