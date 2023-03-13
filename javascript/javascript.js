/* Global Query selectors ES6 on window load*/
const addTaskBtn = document.querySelector("button.add-task-button");
const modalPage = document.querySelector(".modal-page")
const closeModal = document.querySelector(".modal-close-button")
const modalExitButton = document.querySelector("button.exit-button")
const formInput = document.querySelector(".task-form")
const taskItemContainer = document.querySelector(".task-items")


/* Task Displays Array- global scope */
var taskItems = []


/* creates SVG and sets attribute for DOM */
function createSVG(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (var p in v)
      n.setAttributeNS(null, p, v[p]);
    return n
  };

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
        this.taskNumber = taskItems.length + 1;
    }
    getName(){
        return this.name
    }
    setName(name){
        this.name = name;
    }
    getCategory(){
        return this.category
    }
    setCategory(newCategory){
        this.category = newCategory;
    }
    getFavorite(){
        return this.favorite;
    }
    switchFavorite(){
        if(!this.favorite){
            this.favorite === true;
        }else{
            this.favorite === false;
        }
    }

    getTaskNumber(){
        return this.taskNumber;
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
    /*adds task to the task array */
    taskItems.push(taskItem);
    modalPage.classList.remove('show');

    /* new item */
    const newItem = createTaskItem(taskItem);
    taskItemContainer.appendChild(newItem);

    
    let taskSettingsButton = document.querySelector(`#task-item-${taskItem.getTaskNumber()}`);
    taskSettingsButton.addEventListener("click", function(){
        alert(`This is ${taskItem.getTaskNumber()}`)
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

/* Creates and returns the DOM structure for the setting menu of each task item */
function settingTaskItemModal(){
    const starEditDeleteContainer = createDOMElement("div", "star-edit-delete-container");

    const settingCloseDiv = createDOMElement("div", "setting-close-button");
    const settingCloseButton = createDOMElement("button", "setting-close-button-text", "X");
    starEditDeleteContainer.appendChild(settingCloseDiv)
    settingCloseDiv.appendChild(settingCloseButton);

    const starContainer = createDOMElement("button", "star-container");
    starEditDeleteContainer.appendChild(starContainer);
    const starContainerText = createDOMElement("div", "star-text-container", "Star");
    const starModalSVG = createSVG("svg", {width:"14", height:"14" ,viewBox:"0 0 8 8", fill: "none"});
    var starModalPath = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
    starModalPath.setAttributeNS(null, "d","M5 7.635L8.09 9.5L7.27 5.985L10 3.62L6.405 3.315L5 0L3.595 3.315L0 3.62L2.73 5.985L1.91 9.5L5 7.635Z");
    starModalPath.setAttributeNS(null, "fill","#FFD600");
    starModalSVG.appendChild(starModalPath);
    starContainer.appendChild(starModalSVG);
    starContainer.appendChild(starContainerText);

    const editContainer = createDOMElement("button", "edit-container");
    starEditDeleteContainer.appendChild(editContainer);
    const editContainerText = createDOMElement("div", "edit-text-container", "Edit");
    const editModalSVG = createSVG("svg", {width: 14, height: 14, viewBox: "0 0 8 8", fill:"none"});
    var editModalPath = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
    editModalPath.setAttributeNS(null, "d", "M2.90683 7.34496L6.56783 2.6106C6.76679 2.35529 6.83754 2.06012 6.77121 1.75958C6.71374 1.48636 6.54572 1.22657 6.29369 1.02949L5.67911 0.541277C5.14411 0.115766 4.48088 0.160557 4.10063 0.648774L3.68944 1.18223C3.63638 1.24897 3.64964 1.34751 3.71597 1.40125C3.71597 1.40125 4.75501 2.23436 4.77712 2.25227C4.84787 2.31946 4.90092 2.40904 4.91419 2.51654C4.9363 2.72705 4.79039 2.92413 4.57373 2.95101C4.47204 2.96444 4.37477 2.93309 4.30402 2.87486L3.21192 2.00593C3.15886 1.96606 3.07927 1.97457 3.03506 2.02832L0.439641 5.38761C0.271624 5.59813 0.214145 5.87135 0.271624 6.13561L0.603236 7.57339C0.620922 7.64953 0.687244 7.70328 0.766831 7.70328L2.22592 7.68537C2.49121 7.68089 2.73882 7.55995 2.90683 7.34496ZM4.94983 6.89712H7.32904C7.56116 6.89712 7.74996 7.08838 7.74996 7.32352C7.74996 7.55912 7.56116 7.74993 7.32904 7.74993H4.94983C4.7177 7.74993 4.52891 7.55912 4.52891 7.32352C4.52891 7.08838 4.7177 6.89712 4.94983 6.89712Z");
    editModalPath.setAttributeNS(null, "fill-rule", "evenodd");
    editModalPath.setAttributeNS(null, "clip-rule", "evenodd");
    editModalPath.setAttributeNS(null, "fill", "#5B93FF");
    editModalSVG.appendChild(editModalPath);
    editContainer.appendChild(editModalSVG);
    editContainer.appendChild(editContainerText);


    const deleteContainer = createDOMElement("button", "delete-container");
    starEditDeleteContainer.appendChild(deleteContainer);
    const deleteContainerText = createDOMElement("div", "delete-text-container", "Delete");
    
    const deleteModalSVG = createSVG("svg", {height: 14, width: 14, viewBox:"0 0 8 10", fill:"none"});
    var deleteModalPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    deleteModalPath.setAttributeNS(null, "d","M7.45297 2.18455C7.61506 2.18455 7.75 2.31913 7.75 2.49038V2.64871C7.75 2.81579 7.61506 2.95454 7.45297 2.95454H0.547439C0.384942 2.95454 0.25 2.81579 0.25 2.64871V2.49038C0.25 2.31913 0.384942 2.18455 0.547439 2.18455H1.76232C2.0091 2.18455 2.22388 2.00913 2.27939 1.76164L2.34301 1.47747C2.44189 1.09039 2.76729 0.833313 3.1397 0.833313H4.8603C5.22866 0.833313 5.5577 1.09039 5.65293 1.45706L5.72101 1.76122C5.77612 2.00913 5.9909 2.18455 6.23809 2.18455H7.45297ZM6.83576 7.97248C6.9626 6.79041 7.18466 3.98211 7.18466 3.95378C7.19277 3.86794 7.16481 3.78669 7.10929 3.72128C7.04972 3.66003 6.97435 3.62378 6.89128 3.62378H1.11189C1.02841 3.62378 0.948982 3.66003 0.893871 3.72128C0.837949 3.78669 0.810394 3.86794 0.814446 3.95378C0.815191 3.95898 0.823159 4.0579 0.83648 4.22328C0.89566 4.95796 1.06049 7.00421 1.167 7.97248C1.24237 8.68581 1.71041 9.13414 2.38836 9.15039C2.91151 9.16247 3.45047 9.16664 4.00158 9.16664C4.52068 9.16664 5.04789 9.16247 5.58725 9.15039C6.2887 9.13831 6.75634 8.69789 6.83576 7.97248Z");
    deleteModalPath.setAttributeNS(null, "fill-rule", "evenodd");
    deleteModalPath.setAttributeNS(null, "clip-rule", "evenodd");
    deleteModalPath.setAttributeNS(null, "fill","#E71D36");
    deleteModalSVG.appendChild(deleteModalPath);
    deleteContainer.appendChild(deleteModalSVG);
    deleteContainer.appendChild(deleteContainerText);


    return starEditDeleteContainer;

}


/* checks if the taskItems list is full or not, then creates a task item with the correct DOM structure*/

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
        favSettingsContainer.setAttribute("id", `task-item-${taskItems.length}`);


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



        const settingModal = settingTaskItemModal();
        newTaskItem.appendChild(settingModal);


        /* Updates the task counter */
        return newTaskItem;
    }
}




