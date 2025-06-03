import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProfileComponent } from './core/components/profile/profile.component';
import { LoginComponent } from './core/components/login/login.component';
import { StudentsComponent } from './core/components/students/students.component';
import { PaymentsComponent } from './core/components/payments/payments.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { AdminTemplateComponent } from './core/components/admin-template/admin-template.component';
import { StudentPaymentsComponent } from './core/components/student-payments/student-payments.component';
import { NewPaymentComponent } from './core/components/new-payment/new-payment.component';
import { PaymentDetailsComponent } from './core/components/payment-details/payment-details.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'admin',
    component: AdminTemplateComponent,
    // canActivate: [authentificationGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'students',
        component: StudentsComponent,
        // canActivate: [authorizationGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'student-payments/:code',
        component: StudentPaymentsComponent,
        // canActivate: [authorizationGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        // canActivate: [authorizationGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'new-payment/:code',
        component: NewPaymentComponent,
        // canActivate: [authorizationGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'payment-details/:id',
        component: PaymentDetailsComponent,
        // canActivate: [authorizationGuard],
        data: { roles: ['ADMIN'] },
      },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
