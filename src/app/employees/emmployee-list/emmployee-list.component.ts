import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-emmployee-list',
  templateUrl: './emmployee-list.component.html',
  styleUrls: ['./emmployee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];
  constructor(private service: EmployeeService,
              private firestore: AngularFirestore,
              private toastr: ToastrService) { }

  ngOnInit() {
      this.service.getEmployees().subscribe(actionArray => {
        this.list = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Employee;
        });
      });
    }
   onEdit(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }
  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.firestore.doc('employees/' + id).delete();
      this.toastr.warning('Deleted successfully','EMP. Register');
    }
  }

}
