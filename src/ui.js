export class UI {
  constructor() {
    this.nameInput = document.querySelector("#name");
    this.departmentInput = document.querySelector("#department");
    this.salaryInput = document.querySelector("#salary");
    this.employeesList = document.querySelector("#employees");
    this.updateButton = document.querySelector("#update");
  }

  addAllEmployeesToUI(employees) {
    let result = "";
    employees.forEach((element) => {
      result += `
            <tr>
                <td>${element.name}</td>
                <td>${element.department}</td>
                <td>${element.salary}</td>
                <td>${element.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
            </tr>
            `;
    });
    this.employeesList.innerHTML = result;
  }

  clearInputs() {
    this.nameInput.value = "";
    this.salaryInput.value = "";
    this.departmentInput.value = "";
  }

  addEmployeeToUI(element) {
    this.employeesList.innerHTML += `
        <tr>
            <td>${element.name}</td>
            <td>${element.department}</td>
            <td>${element.salary}</td>
            <td>${element.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>`;
  }

  deleteEmployeeFromUI(element) {
    element.remove();
  }

  toggleUpdateButton(target) {
    if (this.updateButton.style.display === "none") {
      this.updateButton.style.display = "block";
      this.addAllEmployeeToInputs(target);
    } else {
      this.updateButton.style.display = "none";
      this.clearInputs();
    }
  }

  addAllEmployeeToInputs(target) {
    const children = target.children;

    this.nameInput.value = children[0].textContent;
    this.departmentInput.value = children[1].textContent;
    this.salaryInput.value = children[2].textContent;
  }

  updateEmployeeOnUI(element, parent) {
    parent.innerHTML = `
        <tr>
            <td>${element.name}</td>
            <td>${element.department}</td>
            <td>${element.salary}</td>
            <td>${element.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>`;
  }
}
