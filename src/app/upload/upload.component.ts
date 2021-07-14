import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthenticationService } from '../service/authentication.service';
import { UploadService } from '../service/upload-service';
import { Department, Programme } from '../service/upload';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef

  //snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  //Default selected
  Semester='Semester'

  //media details
    paperType:'';
    department:'';
    degreeName:'';
    subject:'';
    paperYear:'';
    semester:'';
    topic:'';
    desc:'';
    importantLinks:'';
    isloggedIn=false;

  files: any[] = [];
  noOfSemArr:number[]=[];
  noOfSem:number=null;
  fileNext = false;
 /*
  file: File;
   * on file drop handler
   */

   departmentData:string[];
   programmeData:any[];
   filter_prog:any[];
   subjectData:any[];
   filter_Subject:any[];

  constructor(private http:HttpClient,
            private _snackBar: MatSnackBar,
             private  authService:AuthenticationService,
             private uploadService:UploadService) { }



   ngOnInit() {
    if(this.authService.isUserLoggedIn())
    {
      this.isloggedIn=true;
      
      //set the department list coming from backend
      this.uploadService.getDepartment()
      .subscribe((data)=>
      {
        this.departmentData=data;
      
      })


      //set the programme list ,based on the data from backend
      this.uploadService.getProgramme()
      .subscribe((data)=>
      {

      
        this.programmeData=data;

        //in order to filter the content
        this.filter_prog=data;
 
      })

      //set the subject list,based on the data from backend
      this.uploadService.getSUbject()
      .subscribe((data)=>
      {
        this.subjectData=data;

        //in order to filter the subject
        this.filter_Subject=data;
      })


    }
   }


   //Filter the programme based on the selected deprtment 
   filterProgramme(filterVal: any) {
  
    
    if (filterVal == "0")
        this.programmeData=this.filter_prog;
    else
        this.programmeData = this.filter_prog
        .filter((item) => item.department == filterVal);
}

 //Filter the semester based on the selected programme
 filterSemester(filterVal:any)
 {
   console.log(filterVal);
   this.filter_prog
         .filter((item)=>
         {
          
           if(item.shortName==filterVal)
           {
             
           this.noOfSem=item.noOfSemester; 
           }
          } 
       )
     this.noOfSemArr=[];
    for(let i=0;i<this.noOfSem;i++)
    {  
      this.noOfSemArr.push(i+1);
    }

 }

 //Filter the subject based on selected semester and programmes
 filterSubject(filterVal:any)
 {

  if (filterVal == "0")
        this.subjectData=this.filter_Subject;
    else
        this.subjectData = this.filter_Subject
        .filter((item) => item.semItBelongs == +filterVal && item.department==this.department && item.deptprogShortName==this.degreeName);

 }




     ngAfterViewInit()
     {
             
        }  
      
  //Opening of snackbar function
  openSnackBar(message) {
    this._snackBar.open(message, 'Close', {
      duration: 3500,
      horizontalPosition:"left",
      verticalPosition: "bottom",
    });
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }
 

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.fileNext = false;
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    console.log(this.files.length)
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            // this.upload = true;
            if(this.isloggedIn)
            {
              this.fileNext = true;
              
            }else{
              this.openSnackBar('Please register to our Website to Upload Content')
            }
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files) {


    
    if (this.files.length == 0) {



      for (const item of files) {

        item.progress = 0;
        //Calculating the file size
        //size in mb
        
        let size=Math.round(item.size/(1024*1024));
        let fileType=item.name.split(".");
        let s=fileType.find((cur)=>
        {
          if(cur.toLowerCase()=='jpeg'||cur.toLowerCase()=='pdf'||cur.toLowerCase()=='jpg'||cur.toLowerCase()=="png")
          {
            return cur;
          }
        })
        console.log(fileType);
        if(size>12)
        {
          alert('File too Big,please select a file that is less than 12mb')
          }
          else if(!s)
          {
            alert('File type not Matched, Please select a file that is jpeg,jpg,png or pdf format')
          }
          else{

        this.files.push(item);
        }
      }
      this.uploadFilesSimulator(0);
    }
    else if (this.files.length >= 1) {
      alert('Only 1 file allowed at a time .Delete the file and try again');
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  callAlert(uData:NgForm)
  {
    console.log(!uData.valid);
    if(!uData.valid){
    window.alert("Please flll all the fields");
  }
}

  media(medUpload:NgForm)
  {

    
    if(!medUpload.valid)
    {
      window.alert("Please fill all the asterisk(*) mark fields");
      this.closeModal.nativeElement.click();
    }else{

    let user = JSON.parse(localStorage.getItem('currentUser'));

    var formData=new FormData();
    console.log(medUpload.value);
    formData.append('media',JSON.stringify(medUpload.value));
    formData.append('file',this.files[0]);
   
    this.http.post(`http://localhost:8085/api/v1/media/${user.id}`,formData,{
      responseType:'text'})
    .subscribe(
      (res)=>{
        if(res==='Upload Successfull')
        {  
          this.closeModal.nativeElement.click();
          this.files.pop();
          this.openSnackBar(res);
          medUpload.reset();
          this.fileNext=false;
          
        }
     
    },
    error=>{
       this.openSnackBar('Something went wrong on uploading')
    });
  }


   }

}
