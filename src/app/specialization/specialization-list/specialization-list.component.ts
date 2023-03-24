import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SpecializationService } from 'src/app/service/Specialization/specialization.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Specialization } from '../Specialization';
import { getDatabase, ref, set, onValue,remove,update } from "firebase/database";
import { Database } from '@angular/fire/database';
@Component({
  selector: 'app-specialization-list',
  templateUrl: './specialization-list.component.html',
  styleUrls: ['./specialization-list.component.css']
})
export class SpecializationListComponent implements OnInit {

  ​​​​​​​​desc='';
  search;
  specList:Specialization[];
  isLoggedIn = false;
  showAdminBoard = false;
  private roles: string[];

  constructor(private database :Database, private router:Router,private ss:SpecializationService, private tss: TokenStorageService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#C1F8FF');
    this.isLoggedIn = !!this.tss.getToken();
    if (this.isLoggedIn) {
      const user = this.tss.getUser();
      this.roles = user.roles;
      this.getList();
    }
    else{
      this.router.navigate(['login']);
    }
  }
  getList(){


    
    // this.ss.getAllSpecialization()
    //   .subscribe((list) =>{
    //   this.specList=list;
    // },
    // error =>{
    //   console.log(error);
    // })
    const startCountRef = ref(this.database, 'specialization/');
    onValue(startCountRef, (snapshot) => {
      const data: Specialization[] = Object.values(snapshot.val());
      if (data != null) {
        console.log(data);
        this.specList = data;
      }
    })
  }


  gotoSpecialization(){
    this.router.navigate(['specialization']);
  }

  getSpecialization(id:number){
    this.router.navigate(['specializationUpdate',id]);
  }
  
  deleteSpecialization(id:number){
    this.ss.deleteSpecialization(id)
       .subscribe((response)=>{
         console.log(response);
         alert('Specialization deleted');
         this.getList();
       },
       error =>{
       console.log(error);
     });
  }

}
