import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaymentService } from '../../services/payment/payment.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrl: './student-payments.component.scss'
})
export class StudentPaymentsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'date',
    'amount',
    'type',
    'status',
    'firstName',
  ];
  payments: any;
  dataSource: any;
  studentCode: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private paymentService: PaymentService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      const { code } = this.route.snapshot.params
      this.studentCode = code;
      //get student payments
      this.getStudentPayments()
  }

  getStudentPayments() {
    this.paymentService.getStudentPayments(this.studentCode).subscribe({
      next: (data) => {
        this.payments = data;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error(err),
    });
  }

  goToPaymentForm() {
      this.router.navigate(['/admin', 'new-payment',  this.studentCode])
    }
}
