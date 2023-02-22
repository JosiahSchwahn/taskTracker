/* Query selectors ES6 */

const addTaskBtn = document.querySelector("button.add-task-button");
const modalPage = document.querySelector(".modal-page")
const closeModal = document.querySelector(".modal-close-button")
const modalExitButton = document.querySelector("button.exit-button")
const formInput = document.querySelector(".task-form")


addTaskBtn.addEventListener(`click`, function(){
   
    modalPage.classList.add('show');
});


[closeModal,modalExitButton].forEach(function(element) {
    element.addEventListener("click", function() {
        modalPage.classList.remove('show');
    });
});
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


function Task(name,categoryType, daysPerWeek){
    this.name = name;
    this.category = categoryType;
    this.weekFrequency = daysPerWeek;

    this.completedToday = false;
    this.favorite = false;
}


/* form eventListener, creates data form object and then passes it it to 
task object to be stored in taskItems array */
formInput.addEventListener('submit', (e) =>{
    e.preventDefault();
    const formData = new FormData(formInput);
    const taskItem = new Task();
    formData.forEach((value, key) => (taskItem[key] = value));
    taskItems.push(taskItem);
    console.log(taskItems);
});
    


/*
    const newData = [];

    realData.forEach((val) => {
    let obj = {};
    val.forEach(v => obj[v.key] = v.value);
    newData.push(obj);
    });
*/

    












