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

/* TO DO 

    - constructor for task objects
    - Store objects in an array // locally
    - Add / Delete / Edit Tasks

    - User email/password authentication
    - MongoDB document learning to store tasks in DB documents
*/

/* Task Displays */

let taskItems = []

/*Enum for category types */
const categoryTypes = {
    health: "Health",
    rest: "Rest",
    work: "Work",
    community: "Community",
    discovery: 'Discovery'
}


function Task(){
    this.name = "";
    this.category = categoryTypes[0];
    this.weekFrequency = 0;
    this.completedToday = false;
    this.favorite = false;
}


/* form eventListener */

formInput.addEventListener('submit', (e) =>{
    e.preventDefault();
    const formData = new FormData(formInput);
    let taskItem = new Task();
    console.log(typeof formData);
   
    for(data of formData){
        console.log(data);
    }


/*
    const newData = [];

    realData.forEach((val) => {
    let obj = {};
    val.forEach(v => obj[v.key] = v.value);
    newData.push(obj);
    });
*/

    
});











