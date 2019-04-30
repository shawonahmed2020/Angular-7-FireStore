import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emmployee',
  templateUrl: './emmployee.component.html',
  styleUrls: ['./emmployee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
              private firestore: AngularFirestore,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {

      form.resetForm();
    }
    this.service.formData = {
      id: '',
      fullName: '',
      empCode: '',
      position: '',
      mobile: ''
    };
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    this.firestore.collection('employees').add(data);
    this.resetForm(form);
    this.toastr.success('Submitted Successfully', 'EMP. Registered');
  }
}
