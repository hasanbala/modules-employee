export class UI {
  constructor() {
    this.name = document.querySelector("#name");
    this.department = document.querySelector("#department");
    this.salary = document.querySelector("#salary");
    this.employees = document.querySelector("#employees");
    this.update = document.querySelector("#update");
    this.alert = document.querySelector(".card-body");
  }

  showAllEmployeesAtUI(data) {
    let result = "";
    data.forEach((element) => {
      result += `
      <tr>
      <td>${element.name}</td>
        <td>${element.department}</td>
        <td>${element.salary}</td>
        <td>${element.id}</td>
        <td><a href="#" id="update-employee" class="btn btn-info">Update</a></td>
        <td> <a href="#" id="delete-employee" class="btn btn-danger">Delete</a></td>
      </tr>
      `;
    });
    this.employees.innerHTML = result;
  }

  addEmployeeToUI(data) {
    this.employees.innerHTML += `
    <tr>
      <td>${data.name}</td>
      <td>${data.department}</td>
      <td>${data.salary}</td>
      <td>${data.id}</td>
      <td><a href="#" id="update-employee" class="btn btn-info">Update</a></td>
      <td> <a href="#" id="delete-employee" class="btn btn-danger">Delete</a></td>
    </tr>    
    `;
  }

  removeEmployee(id) {
    id.remove();
  }

  updateEmployeesAtUI(data, parent) {
    parent.innerHTML = `
    <tr>
      <td>${data.name}</td>
      <td>${data.department}</td>
      <td>${data.salary}</td>
      <td>${data.id}</td>
      <td><a href="#" id="update-employee" class="btn btn-info">Update</a></td>
      <td> <a href="#" id="delete-employee" class="btn btn-danger">Delete</a></td>
    </tr>    
    `;
    this.clearInputs();
  }

  clearInputs() {
    this.name.value = "";
    this.department.value = "";
    this.salary.value = "";
  }

  showError(message) {
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.textContent = message;
    this.alert.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 2500);
  }

  showSuccess(message) {
    const div = document.createElement("div");
    div.className = "alert alert-success";
    div.textContent = message;
    this.alert.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 2500);
  }
}
