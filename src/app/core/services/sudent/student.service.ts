import { PaymentService } from './../payment/payment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../shared/models/student/student.model';
import { environment } from '../../../../environments/environment';
import { Payment } from '../../shared/models/payment/payment.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.backendHost}/students`)
  }
  
}
