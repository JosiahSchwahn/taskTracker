/* Global Query selectors ES6 on window load*/
const addTaskBtn = document.querySelector("button.add-task-button");
const modalPage = document.querySelector(".modal-page")
const closeModal = document.querySelector(".modal-close-button")
const modalExitButton = document.querySelector("button.exit-button")
const formInput = document.querySelector(".task-form")
const taskItemContainer = document.querySelector(".task-items")


/* Task Displays - global scope */
var taskItems = []

function createSVG(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (var p in v)
      n.setAttributeNS(null, p, v[p]);
    return n
  }

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

    /* new item */
    taskItemContainer.appendChild(createTaskItem(taskItem))
   

});

function createTaskItem(taskItem){

    /* creating DOM structure for a taskItem */
    const newTaskContainer = document.createElement("div");
    newTaskContainer.classList.add("task-item-containers");

    const taskName = document.createElement("div");
    taskName.classList.add("task-name")
    taskName.textContent = taskItem.name;
    newTaskContainer.appendChild(taskName);



    const categoryType = document.createElement("div");
    categoryType.classList.add("category-type");
    categoryType.textContent = taskItem.category;
    newTaskContainer.appendChild(categoryType);


    const daysPerWeek = document.createElement("div");
    daysPerWeek.classList.add("days-per-week");
    daysPerWeek.textContent = taskItem.weekFrequency;
    newTaskContainer.appendChild(daysPerWeek);


    const completedToday = document.createElement("div");
    const completedInput = document.createElement("input")
    const completedLabel = document.createElement("label")


    const checkBoxInput = document.createElement("input");
    const checkBoxLabel = document.createElement("label");



    const favSettingsContainer = document.createElement("div");
    favSettingsContainer.classList.add("fav-settings-container")
    newTaskContainer.appendChild(favSettingsContainer);
    


   
    const svg = createSVG("svg", {width:"24",height:"24", viewbox:"0 0 24 24", fill: "none"});
    //Create a path in SVG's namespace
    favSettingsContainer.appendChild(svg);



  

    return newTaskContainer;
}









