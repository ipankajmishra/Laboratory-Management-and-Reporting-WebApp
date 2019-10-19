import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-newsample',
  templateUrl: './newsample.page.html',
  styleUrls: ['./newsample.page.scss'],
})
export class NewsamplePage implements OnInit {
  mrmiss: any;
  sex: any;
  date: any;
  age: any='';
  firstname: any;
  lastname: any;
  refby: any;
  mob: any='';
  one:boolean=false;
  two:boolean=false;
  three:boolean=false;
  four:boolean=false;
  five:boolean=false;
  six:boolean=false;
  seven:boolean=false;
  eight:boolean=false;
  nine:boolean=false;
  constructor(private navCtrl: NavController,
    private authService: AuthenticationService,
    public storage: Storage) { }

  ngOnInit() {

    
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

  
  optionsFn(){
    console.log(this.mrmiss);
    this.one=true;
    this.enablenext();
  }

  optionssex(){
    console.log(this.sex);
    this.two=true;
    this.enablenext();
  }
  optionsdate(){
    console.log(this.date);
    this.three=true;
    this.enablenext();
  }
  optionsage(){
    console.log(this.age);
    this.four=true;
    this.enablenext();
  }
  optionsfirstname(){
    console.log(this.firstname);
    this.five=true;
    this.enablenext();
  }
  optionslastname(){
    console.log(this.lastname);
    this.six=true;
    this.enablenext();
  }
  optionsrefby(){
    console.log(this.refby);
    this.seven=true;
    this.enablenext();
  }
  optionsmob(){
    console.log(this.mob);
    this.eight=true;
    this.enablenext();
  }

  enablenext(){
    if(this.one && this.two && this.three && this.four && this.five && this.six && this.seven && this.eight && this.mob.length==10 )
    {
      this.nine=true;
    }
    else{
      this.nine=false;
    }
  }
  selecttestPage(){
    let myObject = { "name":this.firstname+" "+this.lastname,
                     "age":this.age, 
                     "refby":this.refby,
                     "gender":this.sex,
                     "mrmiss":this.mrmiss,
                     "date":this.date.substring(0,10),
                     "mob":this.mob 
                   };
    this.storage.set('myObject', myObject).then((data)=>{
      this.navCtrl.navigateForward('/selecttest');
    });
  }
  


}
