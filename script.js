const input = document.getElementById('input');
const btn = document.getElementById('btn');
const ul = document.getElementById('ul');
const data = [];
const number = document.getElementById('number');

const createTaskList = () => {
    const task = input.value;

    if(!task) {
        return;
    }

    const li = document.createElement('li');
    const div = document.createElement('div');
    const del = document.createElement('button');
    const complete = document.createElement('button');
    const span = document.createElement('span');

    del.innerText = 'Delete';
    del.classList.add('btn', 'btn__delete');
    complete.innerText = 'Complete';
    complete.classList.add('btn', 'btn__outline');
    li.classList.add('task');
    span.innerText = task;
    li.appendChild(span);
    li.appendChild(div);
    div.classList.add('button-container');
    div.appendChild(complete);
    div.appendChild(del);
    ul.appendChild(li);
    
    const taskObj = { id: Date.now(), text: task, completed: false };
    data.push(taskObj);
    del.addEventListener('click', () => {
        li.remove();
        const index = data.findIndex(t => t.id === taskObj.id);
        data.splice(index, 1);
        updateCounter();
    });
    complete.addEventListener('click', () => {
        span.classList.toggle('completed');
        taskObj.completed = !taskObj.completed;
        updateCounter();
    });
    li.id = taskObj.id
    input.value = '';
}

const updateCounter = () => {
    const remaining = data.filter(t => !t.completed).length;
    number.innerText = remaining;
}

btn.addEventListener('click', () => {
    createTaskList()
    updateCounter();
});

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    createTaskList()
    updateCounter();
  }
});

updateCounter();