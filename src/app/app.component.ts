import { Component,ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './service/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SnackbarService } from './snackbar/snackbar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [    
    "id",
  "firstName",
        "lastName",
        "email",
        "dob",
        "gender",
        "education",
        "company",
        "experience",
        "package",
        "action"
     ];
     dataSource!: MatTableDataSource<any>;

     @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private _dialog:MatDialog 
    ,private _empService:EmployeeService ,private _SnackbarService:SnackbarService){}
ngOnInit(): void {
  this.getEmployeeList();
  
}
  updateEmployee(){
    const dialogRef =this._dialog.open(EmployeeComponent)
    dialogRef.afterClosed().subscribe({

      next:(val)=>{
        if(val){
          this.getEmployeeList()
        }
      }
     
    })
  }
  getEmployeeList(){
  this._empService.getEmployeeList({dats: 'someValue'}).subscribe({
    next :(res)=>{
  this.dataSource = new MatTableDataSource(res);
  this.dataSource.paginator = this.paginator;
  
    },
    error:(err)=>{
      console.log(err)
    }

  })
  }

  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({

      next:(res)=>{
      
        this._SnackbarService.openSnackBar('employee deleted','done');
        this.getEmployeeList();

      },

      error:(err)=>{
        console.log(err)
      }
      
    })

  }

  editEmployee(data:any){
    const dialogRef =this._dialog.open(EmployeeComponent,{
      data,

    });
    dialogRef.afterClosed().subscribe({

      next:(val)=>{
        if(val){
          this.getEmployeeList()
        }
      }
     
    })

  }
}
