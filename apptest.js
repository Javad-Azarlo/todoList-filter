const add_button = document.querySelector(".add-button");
const edit_button = document.querySelector(".edit-button")
const task_input = document.getElementById("task-input");
const date_input = document.getElementById("date-input");
const table_tbody = document.querySelector("table");
const tbody = document.querySelector("tbody");
let lcl_strg = JSON.parse(localStorage.getItem("arry_todo")) || [];
const delete_all_btn = document.getElementById("delete-all-btn");
const alert_message = document.getElementById("alert-message");
const filter_todos = document.querySelectorAll(".filter-todos")
let completed = false;
let rando_id = Math.round(Math.random() * Math.random() * Math.pow(10 , 15)).toString();
const alertMessage = ((inner , cls) => {
    alert_message.innerHTML = "";
    const p_alert = document.createElement("p");
    p_alert.innerText = inner;
    p_alert.classList.add("alert")
    p_alert.classList.add(`alert-${cls}`)
    alert_message.append(p_alert);
    setTimeout(() => {
        p_alert.style.display = "none"
    }, 2000);
})
 
 
 const saveToLcal = ()=>{
    localStorage.setItem("arry_todo" , JSON.stringify(lcl_strg));
 }
const addButton =() =>{
    const task_inputval = task_input.value;
    const date_inputval = date_input.value;
    rando_id++;
    if(task_inputval){
        const obj_todo = {
            task : task_inputval,
            date : date_inputval || "No data",
            id :rando_id,
            completed
        }
        lcl_strg.push(obj_todo);
        saveToLcal()
        showTodo();
        task_input.value = "";
        date_input.value = "";
    }
    else{
        alertMessage("لسفا تسکی را وارد کنید" , "success");
       }
}
const showTodo =(data)=>{
    const todo_tr =data || lcl_strg;
    tbody.innerHTML = "";
    if(todo_tr.length ===0){
        tbody.innerHTML = `<tr><td colspan="4">No Task Resualt</td></tr>`;
    }
    todo_tr.forEach(element => {
        tbody.innerHTML +=`
        <tr>
            <td>${element.task}</td>
            <td>${element.date}</td>
            <td>${element.completed ? "Compeleted" : "Pending"}</td>
            <td>
                <button onclick="editItem('${element.id}')">Edit</button>
                <button onclick="doItem('${element.id}')">${element.completed ? "Undo" : "Do"}</button>
                <button onclick="delItem('${element.id}')">Delete</button>
            </td>
        </tr>
        `
    });
}
const editItem = (e) => {
    const lcl_del = lcl_strg;
    const lcl_strg_find = lcl_del.find(item => {
        return item.id == e;
    })
    task_input.value = lcl_strg_find.task
    date_input.value = lcl_strg_find.data;
    add_button.style.display = "none";
    edit_button.style.display = "block";
    edit_button.dataset.id = e;
}
const editButton = (e) =>{
    const data_id = e.target.dataset.id;
    const tbody_new = lcl_strg.find(element => {
        return element.id == data_id;
    });
    tbody_new.task = task_input.value;
    tbody_new.data = date_input.value;
    saveToLcal();
    showTodo();
    add_button.style.display = "block";
    edit_button.style.display = "none";
    task_input.value = "";
    date_input.value = "";
}
 const delItem = (e) => {
    const lcl_del = lcl_strg;
    const lcl_strg_find = lcl_del.findIndex(item => {
        return item.id == e;
    })
    lcl_del.splice(lcl_strg_find , 1);
    saveToLcal();
    showTodo();
 }
 const doItem = (e)=>{
    const lcl_edit = lcl_strg;
    const lcl_edit_find = lcl_edit.find(item => {
       return item.id == e;
    })
    lcl_edit_find.completed = !lcl_edit_find.completed;
    saveToLcal();
    showTodo();
 }
 const deleteAllBtn = () =>{
    // localStorage.clear(); 
    if(lcl_strg.length){
        lcl_strg = [];
        saveToLcal();
        tbody.remove();
        alertMessage("با موفقیت حذف شد" , "success");
        const tbody_nww = document.createElement("tbody");
        tbody_nww.innerHTML = `<tr><td colspan="4">No Task Resualt</td></tr>`;
        table_tbody.prepend(tbody_nww)
    }
    else{
        alertMessage("محتوایی وجود ندارد" , "error");
    }
 
 }
    const filterTodos = (e) => {
        const dataset_e = e.target.dataset.fill;
        if(dataset_e === "Pending"){
            const pending_filter = lcl_strg.filter(item => item.completed === false);
            showTodo(pending_filter);
        }
        else if(dataset_e === "Compeleted"){
            const pending_filter = lcl_strg.filter(item => item.completed === true);
            showTodo(pending_filter);
        }
        else{
            showTodo();
        }
        console.log(dataset_e)
    }
 filter_todos.forEach(item =>{
    item.addEventListener("click" , filterTodos)
 })
window.addEventListener("load" , () => showTodo())

delete_all_btn.addEventListener("click" , deleteAllBtn)
add_button.addEventListener("click" , addButton);
edit_button.addEventListener("click" , editButton)