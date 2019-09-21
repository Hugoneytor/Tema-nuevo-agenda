import Employee from "./Employee.js";

export default class Agenda {
  constructor(tableAgenda, tableInfo) {
    this._tableAgenda = tableAgenda;
    this._tableInfo = tableInfo;
    this._numEmployees = 0;
    this._sumAge = 0;
    this._employees = [];

    console.log(this._employees)
    this._initTables();
  }

  _initTables() {
    let lsEmployees = JSON.parse(localStorage.getItem("employees"));

    if (lsEmployees === null) {
      return;
    }

    lsEmployees.forEach((employee, index) => {
      this._addToTable(new Employee(employee));
    })

  }

  _deleteEmployee(row, employee){
    Swal.fire({
      type: "question",
      title: "Eliminar empleado",
      text: employee.name,
      showCancelButton: true,
      confirmButtonText:"Sí",
      cancelButtonText: "No"
    }).then(result =>{
      console.log(result);
      if(result.value){
        let pos = this._findEmployee(employee.email);
        this._employees.splice(pos, 1);
        localStorage.setItem("employees",JSON.stringify(this._employees));
        row.remove();
      }else{
        console.log("No");
      }
    })
  }

  _addEditDeleteToRow(row, employee){
    let btnEdit = document.createElement("input");
    btnEdit.type="button";
    btnEdit.value = "Editar";
    btnEdit.className = "btn btn-success";
    btnEdit.addEventListener("click",()=>{
      this._editEmployee(row,employee);
    });

    let btnDelete = document.createElement("input");
    btnDelete.type="button";
    btnDelete.value = "Borrar";
    btnDelete.className = "btn btn-danger";
    btnDelete.addEventListener("click",()=>{
      this._deleteEmployee(row, employee);
    });
    row.cells[4].innerHTML="";
    row.cells[4].appendChild(btnEdit);
    row.cells[5].innerHTML=""
    row.cells[5].appendChild(btnDelete);
  }

  _cancelEdit(row, employee){
    row.cells[0].innerHTML = employee.name;
    row.cells[1].innerHTML = employee.email;
    row.cells[2].innerHTML = employee.getBirthdayAsString();
    this._addEditDeleteToRow(row, employee);
  }

  _saveEdit(row, employee, newEmployee){
    let pos = this._findEmployee(employee.email);

    this._employees[pos] = newEmployee;
    localStorage.setItem("employees", JSON.stringify(this._employees));

    this._cancelEdit(row, new Employee(newEmployee));
    
  }

  _editEmployee(row, employee){
    let iName = document.createElement("input");
    iName.type="text";
    iName.value = employee.name;
    
    row.cells[0].innerHTML = ""
    row.cells[0].appendChild(iName);

    let iCorreo = document.createElement("input");
    iCorreo.type="email";
    iCorreo.value = employee.email;
    
    row.cells[1].innerHTML = ""
    row.cells[1].appendChild(iCorreo);

    let iBirthday = document.createElement("input");
    iBirthday.type="date";
    iBirthday.value = employee.getBirthdayAsUSString();
    
    row.cells[2].innerHTML = ""
    row.cells[2].appendChild(iBirthday);

    let btnSave = document.createElement("input");
    btnSave.type = "button";
    btnSave.value = "Grabar";
    btnSave.className = "btn btn-success";
    btnSave.addEventListener("click", ()=>{
      
      let newEmployee = {
        name: iName.value,
        email: iCorreo.value,
        birthday: iBirthday.value
      };
      this._saveEdit(row, employee, newEmployee);

    })
    
    row.cells[4].innerHTML="";
    row.cells[4].appendChild(btnSave);


    let btnCancel = document.createElement("input");
    btnCancel.type = "button";
    btnCancel.value = "Cancelar";
    btnCancel.className = "btn btn-danger";
    btnCancel.addEventListener("click", ()=>{
      this._cancelEdit(row, employee);
    })

    row.cells[5].innerHTML =""
    row.cells[5].appendChild(btnCancel);
  }





  _addToTable(employee) {
    let row = this._tableAgenda.insertRow(-1);

    let cellName = row.insertCell(0);
    let cellEmail = row.insertCell(1);
    let cellBirthday = row.insertCell(2);
    let cellAge = row.insertCell(3);
    row.insertCell(4);
    row.insertCell(5);

    

    cellName.innerHTML = employee.name;
    cellEmail.innerHTML = employee.email;
    cellBirthday.innerHTML = employee.getBirthdayAsString();
    cellAge.innerHTML = employee.getAge();
    this._addEditDeleteToRow(row, employee);
    

    this._numEmployees++; // this._numEmployees = this._numEmployees + 1
    this._sumAge += employee.getAge(); // this._sumAge = this._sumAge + employee.getAge()

    this._tableInfo.rows[0].cells[1].innerHTML = this._numEmployees;

    this._tableInfo.rows[1].cells[1].innerHTML =
      this._sumAge / this._numEmployees;

    let objEmployee = {
      name: employee.name,
      email: employee.email,
      birthday: employee.birthday
    };

    this._employees.push(objEmployee);
  }

  _findEmployee(email){
    let result = -1;
    this._employees.forEach((employee, index) =>{
      if(employee.email===email){
        result = index;
        return;
      }
    });

    return result;
  }

  addEmployee(employee) {
    if(this._findEmployee(employee.email)>=0){
      swal.fire({
        type:"error",
        title:"Error",
        text:"Este usuario ya existe"
      });
      return;
    };
   

    this._addToTable(employee);
    localStorage.setItem("employees", JSON.stringify(this._employees));
    swal.fire({
      type:"success",
      title:"Correcto",
      text:"El usuario ha sido agregado a la agenda"
    })
    
  }
}