import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { Payment } from '../../shared/models/payment/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private http: HttpClient) { }

  getAllPayments(): Observable<Payment[]>{
    return this.http.get<Payment[]>(`${environment.backendHost}/payments`)
  }

  getStudentPayments(studentCode: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.backendHost}/students/${studentCode}/payments`)
  }

  savePayment(paymentFormData: FormData): Observable<Payment>{
      return this.http.post<Payment>(`${environment.backendHost}/payments`, paymentFormData)
  }

  getPaymentDeatils(paymentId: string){
      return this.http.get(`${environment.backendHost}/payment-file/${paymentId}`, {responseType: 'blob'})
  }
}
