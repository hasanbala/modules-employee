import { Request } from "./request";
import { UI } from "./ui";

const form = document.querySelector("#employee-form");
const employees = document.querySelector("#employees");
const update = document.querySelector("#update");
const addButton = document.querySelector("#addButton");
const request = new Request();
const ui = new UI();
let state = null;

(function addEventListener() {
  document.addEventListener("DOMContentLoaded", showAllEmployees);
  form.addEventListener("submit", addEmployee);
  employees.addEventListener("click", removeUpdateEmployee);
  update.addEventListener("click", updateEmployee);
})();

function showAllEmployees() {
  request.reqGet();
}

function addEmployee(e) {
  request.reqPost();
  e.preventDefault();
}

function removeUpdateEmployee(e) {
  if (e.target.id == "delete-employee") {
    request.reqDelete(e.target);
  } else if (e.target.id == "update-employee") {
    updateData(e.target);
  }
}

function updateData(element) {
  const tr = element.parentElement.parentElement;
  toggleButton(tr);
  if (state === null) {
    state = {
      id: tr.children[3].textContent,
      tr,
    };
  } else {
    state = null;
  }
}

function toggleButton(tr) {
  if (update.style.display == "none") {
    update.style.display = "block";
    request.moveSpecsToInputs(tr);
    addButton.style.display = "none";
  } else {
    update.style.display = "none";
    addButton.style.display = "block";
    ui.clearInputs();
  }
}

function updateEmployee() {
  if (state) {
    request.reqPut(state.id, state.tr);
    update.style.display = "none";
    addButton.style.display = "block";
    state = null;
  }
}
