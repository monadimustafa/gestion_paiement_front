import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment/payment.service';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss'
})
export class PaymentDetailsComponent implements OnInit{

  paymentId!: string;
  pdfFileUrl: any;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService){}

  ngOnInit(): void {
    const { id } = this.route.snapshot.params
    this.paymentId = id;
    this.getPaymentDetails();
  }

  getPaymentDetails(){
    this.paymentService.getPaymentDeatils(this.paymentId).subscribe({
      next: (data: Blob ) => {
        const bolb: Blob = new Blob([data], {type: "application/pdf"})
        this.pdfFileUrl = window.URL.createObjectURL(bolb);
      },
      error: err => console.error(err)
    })
  }

  afterLoadComplete(event: any) {}

}
