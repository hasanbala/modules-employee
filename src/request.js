import { Fetch } from "./fetch";
import { UI } from "./ui";

const url = "http://localhost:3000/employees";
export class Request {
  constructor() {
    this.fetch = new Fetch();
    this.ui = new UI();
    this.name = document.querySelector("#name");
    this.department = document.querySelector("#department");
    this.salary = document.querySelector("#salary");
  }

  reqGet() {
    this.fetch
      .get(url)
      .then((response) => this.ui.showAllEmployeesAtUI(response))
      .catch((err) => console.log(err));
  }

  reqPost() {
    const namex = this.name.value.trim();
    const departmentx = this.department.value.trim();
    const salarx = this.salary.value.trim();

    if (namex == "" || departmentx == "" || salarx == "") {
      this.ui.showError("Please enter a valid value");
    } else {
      this.fetch
        .post(url, {
          name: namex,
          department: departmentx,
          salary: Number(salarx),
        })
        .then((response) => {
          this.ui.addEmployeeToUI(response);
          this.ui.showSuccess("Congrats! employee added");
        })
        .catch((err) => console.log(err));
    }
    this.ui.clearInputs();
  }

  reqDelete(element) {
    const id =
      element.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const tr = element.parentElement.parentElement;
    this.fetch
      .delete(url + `/${id}`)
      .then((_res) => {
        this.ui.removeEmployee(tr);
        this.ui.showSuccess("Employee deleted");
      })
      .catch((err) => console.log(err));
  }

  moveSpecsToInputs(tr) {
    const key = tr.children;
    this.name.value = key[0].textContent;
    this.department.value = key[1].textContent;
    this.salary.value = key[2].textContent;
  }

  reqPut(id, parent) {
    const data = {
      name: this.name.value,
      department: this.department.value,
      salary: Number(this.salary.value),
    };

    this.fetch
      .put(url + `/${id}`, data)
      .then((response) => {
        this.ui.updateEmployeesAtUI(response, parent);
        this.ui.showSuccess("Employee updated");
      })
      .catch((err) => console.log(err));
  }
}
