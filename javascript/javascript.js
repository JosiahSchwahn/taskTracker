/* Query selectors ES6 */

const addTaskBtn = document.querySelector("button.add-task-button");
const modalPage = document.querySelector(".modal-page")
const closeModal = document.querySelector(".modal-close-button")
const modalExitButton = document.querySelector("button.exit-button")

taskItemList = {}


addTaskBtn.addEventListener(`click`, function(){
    alert("showing modal");
    modalPage.classList.add('show');
});

[closeModal,modalExitButton].forEach(function(element) {
    element.addEventListener("click", function() {
        modalPage.classList.remove('show');
    });
});











