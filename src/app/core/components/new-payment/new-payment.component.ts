import { Payment } from './../../shared/models/payment/payment.model';
import { PaymentService } from './../../services/payment/payment.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../../shared/models/payment/payment.model';
import { getEnumValues } from '../../shared/models/helpers';
import dayjs from 'dayjs';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.scss'
})
export class NewPaymentComponent implements OnInit {

  paymentForm!: FormGroup;
  studentCode: string = "";
  paymentTypeOptions: string[] = [];
  pdfFileUrl: string  = "";
  isLoading: boolean = false;

  constructor(private paymentService: PaymentService, private router: ActivatedRoute) {}

  ngOnInit() {
    const { code } = this.router.snapshot.params
    this.studentCode = code;

    this.paymentTypeOptions = getEnumValues(PaymentType);

    console.log("PaymentType", PaymentType);
    this.paymentForm = new FormGroup({
      date: new FormControl(''),
      amount: new FormControl(0),
      type: new FormControl(''),
      studentCode: new FormControl(this.studentCode),
      fileName: new FormControl(null),
      fileSource: new FormControl(null)
    });
  }
  selectFile(event: any) {
    const { files } = event.target
    if(files.length > 0){
        const selectedFile = files[0];

        this.paymentForm.patchValue({
          fileName: selectedFile.name,
          fileSource: selectedFile
        })
      
      this.pdfFileUrl = window.URL.createObjectURL(selectedFile);

    }
  }
  afterLoadComplete(event: any){

  }
  savePayment() {
    this.isLoading = true;
    const { date, amount, type, studentCode, fileSource} = this.paymentForm.value;
    
    const paymentFormData = new FormData();

    paymentFormData.set("date", `${dayjs(date).format('YYYY-MM-DD')}`);
    paymentFormData.set("amount", amount);
    paymentFormData.set("type", type);
    paymentFormData.set("studentCode", studentCode);
    paymentFormData.set("file", fileSource);

    this.paymentService.savePayment(paymentFormData).subscribe({
      next: (newPayment: Payment) => {
        alert("Payment has been saved succcessfully!")
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
