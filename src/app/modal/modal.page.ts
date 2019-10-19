import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams,LoadingController } from '@ionic/angular';
import { HttpBackend } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  modalTitle:string;
  modelId:number;
  uniqueid:string;
  deleteSelectedtest: boolean= false;
  categories: any=[];
  map = new Map<number, boolean>();
  loaderToShow: any;
  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private http: HttpClient,
    public storage: Storage,
    public loadingCtrl: LoadingController) { 
      
    }

  ngOnInit() {
    //console.table(this.navParams);
    this.showLoader();
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.uniqueid = this.navParams.data.uniqueid;

    //this.map = new Map<number, boolean>(); 
    this.storage.get('status').then((val: Map<number, boolean>) => {
      console.log('Your status is', val);
      this.map = val;
      this.http.get('https://pdcwebapp.herokuapp.com/'+this.uniqueid).subscribe((response: any=[]) => {
      //console.log(response.length);
      for(var i=0;i<response.length;i++)
      {
        
        if(this.map.get(parseInt(response[i].id))==true && this.map.size!=0)
        {
          response[i].isChecked =true;
          this.categories[i]=response[i];
          console.log(this.categories[i]);
        }
        else{
          //this.map.set(response[i].id, true);
          this.categories[i]=response[i];
        }
      }
      
    //this.categories=response;
    //console.log("categories",this.categories);
    this.hideLoader();
},error => {
  this.hideLoader();
});

    });
    
    
    


    
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
   await this.modalController.dismiss(onClosedData);
  }

  addtotemp(state,item)
  {
    if(state==true)
    {
      this.http.post("https://pdcwebapp.herokuapp.com/temp/", item)
      .subscribe(data => {
        //console.log(data);
        this.deleteSelectedtest=true;
       }, error => {
        console.log(error);
      });

      this.map.set(parseInt(item.id), true);
      this.storage.set('status', this.map);
      console.log(this.map);
    }
    else{
      this.deletetemp(item.id);
      this.map.delete(parseInt(item.id));
      this.storage.set('status', this.map);
    }
  }

  deletetemp(id){
    this.http.delete("https://pdcwebapp.herokuapp.com/temp/"+ id)
      .subscribe(data => {
        console.log(data);
        
       }, error => {
        console.log(error);
      });
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


}
