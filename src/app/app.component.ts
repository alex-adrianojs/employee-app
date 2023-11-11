import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employee-app';

  public employee: Employee;
  public employees: Employee[];
  public deleteEmployee: Employee;
  public editEmployee: Employee;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById("main-container")
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');

    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();

  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employee = addForm.value;
    console.log(this.employee);

    // if(this.employee?.imageUrl === null){
    //   this.employee.imageUrl = 'https://cdn-icons-png.flaticon.com/512/147/147142.png?w=740&t=st=1679612188~exp=1679612788~hmac=f6d34154879d0acef4c05b0aa01dca467c506f6cea7a4dbe25b2ef06ec1f6679' ;
    // }
    this.employeeService.addEmployee(this.employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeleteEmployee(employeeId?: number): void {
    console.log(employeeId);
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
      this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}

