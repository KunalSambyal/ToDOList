const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const list = document.getElementById("list");
const errorMsg = document.getElementById("error-msg");

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.visibility = "visible";
}

function saveData() {
    localStorage.setItem("data", list.innerHTML);
}

function loadData() {
    list.innerHTML = localStorage.getItem("data");
}

function addTask() {
    const newLi = document.createElement("li");
    newLi.textContent = inputField.value.trim();

    const newBtn = document.createElement("button");
    newBtn.classList.add("delete-task");
    newBtn.textContent = "✖";
    newLi.appendChild(newBtn);

    list.appendChild(newLi);

    saveData();

    inputField.value = "";
}

if (addButton) {
    addButton.addEventListener("click", (event) => {
        try {
            if (inputField.value.trim() === "") {
                throw new Error("Please enter task!");
            }
            errorMsg.style.visibility = "hidden";
            addTask();
        } catch (error) {
            console.error(error);
            showError(error.message);
        }
    });
}

list.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    } else if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();
        saveData();
    }
});

loadData();
