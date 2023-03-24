import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/service/Patient/patient.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Patient } from '../Patient';
import { getDatabase, ref, set,onValue,remove ,update} from "firebase/database";
import { Database } from '@angular/fire/database';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  desc:string ='';
  search;
  patList: Patient[];

  constructor(private router: Router,
    private ps: PatientService,
    private tss: TokenStorageService,
    private renderer: Renderer2,
    private database: Database) { }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#C1F8FF');
    if(this.tss.getToken()){
      this.getList();
    }
    else{
      this.router.navigate(['login']);
    }
  }

  getList(){

    const startCountRef = ref(this.database,'patients/');
    onValue(startCountRef,(snapshot)=>{
      const data:Patient[] = Object.values(snapshot.val());
      if(data !=null){
        this.patList = data;
        for (let i = 0; i < this.patList.length; i++) {
          console.log (this.patList[i].pAdd);
 
        }
        console.log(this.patList);
        }
    }

    )


    // this.ps.getAllPatient()
    //   .subscribe((list) => {
    //     this.patList = list;
    //   },
    //   error => {
    //     console.log(error);
    //   });
  }

  getPatient(id:string){
    this.router.navigate(['patientUpdate', id]);
  }

  deletePatient(pname: String){
    remove(ref(this.database,'patients/' +pname));
    alert("removed");
  }
  

  //   this.ps.deletePatient(id)
  //     .subscribe((response) => {
  //       console.log(response);
  //       alert('Patient Deleted');
  //       this.getList();
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }

  gotoPatient(){
    this.router.navigate(['patient']);
  }

}
