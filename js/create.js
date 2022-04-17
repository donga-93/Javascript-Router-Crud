// const form = document.querySelector('form');

// const createPost = async (e) => {
//     e.preventDefault();

//     const doc = {
//         title: form.title.value,
//         description: form.description.value,
//         status: form.status.value
//     }
//     await fetch('http://localhost:3000/tasks', {
//         method: 'POST',
//         body: JSON.stringify(doc),
//         headers: { 'Content-Type': 'application/json' }
//       })
//       window.location.replace('/tasks.html')


// }

// form.addEventListener('submit', createPost);