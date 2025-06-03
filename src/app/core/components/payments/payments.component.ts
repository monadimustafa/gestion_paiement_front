import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Payment } from '../../shared/models/payment/payment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'date',
    'amount',
    'type',
    'status',
    'firstName',
    'actions'
  ];
  payments: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments() {
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error(err),
    });
  }

  goToPaymentDeatils(payment: Payment){
    this.router.navigate(['/admin', 'payment-details', payment.id]);
  }
}
