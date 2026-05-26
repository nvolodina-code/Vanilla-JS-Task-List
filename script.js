const input = document.getElementById('input');
const btn = document.getElementById('btn');
const ul = document.getElementById('ul');
const number = document.getElementById('number');
let tasks = [];
const saved = localStorage.getItem('tasks');
    if(saved) {
        tasks = JSON.parse(saved);
    }


const addTask = () => {
    const text = input.value.trim();
    if (!text) return;

    tasks.push({ id: Date.now(), text, completed: false });
    input.value = '';
    
    updateUI();
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    updateUI();
};

const toggleComplete = (id) => {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateUI();
};

const updateUI = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    ul.innerHTML = tasks.map(task => `
        <li class="task" id="${task.id}">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="button-container">
                <button class="btn btn__outline" onclick="toggleComplete(${task.id})">Complete</button>
                <button class="btn btn__delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </li>
    `).join('');
    

    const remaining = tasks.filter(t => !t.completed).length;
    number.innerText = remaining;
};

btn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

updateUI();