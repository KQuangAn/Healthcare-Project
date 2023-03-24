import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../service/Doctor/doctor.service';
import { PatientService } from '../service/Patient/patient.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Patient } from './Patient';
import { getDatabase, ref, set,onValue,remove,update } from "firebase/database";
import { Database } from '@angular/fire/database';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  btn="save";
  pat: Patient = new Patient();
  id;
  monthstr:string;
  datstr:string;
  month:any;
  day:any;
  year:any;

  docList: Doctor[];
  title= "Registration";

  constructor(private router: Router,
              private ps: PatientService,
              private route: ActivatedRoute,
              private tss: TokenStorageService,
              private ds: DoctorService,
              private renderer: Renderer2,
              private database: Database) { }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#C3E6FC');
    if(this.tss.getToken()){
      if(this.route.snapshot.params['id']){
        this.id = this.route.snapshot.params['id'];
        this.pat.pName = this.id;
        this.btn = 'Update';
        this.title="Updating";
        //this.getPatient();
      }
      this.setCal();
      this.getDocs();
    }
    else{
      this.router.navigate(['login']);
    }
    
  }

  setCal(){
    var dtToday = new Date();
    this.month = dtToday.getMonth() + 1;
    this.day = dtToday.getDate();
    this.year = dtToday.getFullYear().toString();
    if(this.month < 0){
      this.month = '0' + this.month.toString();
    }
    if(this.day < 10){
      this.day = '0' + this.day.toString();
    }
    var maxDate = this.year + '-' + this.month + '-' + this.day;
    console.log(maxDate);
    document.getElementById('pDob').setAttribute('max', maxDate);
  }

  getDocs(){
    // this.ds.getAllDoctor()
    //   .subscribe(list => {
    //     this.docList = list;
    //   });
      const startCountRef = ref(this.database, 'doctors/');
    onValue(startCountRef, (snapshot) => {
      const data: Doctor[] = Object.values(snapshot.val());
      if (data != null) {
        console.log(data);
        this.docList = data;
      }

  })
  }



  getPatient(){
    // this.ps.getPatientById(this.id)
    //   .subscribe((data) => {
    //     this.pat = data;
    //   },
    //   error => {
    //     console.log(error);
    //   });
  }

  onSubmit(){
    if(this.id!=null){
      // update
      alert("updating");
      this.update(this.id);
    }else{
      alert("saving");
      this.save();
      // this.check();
    }
  }

  check(){
    this.ps.checkIsAvailable(this.pat)
      .subscribe(res => {
        if(!res.available){
          this.save();
        }else{
          alert('patient already regiesterd');
        }
      },
      error => console.log(error));
  }

  update(pName:string){
    const db = getDatabase();
    update(ref(db, 'patients/' + pName), {
      pAdd: this.pat.pAdd,
      pDob: this.pat.pDob,
      pMobileNo: this.pat.pMobileNo,
      pDoc:this.pat.doc.doctorName
    });

    alert("patient update successfully");
    this.gotoNext();
    // this.ps.updatePatient(this.id, this.pat)
    //   .subscribe((data) => {
    //     console.log(data);
    //     alert("patient updated successfully");
    //     this.gotoNext();
    //   },
    //   error => {
    //     console.log(error);
    //     alert('can not updated your data');
    //   });
  }

  save(){
    console.log(this.pat.pName +this.pat.pAdd+this.pat.pDob )
    const db = getDatabase();
    set(ref(db, 'patients/' + this.pat.pName), {
      pName: this.pat.pName,
      pAdd: this.pat.pAdd,
      pDob: this.pat.pDob,
      pMobileNo: this.pat.pMobileNo,
      pDoc :this.pat.doc.doctorName,
    });

    alert("patient registerd successfully");
    this.gotoNext();
    // this.ps.addPatient(this.pat)
    //   .subscribe((data) => {
    //     console.log(data);
    //     alert("patient Registerd successfully");
    //     this.gotoNext();
    //   },
    //   error => {
    //     console.log(error);
    //     alert('can not save your data');
    //   });
  }

  gotoNext(){
    if(this.id > 0){
      this.router.navigate(['patientList']);
    }else{
      this.router.navigate(['patientList']);
    }
  }
}
