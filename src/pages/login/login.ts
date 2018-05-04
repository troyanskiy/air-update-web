import { Component } from '@angular/core';
import { AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { UniqueUntilResolve } from '../../decorators/uniqueUntilResolve.decorator';
import { EventService } from '../../services/event.service';

@IonicPage({
  name: 'LoginPage',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private eventService: EventService,
              private alertCtrl: AlertController) {


  }

  @UniqueUntilResolve()
  async doLogin() {

    this.email = this.email.trim();
    this.password = this.password.trim();

    if (!this.email || !this.password) {
      this.alertCtrl.create({
        title: 'Login error',
        message: 'Login or password is missing',
        buttons: ['OK']
      }).present();
      return;
    }

    const loginResult = await this.authService.login(this.email, this.password);

    this.password = '';

    if (!loginResult) {
      this.alertCtrl.create({
        title: 'Login error',
        message: 'Login or password does not match',
        buttons: ['OK']
      }).present();
      return;
    }

    this.authService.loadProfile();

  }


}
