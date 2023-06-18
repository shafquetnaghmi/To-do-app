let form = document.getElementById("form");
let text = document.getElementById("textInput");
let date = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementsByClassName("tasks")[0];
let errorVal=document.getElementById('error-val')
let add=document.getElementById('add')

form.addEventListener("submit", function (event) {
  event.preventDefault();
  formValidation()
  
});


let formValidation = () =>{
    if (text.value ===''){
     errorVal.innerHTML='Title cannot be empty'
    }
    else{
        acceptdata();
        resetForm();
        add.setAttribute("data-bs-dismiss","modal")
        add.click();

        (function(){
            add.setAttribute("data-bs-dismiss","")
        })();
        
    }

}

let data =[];
//console.log(JSON.parse(localStorage.getItem('data'))[0].text
console.log(localStorage.getItem('data').length)
// (function (){
//     console.log(JSON.parse(localStorage.getItem('data'))[0].text)
// })();


let acceptdata = () => {
    data.push({
        text:text.value,
        date:date.value,
        textarea:textarea.value,
    })
  localStorage.setItem('data',JSON.stringify(data))
  console.log(data);
 
  showData();
  
};

let showData = () => {

  for (let i=0; i<localStorage.length; i++){
    // console.log(i)
    // console.log((JSON.parse(localStorage.getItem('data'))[i].text))
    tasks.innerHTML += `
    <div id=${i}>
                <span>${(JSON.parse(localStorage.getItem('data'))[i].text)}</span>
            <span>${(JSON.parse(localStorage.getItem('data'))[i].date)}</span>
            <p>${(JSON.parse(localStorage.getItem('data'))[i].textarea)}</p>
            <span class="options">
                <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                <i onclick="deleteTask(this)" class="fa-solid fa-trash"></i>
            </span>
    </div>
            `;

  }
 
    

};


let resetForm= () =>{
    text.value="";
    date.value="";
    textarea.value="";

}
let editTask=(event) =>{
    
    let selectedTask=event.parentElement.parentElement;

    text.value=selectedTask.children[0].innerHTML;
    date.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;
    selectedTask.remove();
}

let deleteTask=(event) =>{
event.parentElement.parentElement.remove()
//localStorage.removeItem(('data')[event.parentElement.parentElement.id])
localStorage.setItem('data',JSON.stringify(data))

}

(() =>{
    showData();
})();