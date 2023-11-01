const task_input = document.querySelector("#task-input");
const date_input = document.querySelector("#date-input");
const add_button = document.querySelector(".add-button");
const edit_button = document.querySelector(".edit-button")
const table_doc = document.querySelector(".table").querySelector("tbody");
const delete_all = document.querySelector("#delete-all-btn");
const alert_message = document.querySelector("#alert-message");
const filter_todos = document.querySelectorAll(".filter-todos");
const randomId = () =>{
    return Math.round(Math.random() * Math.random() * Math.pow(10 , 15)).toString();
}
 //add todo func
 //let count_id = 1;
 let todos = JSON.parse(localStorage.getItem("todos")) || [];
//alert message function
const alertMessage = ((message , type) =>{
    alert_message.innerHTML = "";
    const alert = document.createElement("p");
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`)
    alert_message.append(alert);
    setTimeout(()=>{
        alert.style.display = "none";
    }, 5000); })

    //function localstorage
 const saveToLocalStrg = ()=>{
    localStorage.setItem("todos" ,JSON.stringify(todos))
 }
 //function add task
 const addButtonFunc = () =>{
  const vartask_input = task_input.value;
  const vardate_input = date_input.value;
  const todo_obj = {
    //id : count_id.toString(),
    id : randomId(),
    task : vartask_input,
    date : vardate_input,
    completed : false,
  };
  if(vartask_input){
    todos.push(todo_obj);
    saveToLocalStrg();
    displayTodos();
    //count_id++;
 task_input.value = "";
 date_input.value = "";
  console.log(todos)
   alertMessage("با موفقیت اضافه شد" , "success")  }
  else{
    alertMessage("لطفا تسک خود را وارد کنید" , "error")
  }
}
 
//remove todo func
const deleteAllFunc = () =>{
 const prm = confirm("آیا مایل به حذف همه هستید ؟ ") ;
 if(prm){
    if(todos.length){
        todos = [];
        saveToLocalStrg()
        table_doc.remove();
        alertMessage("با موفقیت حذف شد" , "success");
    }
    else{
        alertMessage("محتوایی وجود ندارد " , "error");
    }
    }
};
//function display todos
const displayTodos = (data)=>{
    const todo_list = data || todos;
    table_doc.innerHTML ="";
    if(!todo_list.length ){
        table_doc.innerHTML = "<tr><td colspan='4'>No Task Resualt</td></tr>";
    }
    todo_list.forEach(item =>{
            table_doc.innerHTML +=`
            <tr>
                <td>${item.task}</td>
                <td>${item.date || "No date"}</td>
                <td>${item.completed ? "Compeleted" : "Pending"}</td>
                <td>
                    <button onclick="editItem('${item.id}')">Edit</button>
                    <button onclick="doItem('${item.id}')">
                    ${item.completed ? "Undo" : "Do"}
                    </button>
                    <button onclick="deletItem('${item.id}')">Delete</button>
                </td>
            </tr>
            `
        })
   
}
//delete item table function
const deletItem = (id) =>{
    const new_arrytodo = todos.filter(item => item.id !== id);
    todos = new_arrytodo;
    saveToLocalStrg();
    displayTodos();
    alertMessage("با موفقیت جذف شد" , "success")
  }
  //do item table function
  const doItem = (id) =>{
    const new_todo = todos.find(item =>{
        return item.id === id
    })
    new_todo.completed = !new_todo.completed
    //console.log(new_todo)
    // const new_array = todos.map(item => {
        // if(item.id === id){
            // return{
                // id : item.id,
                // task : item.task,
                // date : item.date,
                // completed : !item.completed
            // };
        // }
        // else{
            // return todos;
        // }
    // });
     saveToLocalStrg();
    displayTodos();
  }
    //edit item table function

  const editItem = (id) =>{
    const new_arryedit = todos.find(item => item.id === id);
    task_input.value = new_arryedit.task;
    date_input.value = new_arryedit.date;
    add_button.style.display = "none";
    edit_button.style.display = "block";
    edit_button.dataset.id = id;
   }
   //applyEdit function
   const applyEdit = (event) =>{
    const idnew = event.target.dataset.id;
    const new_add = todos.find(item => item.id === idnew);
    new_add.task = task_input.value;
    new_add.date = date_input.value;
    task_input.value = "";
    date_input.value = "";
    add_button.style.display = "block";
    edit_button.style.display = "none";
    saveToLocalStrg();
    displayTodos();
    alertMessage("با موفقیت ویرایش شد" , "success");

    }
    const filters = (event)=>{
        let new_filter = null;
        const fil = event.target.dataset.fill;
            if(fil === "Pending"){
                new_filter = todos.filter(item => item.completed === false);
            }
            else if( fil === "Compeleted"){
                new_filter = todos.filter(item => item.completed === true);
            }
        else {
            new_filter = todos;
        }
        displayTodos(new_filter)
     }
    filter_todos.forEach(btn => {
        btn.addEventListener("click" , filters)
    })
    
window.addEventListener("load" , () => displayTodos())
 add_button.addEventListener("click" , addButtonFunc);
delete_all.addEventListener("click" , deleteAllFunc);
edit_button.addEventListener("click" , applyEdit)
 

