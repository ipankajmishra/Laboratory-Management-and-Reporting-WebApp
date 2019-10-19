import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController,LoadingController,ToastController, Platform } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  validations_form: FormGroup;
  errorMessage: string = '';
  loaderToShow: Promise<void>;
  storageDirectory: string = '';
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public platform: Platform,  private file: File
 
  ) { 
  }
 
  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
 
 
  loginUser(value){
    this.showLoader();
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.hideLoader();
      this.navCtrl.navigateForward('/dashboard');
      this.presentToast();
    }, err => {
      this.hideLoader();
      this.errorMessage = err.message;
      console.log(err.message);
    })
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your have been successfull logged in.',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}