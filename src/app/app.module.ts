import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { DepartmentComponent } from './department/department.component';
import { FilterComponent } from './department/filter/filter.component';
import { SubjectsComponent } from './department/subjects/subjects.component';
import { GurusComponent } from './gurus/gurus.component';
import { TeachersComponent } from './gurus/teachers/teachers.component';
import { UploadComponent } from './upload/upload.component';
import { ProgressComponent } from './upload/progress/progress.component';
import { DndDirective } from './directives/dnd.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './profile/about/about.component';
import { SubscriptionComponent } from './profile/subscription/subscription.component';
import { UploadsComponent } from './profile/uploads/uploads.component';
import { RouterModule } from '@angular/router';
import { PaperDetailsComponent } from './department/paper-details/paper-details.component';
import { LoadingSpinnerComponent } from 'src/assets/loading-spinner/loading-spinner.component';
import {MatSelectModule} from '@angular/material/select';
import { ManageAccountComponent } from './Manage-account/manage-account.component';
import { PersonalInfoComponent } from './Manage-account/personal-info/personal-info.component';
import { AcademicInfoComponent } from './Manage-account/academic-info/academic-info.component';
import { TeacherUploadsComponent } from './gurus/teacher-uploads/teacher-uploads.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { ErrorComponent } from './error/error.component';
import { CustomePipe } from './pipes/custome.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    DepartmentComponent,
    FilterComponent,
    SubjectsComponent,
    GurusComponent,
    TeachersComponent,
    UploadComponent,
    ProgressComponent,
    DndDirective,
    ProfileComponent,
    AboutComponent,
    SubscriptionComponent,
    UploadsComponent,
    PaperDetailsComponent,
    LoadingSpinnerComponent,
    ManageAccountComponent,
    PersonalInfoComponent,
    AcademicInfoComponent,
    TeacherUploadsComponent,
    ErrorComponent,
    CustomePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    MatSelectModule,
    MatSnackBarModule,
    AutocompleteLibModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
