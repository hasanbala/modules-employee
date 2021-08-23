import { Request } from "./request";
import { UI } from "./ui";

const form = document.querySelector("#employee-form");
const nameInput = document.querySelector("#name");
const departmentInput = document.querySelector("#department");
const salaryInput = document.querySelector("#salary");
const employeesList = document.querySelector("#employees");
const updateEmployeeButton = document.querySelector("#update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;

eventListener();

function eventListener() {
  document.addEventListener("DOMContentLoaded", getAllEmployees);
  form.addEventListener("submit", addEmployee);
  employeesList.addEventListener("click", updateOrDelete);
  updateEmployeeButton.addEventListener("click", updateEmployee);
}

function getAllEmployees() {
  request
    .get()
    .then((employees) => {
      ui.addAllEmployeesToUI(employees);
    })
    .catch((err) => console.log(err));
}

function addEmployee(e) {
  const employeeName = nameInput.value.trim();
  const employeeDepartment = departmentInput.value.trim();
  const employeeSalary = salaryInput.value.trim();

  if (
    employeeName === "" ||
    employeeSalary === "" ||
    employeeDepartment === ""
  ) {
    alert("lütfen boşluk bırakmadan tüm alanları doldurun");
  } else {
    request
      .post({
        name: employeeName,
        department: employeeDepartment,
        salary: Number(employeeSalary),
      })
      .then((employees) => {
        ui.addEmployeeToUI(employees);
      })
      .catch((err) => console.log(err));
  }

  ui.clearInputs();
  e.preventDefault();
}

function updateOrDelete(e) {
  if (e.target.id === "delete-employee") {
    deleteEmployee(e.target);
  } else if (e.target.id === "update-employee") {
    updateEmployeeController(e.target.parentElement.parentElement);
  }
}

function deleteEmployee(target) {
  const id =
    target.parentElement.previousElementSibling.previousElementSibling
      .textContent;

  request
    .delete(id)
    .then((message) => {
      ui.deleteEmployeeFromUI(target.parentElement.parentElement);
    })
    .catch((err) => console.log(err));
}

function updateEmployeeController(target) {
  ui.toggleUpdateButton(target);
  if (updateState === null) {
    updateState = {
      updateId: target.children[3].textContent,
      updateParent: target,
    };
  } else {
    updateState = null;
  }
}

function updateEmployee() {
  if (updateState) {
    const data = {
      name: nameInput.value.trim(),
      department: departmentInput.value.trim(),
      salary: salaryInput.value.trim(),
    };
    request
      .put(updateState.updateId, data)
      .then((element) => {
        ui.updateEmployeeOnUI(element, updateState.updateParent);
        ui.clearInputs();
        updateEmployeeButton.style.display = "none";
        updateState = null;
      })
      .catch((err) => console.log(err));
  }
}
