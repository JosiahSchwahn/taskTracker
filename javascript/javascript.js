/* Global Query selectors ES6 on window load*/
const addTaskBtn = document.querySelector("button.add-task-button");
const modalPage = document.querySelector(".modal-page")
const closeModal = document.querySelector(".modal-close-button")
const modalExitButton = document.querySelector("button.exit-button")
const formInput = document.querySelector(".task-form")
const taskItemContainer = document.querySelector(".task-items")
const settingsMeatballMenu = document.querySelector(".star-edit-delete-container");
const settingExitButton = document.querySelector(".setting-close-button-text");
const editButton = document.querySelector(".edit-container");
const deleteButton = document.querySelector(".delete-container");


/* Task Displays Array- global scope */
var taskItems = []


/* saves cursor position and passes to css variable to be used for absolute positioning */

const pos = { x : 0, y : 0 };
let settingsBeingDisplayed = false;
const saveCursorPosition = function(x, y) {
    pos.x = x;
    pos.y = y;
    document.documentElement.style.setProperty('--x-cursor-position', pos.x);
    document.documentElement.style.setProperty('--y-cursor-position', pos.y);
}
document.addEventListener('mousemove', event => { 
    if(settingsBeingDisplayed == false){
        saveCursorPosition(event.clientX, event.clientY); 
    }     
});




/* creates SVG and sets attribute for DOM */
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
        this.settingsModalActive = false;
        this.taskNumber = undefined;
    }

}


/*open and close buttons for add task modal and task setting menu */
addTaskBtn.addEventListener(`click`, function(){
    modalPage.classList.add('show');
});


[closeModal,modalExitButton].forEach(function(element) {
    element.addEventListener("click", function() {
        modalPage.classList.remove('show');
    });
});

settingExitButton.addEventListener('click', function(){
    settingsMeatballMenu.style.display = "none";
    settingsBeingDisplayed = false;
});

/* submit button for new task item, adds task object to array and creates additional dom elements + updates text counter */
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
    taskItem.taskNumber = taskItems.length;
    taskItems.push(taskItem);
    console.log(taskItem);
    modalPage.classList.remove('show');

    /* new item */
    const newItem = createTaskItem(taskItem);
    taskItemContainer.appendChild(newItem.newTaskItem);
    /* adds an event listener to the button to be able to edit and delete the task
    adds an event listener to the correct item depending on how long the task list current is */
    const settingButton = document.querySelectorAll(`.fav-settings-container`);
    settingButton[(taskItems.length)-1].addEventListener("click", function() {
       if(!settingsBeingDisplayed){
            alert(`Showing settings of ${taskItem.taskNumber}`);
            settingsMeatballMenu.style.display = "flex";
            settingsBeingDisplayed = true;
       }
    });

    

 
    updateTextCounter(); 

});


/* function to update task counter displayed on main page */
function updateTextCounter(){
    const taskCounter = document.querySelector(".task-counter")
    taskCounter.textContent = `Task ${taskItems.length} / 5`;
}

function createDOMElement(elementType, classList, textContent){

    const newDiv = document.createElement(elementType);
    newDiv.classList.add(classList);
    newDiv.textContent = textContent;
    return newDiv;

}

/* checks if the taskItems list is full or not, then creates a task item while manipulating the DOM */

function createTaskItem(taskItem){
    /* creating DOM structure for a taskItem */
    if (taskItems.length > 5){
        alert("The maximum amount of tasks is 5")
    } else {

        const newTaskItem = document.createElement("div");
        newTaskItem.classList.add("task-item-containers");
        newTaskItem.setAttribute("id", `task-item-#${taskItems.length}`);

        const taskName = createDOMElement("div", "task-name", taskItem.name)
        newTaskItem.appendChild(taskName);

        const categoryType = createDOMElement("div", "category-type", taskItem.category);
        newTaskItem.appendChild(categoryType);

        const daysPerWeek = createDOMElement("div", "days-per-week", taskItem.weekFrequency)
        newTaskItem.appendChild(daysPerWeek);

        const favSettingsContainer = document.createElement("div");
        favSettingsContainer.classList.add("fav-settings-container");
        favSettingsContainer.setAttribute("id", `task-item-#${taskItems.length}`);


        const starSVG = createSVG("svg", {width:"24", height:"24" ,viewBox:"0 0 24 24"});
        var starSvgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
        starSvgPath.setAttributeNS(null, "d", "M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z");
        starSvgPath.setAttributeNS(null, "fill", "#C7C7C7");
        starSVG.appendChild(starSvgPath);
        favSettingsContainer.appendChild(starSVG);

        newTaskItem.appendChild(favSettingsContainer);
        const settingSVG = createSVG("svg", {width:"14",height:"4", viewbox:"0 0 14 4"});
        //Create a path in SVG's namespace
        /* refactor this - adding settings icon to delete and edit task */
        var svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
        var svgPath2 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
        var svgPath3 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
        svgPath.setAttributeNS(null, "d", "M13.4874 0.512567C12.804 -0.170848 11.696 -0.170848 11.0126 0.512567C10.3291 1.19598 10.3291 2.30402 11.0126 2.98744C11.696 3.67085 12.804 3.67085 13.4874 2.98744C14.1709 2.30405 14.1709 1.19601 13.4874 0.512567Z");
        svgPath2.setAttributeNS(null, "d", "M8.23744 0.512567C7.55402 -0.170848 6.44598 -0.170848 5.76257 0.512567C5.07915 1.19598 5.07915 2.30402 5.76257 2.98744C6.44598 3.67085 7.55402 3.67085 8.23744 2.98744C8.92085 2.30405 8.92085 1.19601 8.23744 0.512567Z");
        svgPath3.setAttributeNS(null, "d", "M2.98744 0.512567C2.30402 -0.170848 1.19598 -0.170848 0.512564 0.512567C-0.170852 1.19598 -0.170852 2.30402 0.512564 2.98744C1.19598 3.67085 2.30402 3.67085 2.98744 2.98744C3.67085 2.30405 3.67085 1.19601 2.98744 0.512567Z");
        [svgPath, svgPath2, svgPath3].forEach((e) => {
            e.setAttributeNS(null, "fill", "#4EB3EC");
        });
        settingSVG.appendChild(svgPath);
        settingSVG.appendChild(svgPath2);
        settingSVG.appendChild(svgPath3);
        favSettingsContainer.appendChild(settingSVG);
        /* Updates the task counter */
        return {newTaskItem, starSvgPath};
    }
}




