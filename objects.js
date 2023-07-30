// constructor de objetos
class Task {
    constructor(id, description, completed) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
}
const tasks = [];

//recibe la tarea y la agrega a la matriz Tasks
const addTask = function(task) {
    tasks.push(task)
}
//devuelve la matriz de la lista de tareas compelta 
const listTask = function() {
    return tasks
}

const deleteTask = function(id) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }
}

const repeateTask = function(id) {
    return tasks.some(task => task.id === id);
};

const completeTask = function(id) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.completed = true;
    }
}

module.exports = {Task, tasks, addTask, listTask, deleteTask, repeateTask, completeTask}