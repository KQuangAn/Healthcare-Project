import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/service/Doctor/doctor.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Doctor } from '../Doctor';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { Database } from '@angular/fire/database';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  desc: string = '';
  search;
  docList: Doctor[];

  constructor(private router: Router, private ds: DoctorService, private tss: TokenStorageService,
    private renderer: Renderer2, private database: Database) { }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#C1F8FF');
    if (this.tss.getToken()) {
      this.getList();
    } else {
      this.router.navigate(['login']);
    }
  }

  getList() {

    const startCountRef = ref(this.database, 'doctors/');
    onValue(startCountRef, (snapshot) => {
      const data: Doctor[] = Object.values(snapshot.val());
      if (data != null) {
        console.log(data);
        this.docList = data;
      }

    })


    // this.ds.getAllDoctor().subscribe((list) => {
    //   this.docList = list;
    // },
    //   error => {
    //     console.log(error);
    //   });

  }
  gotoDoctor() {
    this.router.navigate(['doctor']);
  }
  getDoctor(id: number) {
    this.router.navigate(['doctorUpdate', id]);
  }

  deleteDoctor(dName: string) {
    // this.ds.deleteDoctor(id).subscribe((response) => {
    //   console.log(response);
    //   alert('Doctor deleted');
    //   this.getList();
    // },
    //   error => {
    //     console.log(error);
    //   });

  }

}
