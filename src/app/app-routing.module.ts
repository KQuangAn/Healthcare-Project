import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentDetailsComponent } from './department/department-details/department-details.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentComponent } from './department/department.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PatientComponent } from './patient/patient.component';
import { SpecializationComponent } from './specialization/specialization.component';
import { DoctorDetailsComponent } from './doctor/doctor-details/doctor-details.component';
import { SpecializationListComponent } from './specialization/specialization-list/specialization-list.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { MedicosListComponent } from './medicos/medicos-list/medicos-list.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { SpecializationDetailsComponent } from './specialization/specialization-details/specialization-details.component';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';
import { MedicosDetailsComponent } from './medicos/medicos-details/medicos-details.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { HomeComponent } from './menu/home/home/home.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './menu/about-us/about-us.component';
import { ContactUsComponent } from './menu/contact-us/contact-us.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TestComponent } from './test/test.component';
import { TestListComponent } from './test/test-list/test-list.component';
import { TestDetailsComponent } from './test/test-details/test-details.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'index', component: IndexComponent},

  {path: 'home', component:HomeComponent},
  {path: 'about', component:AboutUsComponent},
  {path: 'contact', component:ContactUsComponent},
  { path: 'signup', component: SignUpComponent },

  {path: 'invoice/:id', component:InvoiceComponent},
  // {path: 'app', component:AppComponent},

  { path: 'department' , component: DepartmentComponent },
  { path: 'departmentList', component: DepartmentListComponent},
  { path: 'departmentUpdate/:id', component:DepartmentComponent},
  { path: 'departmentDetail/:id', component:DepartmentDetailsComponent},

  { path: 'doctor' , component: DoctorComponent},
  { path: 'doctorList' , component: DoctorListComponent},
  { path: 'doctorUpdate/:id' , component: DoctorComponent},
  { path: 'doctorDetail/:id' , component: DoctorDetailsComponent},

  { path: 'employee' , component: EmployeeComponent },
  { path: 'employeeList' , component: EmployeeListComponent },
  { path: 'employeeUpdate/:id' , component: EmployeeComponent },
  { path: 'employeeDetail/:id' , component: EmployeeDetailsComponent },

  { path: 'medicos' , component: MedicosComponent },
  { path: 'medicosList' , component: MedicosListComponent },
  { path: 'medicosUpdate/:id' , component: MedicosComponent },
  { path: 'medicosDetail/:id' , component: MedicosDetailsComponent },

  { path: 'specialization' , component: SpecializationComponent },
  { path: 'specializationList' , component: SpecializationListComponent },
  { path: 'specializationUpdate/:id' , component: SpecializationComponent },
  { path: 'specializationDetail/:id' , component: SpecializationDetailsComponent },
  
  { path: 'test' , component: TestComponent },
  { path: 'testList' , component: TestListComponent },
  { path: 'testUpdate/:id' , component: TestComponent },
  { path: 'testDetail/:id' , component: TestDetailsComponent },
  
  { path: 'patient' , component: PatientComponent },
  { path: 'patientList' , component: PatientListComponent },
  { path: 'patientUpdate/:id' , component: PatientComponent },
  { path: 'patientDetail/:id' , component: PatientDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
