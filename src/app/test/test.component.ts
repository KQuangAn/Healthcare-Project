import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../service/Doctor/doctor.service';
import { TestService } from '../service/test/test.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Test } from './Test';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { Database } from '@angular/fire/database';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  test : Test = new Test();
  id;
  doctorList: Doctor[];

  constructor(private router: Router,private ts:TestService,private route:ActivatedRoute, private tss: TokenStorageService, private ds: DoctorService,
    private renderer: Renderer2,private database: Database) { }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#C3E6FC');
    if(this.tss.getToken()){
      if(this.route.snapshot.params['id']>0){
        this.id=this.route.snapshot.params['id'];
        this.getTest();
      }
      this.getDoctorList();
    }
    else{
      this.router.navigate(['login']);
    }
  }

  getDoctorList(){
    const startCountRef = ref(this.database, 'doctors/');
    onValue(startCountRef, (snapshot) => {
      const data: Doctor[] = Object.values(snapshot.val());
      if (data != null) {
        console.log(data);
        this.doctorList = data;
      }

  })
}

  getTest(){
    this.ts.getTestById(this.id).subscribe((data)=>{
      this.test=data;
  },
  error=>{
    console.log(error);
  });
}

  onSubmit() {
    console.log(this.test);
    this.save();
    
  }

  save(){

    const db = getDatabase();
    set(ref(db, 'tests/' + this.test.tName), {
      tName: this.test.tName,
      tDate: this.test.tDate,
      doctor: this.test.doctor
    });

    alert("Test added successfully");
    this.gotoNext();

    // this.ts.addTest(this.test)
    //   .subscribe((data) => {
    //     console.log(data);
    //     alert("Test Added successfully");
    //     this.gotoNext();
    //   },
    //   error => {
    //     console.log(error);
    //     alert('can not save your data');
    //   })
  }
      

  gotoNext(){
    this.router.navigate(['testList']);
  }

}
