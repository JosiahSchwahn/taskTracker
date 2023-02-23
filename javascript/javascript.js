/* Global Query selectors ES6 on window load*/
const addTaskBtn = document.querySelector("button.add-task-button");
const modalPage = document.querySelector(".modal-page")
const closeModal = document.querySelector(".modal-close-button")
const modalExitButton = document.querySelector("button.exit-button")
const formInput = document.querySelector(".task-form")
const taskItemContainer = document.querySelector(".task-items")


/* Task Displays - global scope */
var taskItems = []

/*Enum for category types */
const categoryTypes = {
    health: "Health",
    rest: "Rest",
    work: "Work",
    community: "Community",
    discovery: 'Discovery'
}
/*object constructor for taskItems */
class Task{
    constructor(){
        this.name = undefined
        this.category = undefined;
        this.weekFrequency = undefined;
        this.completedToday = false;
        this.favorite = false;
    }
}

addTaskBtn.addEventListener(`click`, function(){
    modalPage.classList.add('show');
});

[closeModal,modalExitButton].forEach(function(element) {
    element.addEventListener("click", function() {
        modalPage.classList.remove('show');
    });
});

formInput.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formData = new FormData(formInput);
    const taskItem = new Task();
    formData.forEach((value, key) => {
        /* checks to see what values need to be mapped to a number,
        all others are put into object as a string */
        if(key === "weekFrequency"){
            taskItem[key] = parseInt(value);
        } else{        /*console.log(key);*/
            (taskItem[key] = value)
        }   
    });
    taskItems.push(taskItem);
    console.log(taskItems);
    modalPage.classList.remove('show');


    /* creating DOM structure for a taskItem */
    const newTaskContainer = document.createElement("div");
    newTaskContainer.classList.add("task-item-containers");

    const taskName = document.createElement("div");
    taskName.classList.add("task-name")
    taskName.textContent = taskItem.name;
    newTaskContainer.appendChild(taskName);


    const categoryType = document.createElement("div");
    const daysPerWeek = document.createElement("div");
    const completedToday = document.createElement("div");
    const favSettingsContainer = document.createElement("div");
    
    taskItemContainer.appendChild(newTaskContainer);


    

});

// function definition to create a new element
const creatingMenuItems = (name) => {
    let liElement = document.createElement("div");
    divElement.textContent = name;
    return divElement;
  };








