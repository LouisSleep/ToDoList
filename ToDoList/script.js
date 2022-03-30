// Selectors
const text = document.querySelector('.AddText')
const buttonAdd = document.querySelector('.AddButton')
const TaskList = document.querySelector('.TaskList')

// Event Listener


// function Add Task
function AddSomeTask(){
    // Create li
    const TaskTitle = document.createElement('li')
    TaskTitle.classList= 'todo-li'
    TaskList.appendChild(TaskTitle)
    
    // Add value from input into todo-li
    const TextValue = document.createTextNode(text.value)
    TaskTitle.appendChild(TextValue)

    // Create Markbutton
    const ButtonMarkTask =  document.createElement('button')
    ButtonMarkTask.classList='MarkButton'
    ButtonMarkTask.innerHTML = '<i class="fa-solid fa-check"></i>'
    TaskTitle.appendChild(ButtonMarkTask)

    // Create Deletebutton
    const ButtonDeleteTask =  document.createElement('button')
    ButtonDeleteTask.classList='ButtonDelete'
    ButtonDeleteTask.innerHTML = '<i class="fa-solid fa-circle-minus"></i>'
    TaskTitle.appendChild(ButtonDeleteTask)

    // Delete Button Action
    ButtonDeleteTask.addEventListener('click',Delete)

    // Checked Button Action
    ButtonMarkTask.addEventListener('click',checked)
    

    // Clear Input section
    text.value=''

}


function Delete(e){
    const element = e.target
    // delete element
    if(element.classList[0]==='ButtonDelete'){
        const Task = element.parentElement
        Task.classList.add('deleteAnimation')
        Task.addEventListener('transitionend',function(){
            Task.remove()
        })
        
    }
}


function checked(e){
    const element = e.target
    // checked element
    if(element.classList[0]==='MarkButton'){
        const Task = element.parentElement
        Task.classList.toggle('checked')
    }
}


