import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/service/test/test.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Test } from '../Test';
import { getDatabase, ref, set, onValue,remove } from "firebase/database";
import { Database, update } from '@angular/fire/database';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  desc:string='';
  search;
  testList:Test[];

  constructor(private database:Database, private router:Router,private ts:TestService, private tss: TokenStorageService, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', '#C1F8FF');
    if(this.tss.getToken()){
      this.getList();
    }
    else{
      this.router.navigate(['login']);
    }
  }
  
  getList(){

    const startCountRef = ref(this.database, 'tests/');
    onValue(startCountRef, (snapshot) => {
      const data: Test[] = Object.values(snapshot.val());
      if (data != null) {
        console.log(data);
        this.testList = data;
      }

  })

    // this.ts.getAllTest()
    //   .subscribe((list) =>{
    //     this.testList=list;
    //   },
    //   error =>{
    //     console.log(error);
    //   });
    }

    gotoTest(){
      this.router.navigate(['test']);
  
    }

    getTest(id:number){
      this.router.navigate(['testUpdate',id]);
    }

    deleteTest(tName:String){
      remove(ref(this.database,'test/' +tName));
      alert("removed");
      this.getList();

  }

}
