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

function updateTextCounter(){

    const taskCounter = document.querySelector(".task-counter")
    taskCounter.textContent = `Task ${taskItems.length} / 5`;

}


function createTaskItem(taskItem){
    /* creating DOM structure for a taskItem */
    if (taskItems.length > 5){

        alert("The maximum amount of tasks is 5")

    } else {

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


        const favSettingsContainer = document.createElement("div");
        favSettingsContainer.classList.add("fav-settings-container")
        newTaskContainer.appendChild(favSettingsContainer);
        const svg = createSVG("svg", {width:"14",height:"4", viewbox:"0 0 14 4"});
        //Create a path in SVG's namespace
        /* refactor this - adding settings icon to delete and edit task */
        var svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
        var svgPath2 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
        var svgPath3 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
        svgPath.setAttributeNS(null, "d", "M13.4874 0.512567C12.804 -0.170848 11.696 -0.170848 11.0126 0.512567C10.3291 1.19598 10.3291 2.30402 11.0126 2.98744C11.696 3.67085 12.804 3.67085 13.4874 2.98744C14.1709 2.30405 14.1709 1.19601 13.4874 0.512567Z");
        svgPath2.setAttributeNS(null, "d", "M8.23744 0.512567C7.55402 -0.170848 6.44598 -0.170848 5.76257 0.512567C5.07915 1.19598 5.07915 2.30402 5.76257 2.98744C6.44598 3.67085 7.55402 3.67085 8.23744 2.98744C8.92085 2.30405 8.92085 1.19601 8.23744 0.512567Z");
        svgPath3.setAttributeNS(null, "d", "M2.98744 0.512567C2.30402 -0.170848 1.19598 -0.170848 0.512564 0.512567C-0.170852 1.19598 -0.170852 2.30402 0.512564 2.98744C1.19598 3.67085 2.30402 3.67085 2.98744 2.98744C3.67085 2.30405 3.67085 1.19601 2.98744 0.512567Z");
        svg.appendChild(svgPath);
        svg.appendChild(svgPath2);
        svg.appendChild(svgPath3);
        favSettingsContainer.appendChild(svg);

        /* Updates the task counter */
        updateTextCounter();


        return newTaskContainer;
    }
}









