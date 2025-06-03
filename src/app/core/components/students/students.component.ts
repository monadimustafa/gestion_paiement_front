import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../shared/models/student/student.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentService } from '../../services/sudent/student.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{

  displayedColumns: string[] = [
    'id',
    'code',
    'firstName',
    'lastName',
    'programId',
    'actions'
  ];
  dataSource: any;
  students!: Student[];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService, private router: Router){}

  ngOnInit(): void {
      this.getAllStudents();
  }

  
  getAllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error(err),
    });
  }

  getStudentPayments(student: Student) {
      this.router.navigate(['/admin','student-payments', student.code])
  }
}
