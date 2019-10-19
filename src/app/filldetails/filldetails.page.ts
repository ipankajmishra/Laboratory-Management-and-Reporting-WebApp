import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { NavController, LoadingController } from '@ionic/angular';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-filldetails',
  templateUrl: './filldetails.page.html',
  styleUrls: ['./filldetails.page.scss'],
})
export class FilldetailsPage implements OnInit {

  categories:any=[];
  switchbutton: boolean;
  temppdf: any;
  name:any='';
  age:any='';
  sex:any='';
  date:any='';
  refby:any='';
  length:any;
  model:any=[];
  resultvalue: any;
  constlength:any;
  loaderToShow: any;
  constructor(
    private http: HttpClient,private navCtrl: NavController,
    private authService: AuthenticationService,public storage: Storage,
    public loadingCtrl: LoadingController
  ) { this.temppdf = '';}

  ngOnInit() {
    this.showLoader();
    this.http.get('https://pdcwebapp.herokuapp.com/temp').subscribe((response:any=[]) => {
      //console.log(response);
      this.categories=response;
      this.length = this.categories.length;
      this.constlength = this.length;
      //this.exportPdf();
      this.hideLoader();
  });
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

  gotoview_temp_disabled()
  {
    //this.navCtrl.navigateBack('/view');
    
    this.storage.set('temppdf', this.temppdf).then((data)=>{
      console.log(this.temppdf);
      this.navCtrl.navigateForward('/view');
    })
    
  }

  gotoview(){//exportPdf(){
    this.storage.get('myObject').then((val) => {
      this.name = val.mrmiss+". "+val.name;
      this.age = val.age;
      this.sex = val.gender;
      this.date = val.date;
      this.refby = val.refby;
    }).then((data)=>{
      this.http.get('https://pdcwebapp.herokuapp.com/temp').subscribe((response:any=[]) => {
      console.log(response);
      this.categories=response;
      
  
      //const doc = new jsPDF();
      
      //doc.autoTable({html: '#my-table'});
      //doc.save('table.pdf');
      var head = [['Name', 'Normal Range', 'Unit', 'Result']];
      var data:any=[];
      var i=0;
      
      while(this.length>0)
      {
        data[i] = [];
        data[i][0]=this.categories[i].name;
        data[i][1]=this.categories[i].lower + " - " +this.categories[i].upper;
        data[i][2]=this.categories[i].unit;
        data[i][3]=this.categories[i].resultvalue;
        this.length--;
        i++;
      }
      /*var data = [
          [1, 'Finland', 7.632, 'Helsinki'],
          [2, 'Norway', 7.594, 'Oslo'],
          [3, 'Denmark', 7.555, 'Copenhagen'],
          [4, 'Iceland', 7.495, 'Reykjavík'],
          [5, 'Switzerland', 	7.487, 'Bern'],
          [9, 'Sweden', 7.314, 'Stockholm'],
          [73, 'Belarus', 5.483, 'Minsk']
      ];*/
      //console.log(data[0][0]);
      const doc = new jsPDF();
      doc.rect(15, 45, 180, 16);
      doc.setFontSize(12);
      doc.setFontType('normal');
      doc.text('Name', 17, 51);
      doc.text(this.name, 50, 51);
      doc.text('Age/Sex', 140, 51);
      doc.text(this.age+"/"+this.sex, 163, 51);
      doc.text('Referred By', 17, 58);
      doc.text(this.refby, 50, 58);
      doc.text('Date', 140, 58);
      doc.text(this.date, 163, 58);
      ((doc as any).autoTable as AutoTable)({
          head: head,
          margin: {top: 70},
          body: data,
          didDrawCell: data => {
              //console.log(data.column.index)
          }
      });
      //doc.output('dataurlnewwindow');
      //doc.save('table.pdf');
      var string = doc.output('datauristring');
      //console.log(string);
      this.temppdf = string;
      
      console.log(this.temppdf);
      this.storage.set('temppdf', this.temppdf).then((data)=>{
        //console.log(this.temppdf);
        this.storage.get('temppdf').then((val) => {
          //console.log('Your age is', val);
          this.temppdf=val;
          this.length=this.constlength;
          console.log(val);
        });
        this.navCtrl.navigateForward('/view');
      });
    }); 
    })
       
    }

    updateresult(item){
        var mydata:any={};
        mydata={
          "resultvalue": item.temp
        }
        this.http.patch('https://pdcwebapp.herokuapp.com/temp/'+item.id,mydata).subscribe((response:any=[]) => {
          //console.log(response);
    });
    
    }

    indexTracker(index: number, value: any) {
      return index;
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
