const apiUrl = "http://localhost:5168/api/Todo";

let currentFilter="all";

function toggleDark(){

document.body.classList.toggle("dark");

}

async function loadTodos(){

const res = await fetch(apiUrl);
const todos = await res.json();

const list = document.getElementById("todoList");
list.innerHTML="";

todos
.filter(todo=>{

if(currentFilter==="active") return !todo.isCompleted;
if(currentFilter==="completed") return todo.isCompleted;

return true;

})
.forEach(todo=>{

const priorityClass =
todo.priority==3?"high":
todo.priority==2?"medium":"low";

const priorityText =
todo.priority==3?"High":
todo.priority==2?"Medium":"Low";

const li=document.createElement("li");

li.innerHTML=`

<div>

<span class="${todo.isCompleted?"completed":""}">
${todo.title}
</span>

<span class="priority ${priorityClass}">
${priorityText}
</span>

</div>

<div class="actions">

<button onclick="editTodo(${todo.id},'${todo.title}')">
Edit
</button>

<button onclick="completeTodo(${todo.id})">
Complete
</button>

<button onclick="deleteTodo(${todo.id})">
Delete
</button>

</div>

`;

list.appendChild(li);

});

}

function filterTodos(type){

currentFilter=type;
loadTodos();

}

function searchTodo(text){

const items=document.querySelectorAll("#todoList li");

items.forEach(item=>{

const title=item.innerText.toLowerCase();

item.style.display=
title.includes(text.toLowerCase())?"flex":"none";

});

}

async function addTodo(){

const input=document.getElementById("taskInput");
const priority=document.getElementById("priority");

if(input.value.trim()==="") return;

const todo={

title:input.value,
isCompleted:false,
priority:parseInt(priority.value)

};

await fetch(apiUrl,{

method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(todo)

});

input.value="";
loadTodos();

}

async function deleteTodo(id){

await fetch(`${apiUrl}/${id}`,{

method:"DELETE"

});

loadTodos();

}

async function completeTodo(id){

const res=await fetch(apiUrl);
const todos=await res.json();

const todo=todos.find(t=>t.id===id);

todo.isCompleted=!todo.isCompleted;

await fetch(`${apiUrl}/${id}`,{

method:"PUT",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(todo)

});

loadTodos();

}

async function editTodo(id,title){

const newTitle=prompt("Edit task",title);

if(!newTitle) return;

const res=await fetch(apiUrl);
const todos=await res.json();

const todo=todos.find(t=>t.id===id);

todo.title=newTitle;

await fetch(`${apiUrl}/${id}`,{

method:"PUT",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(todo)

});

loadTodos();

}

loadTodos();