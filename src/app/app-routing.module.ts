import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DepartmentComponent } from './department/department.component';
import { GurusComponent } from './gurus/gurus.component';
import { UploadComponent } from './upload/upload.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadsComponent } from './profile/uploads/uploads.component';
import { SubscriptionComponent } from './profile/subscription/subscription.component';
import { AboutComponent } from './profile/about/about.component';
import { PaperDetailsComponent } from './department/paper-details/paper-details.component';
import { ManageAccountComponent } from './Manage-account/manage-account.component';
import { PersonalInfoComponent } from './Manage-account/personal-info/personal-info.component';
import { AcademicInfoComponent } from './Manage-account/academic-info/academic-info.component';
import { TeacherUploadsComponent } from './gurus/teacher-uploads/teacher-uploads.component';
import { ErrorComponent } from './error/error.component';
import { LearningPlatComponent } from './e-learning/learning-plat/learning-plat.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [

   { path:'',redirectTo:'home',pathMatch:'full'},
   {path:'home',component:HomeComponent},  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'paper-details/:id', component: PaperDetailsComponent },
  { path: 'department/:depart/:degName/:papType/:sem/:sub', component: DepartmentComponent,children:[
   
  ] 
},
{ path: 'gurus/uploads/:id', component: TeacherUploadsComponent },
  { path: 'gurus', component: GurusComponent },
  { path: 'upload', component: UploadComponent },
  {
    path:'account-settings',component:ManageAccountComponent,children:[
    {
      path:'personal_info',component:PersonalInfoComponent
    },
    {
      path:'academic_info',component:AcademicInfoComponent
    }
  ]}
  ,
  {
    path: 'profile', component: ProfileComponent, children: [
      {
        path: 'uploads', component: UploadsComponent
      },
      {
        path: 'subscription', component: SubscriptionComponent
      },
      {
        path: 'about', component: AboutComponent
      }
    ]},
    {
    path:'e-learning',component:LearningPlatComponent
    },
   {
     path:"**",component:ErrorComponent
   } 

]



@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
