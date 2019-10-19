import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { LoadingController } from '@ionic/angular';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
import { Storage } from '@ionic/storage';

import domtoimage from 'dom-to-image';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})


export class ViewPage implements OnInit {
  loading: any;
  length:any;
  pdfObj = null;
  name:any;
  age:any;
  sex:any;
  date:any;
  refby:any;
  categories: any=[];
  temppdf:any=''
  switchbutton:boolean=false;
  totalPages: number;
  fileurl:any;
  mob: any;
  constructor(
    public loadingController: LoadingController,
    private http: HttpClient,private navCtrl: NavController,
    private authService: AuthenticationService,
    public toastController: ToastController,
     private plt: Platform, private file: File, private fileOpener: FileOpener,public storage: Storage
  ) {
    //this.temppdf = '';
    //this.callalways();
   }

  ngOnInit() {
    

    
  }

  ionViewWillEnter(){
    this.storage.get('temppdf').then((val) => {
      //console.log('Your age is', val);
      this.temppdf=val;
      console.log(val);
      this.storage.remove('temppdf');
    });
    this.http.get('https://pdcwebapp.herokuapp.com/temp').subscribe((response:any=[]) => {
      console.log(response);
      this.categories=response;
      this.length = this.categories.length;
  });
  }

  callalways(){
    this.storage.get('temppdf').then((val) => {
      //console.log('Your age is', val);
      this.temppdf=val;
      console.log(this.temppdf);
    });
    this.http.get('https://pdcwebapp.herokuapp.com/temp').subscribe((response:any=[]) => {
      console.log(response);
      this.categories=response;
      this.length = this.categories.length;
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

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg
    });
    return await loading.present();
  }

  exportPdf(){
    this.storage.get('myObject').then((val) => {
      this.name = val.mrmiss+". "+val.name;
      this.age = val.age;
      this.sex = val.gender;
      this.date = val.date;
      this.refby = val.refby;
      this.mob = val.mob;
    });
    
      this.http.get('https://pdcwebapp.herokuapp.com/temp').subscribe((response:any=[]) => {
      console.log(response);
      this.categories=response;
      
  
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
          }
      });
      /*var report = doc.output('blob');
      var formData = new FormData();
      formData.append('file', report);
      formData.append('expires', '24h');
      formData.append('no_index', 'true');
      this.http.post("https://file.io",formData).subscribe((data)=>{
        console.log(data);
      })*/
      var string = doc.output('datauristring');
      console.log(string);
      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank');
      window.close();
      /*this.temppdf = string;
      var iframe = "<iframe width='100%' height='100%' src='" + this.temppdf + "'></iframe>"
      var x = window.open();
      x.document.open();
      x.document.write(iframe);
      x.document.close();*/
      this.switchbutton =true;
      
    });  
    }


    exportPdftemp(){
      var iframe = "<iframe width='100%' height='100%' src='" + this.temppdf + "'></iframe>"
      var x = window.open();
      x.document.open();
      //doc.autoPrint();
      x.document.write(iframe);
      x.document.close();

      

}

afterLoadComplete(pdf: PDFDocumentProxy) { 
  this.totalPages = pdf.numPages; 
  console.log("page count -"+this.totalPages);
}

uploadPdf(){
  this.storage.get('myObject').then((val) => {
    this.name = val.mrmiss+". "+val.name;
    this.age = val.age;
    this.sex = val.gender;
    this.date = val.date;
    this.refby = val.refby;
  });
  
    this.http.get('https://pdcwebapp.herokuapp.com/temp').subscribe((response:any=[]) => {
    console.log(response);
    this.categories=response;
    

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
        }
    });
    var report = doc.output('blob');
    var formData = new FormData();
    //formData.append('expires', '24h');
    //formData.append('no_index', 'true');
    formData.append('file', report);
    this.http.post("https://file.io",formData).subscribe((data:any)=>{
      console.log(data);
      this.fileurl=data.link;
      this.fileurl = this.fileurl.replace("https://", "");
     /* var urlformData = new FormData();
      urlformData.append('url', this.fileurl);
      this.http.post("https://goolnk.com/api/v1/shorten",urlformData).subscribe((res)=>{
          this.fileurl = res.result_url;
      })*/
      console.log(this.fileurl);
    })
    
  });  
}

copyMessage(){
  let selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = this.fileurl;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
  this.presentToast();
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'URL copied Successfully !',
    duration: 2000,
    position: 'top'
  });
  toast.present();
}

goToLink(){
  this.storage.get('myObject').then((val) => {
    this.name = val.mrmiss+". "+val.name;
    this.age = val.age;
    this.sex = val.gender;
    this.date = val.date;
    this.refby = val.refby;
    this.mob=val.mob;
  });
  
    this.http.get('https://pdcwebapp.herokuapp.com/temp').subscribe((response:any=[]) => {
    console.log(response);
    this.categories=response;
    

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
        }
    });
    var report = doc.output('blob');
    var formData = new FormData();
    formData.append('file', report);
    //formData.append('expires', '24h');
    //formData.append('no_index', 'true');
    this.http.post("https://file.io",formData).subscribe((data:any)=>{
      console.log(data);
      this.fileurl=data.link;
      this.fileurl = this.fileurl.replace("https://", "");
      /*var urlformData = new FormData();
      urlformData.append('url', this.fileurl);
      this.http.post("https://goolnk.com/api/v1/shorten",urlformData).subscribe((res)=>{
          this.fileurl = res.result_url;
      })*/
      console.log(this.fileurl);
      let body = 'Hi, '+this.name+'.'+'%0AYour report is ready and will be provided to you at specified time and date. Meanwhile you can check you report by clicking the following link -> '+this.fileurl+' .'+'%0D%0A%2ANote%2A : You can only use this link once. Once downloaded open with any document viewer. '+'%0D%0AWe wish your good heath - %2APankaj Diagnostic Center,%2A%0D%0AContact no - +91-9650029698';
      let url = "https://api.whatsapp.com/send?phone=91"+this.mob+"&text="+body;
      window.open(url, "_blank");
      
    })
    
  });
  
}
goToLink_disabled(){
  this.storage.get('myObject').then((val) => {
    this.name = val.mrmiss+". "+val.name;
    this.age = val.age;
    this.sex = val.gender;
    this.date = val.date;
    this.refby = val.refby;
  });
  let body = 'Hi, '+this.name+'.'+'%0D%0AYour report is ready and will be provided to you at specified time and date. Meanwhile you can check you report by clicking the following link -> '+this.fileurl+' .'+'%0D%0A%2ANote%2A : Anyone with this link can access your file. Do not share with anyone. Once downloaded open with any document viewer. +'+'%0D%0AWe wish your good heath - %2APankaj Diagnostic Center%2A%0D%0AContact no - +91-9650029698';
  let url = "https://api.whatsapp.com/send?phone=91"+this.mob+"&text="+body;
  window.open(url, "_blank");
}

}
