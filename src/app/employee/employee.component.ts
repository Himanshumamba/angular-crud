import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../snackbar/snackbar.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
   employerForm :FormGroup;

   education :string []=
   [  "Preschool education",  "Primary education",  "Secondary education",  "Tertiary education",  "Vocational education",  "Technical education",  "Higher education",  "Adult education",  "Online education",  "Distance education",  "Special education",  "Montessori education",  "Homeschooling",  "Charter schools",  "Private schools",  "Public schools",  "Alternative schools",  "International education",  "STEAM education",  "Liberal arts education"]

    constructor (private _fb :FormBuilder ,private _empService:EmployeeService,private _dialogRef:MatDialogRef<EmployeeComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private _snackBar :SnackbarService ){
      this.employerForm = this._fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        education: ['', Validators.required],
        company: ['', Validators.required],
        experience: ['', Validators.required],
        package: ['', Validators.required],



      })
    }
    ngOnInit(): void {
      this.employerForm.patchValue(this.data)
      
    }

    onFormSubmission(){

      if(this.employerForm.valid){
         if(this.data){
          this._empService.updateEmployee(this.data.id,this.employerForm.value).subscribe({
            next:(val:any)=>{

              this._snackBar.openSnackBar('Updated  ✅ ')
               
                  this._dialogRef.close(true)
            },
            error:(err:any)=>{
                console.log(err)
            }
          })

         }else{
          this._empService.addEmployee(this.employerForm.value).subscribe({
            next:(val:any)=>{

              this._snackBar.openSnackBar('New Employee Added  ✅ ')
            
                  this._dialogRef.close(true)
            },
            error:(err:any)=>{
                console.log(err)
            }
          })
         }

      }
    }

}
