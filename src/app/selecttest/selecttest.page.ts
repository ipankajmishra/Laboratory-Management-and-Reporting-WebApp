import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { NavController, LoadingController,ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-selecttest',
  templateUrl: './selecttest.page.html',
  styleUrls: ['./selecttest.page.scss'],
})
export class SelecttestPage implements OnInit {
  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;
  categories:any = [];
  loaderToShow: any;
  dataReturned: any;
  turnnext: boolean;
  chipon: boolean;
  chiparray:any=[];
  res:any=[];
  //map: Map<number, boolean>;
  constructor(private crudService: CrudService,private http: HttpClient,private navCtrl: NavController,
    private authService: AuthenticationService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    public storage: Storage
    ) {

      
     }

  ngOnInit() {
    this.showLoader();
    this.http.get('https://pdcwebapp.herokuapp.com/category').subscribe((response) => {
    
    this.categories=response;
    //console.log(this.categories);
    let map = new Map<number, boolean>();
    map.set(0,true);
    this.storage.set('status', map).then((data)=>{
      this.hideLoader();
    })

    
});
    
   
    this.deletetemp();
    

  }

  getRandomColor() {
    var letters = 'BCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * letters.length)];
                }
                return color;
  }

  getRandomColor2() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
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

  showLoader() {
    
    this.loaderToShow = this.loadingCtrl.create({
      spinner: null,
      message: '<img src="assets/img/wait.gif">',
      cssClass: 'custom-loading'
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        //console.log('Loading dismissed!');
      });
    });
    this.hideLoader();
  }
  hideLoader() {
   
      this.loadingCtrl.dismiss();
      
    
  }

  async openModal(name,uniqueid) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": name,
        "uniqueid": uniqueid
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.storage.get('status').then((val: Map<number, boolean>) => {
          if(val.size>1)
          {
            this.turnnext = true;
            console.log("true",val.size);
            this.callchip();
          }
          else{
            this.turnnext = false;
            console.log("false",val.size);
            this.callchip();
          }
        });
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }

  callchip(){
    this.http.get('https://pdcwebapp.herokuapp.com/temp').subscribe((response:any=[]) => {
        
      if(response.length>1)
      {
        this.chipon = true;
      }
      this.chiparray=response;
      
      //this.hideLoader();
    });
  }

  goTofillPage(){
    this.navCtrl.navigateForward('/filldetails');
  }

  deletetemp(){
    
    this.http.get("https://pdcwebapp.herokuapp.com/temp/")
      .subscribe(data => {
        console.log(data);
        this.res=data;
        for(var i=0;i<this.res.length;i++)
        {
          console.log("https://pdcwebapp.herokuapp.com/temp/"+parseInt(this.res[i].id));
          this.http.delete("https://pdcwebapp.herokuapp.com/temp/"+parseInt(this.res[i].id))
          .subscribe(data => {
            console.log(data);
            
          }, error => {
            console.log(error);
          });
        }
        //this.callchip();
        //this.f2();
       }, error => {
        console.log(error);
      });

      
   
    
  }

  f2()
  {
    this.http.get('https://pdcwebapp.herokuapp.com/temp').subscribe((response:any=[]) => {
        
      if(response.length>1)
      {
        this.chipon = true;
      }
      this.chiparray=response;
      
      //this.hideLoader();
    });
  }
  
}
