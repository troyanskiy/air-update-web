import { Component } from '@angular/core';
import { AlertController, Events, IonicPage, NavController } from 'ionic-angular';
import { App } from '../../models/App';
import { ModalsService } from '../../services/modals.service';
import { UniqueUntilResolve } from '../../decorators/uniqueUntilResolve.decorator';


@IonicPage({
  name: 'AppsListPage',
  segment: 'apps'
})
@Component({
  selector: 'page-apps-list',
  templateUrl: 'apps-list.html',
})
export class AppsListPage {

  apps: App[] = [];

  constructor(private navCtrl: NavController,
              private modalsService: ModalsService,
              private alertCtrl: AlertController) {
    this.init();
  }

  async init() {
    this.apps = await App.query();
  }

  @UniqueUntilResolve()
  async createNewApp() {

    const newApp = await this.modalsService.appEdit();

    if (newApp) {
      this.pushNewApp(newApp);
    }

  }

  @UniqueUntilResolve()
  async createChannel(app: App) {
    const newChannel = await this.modalsService.channelEdit(app);

    if (newChannel) {
      app.channels.push(newChannel);
    }

  }

  @UniqueUntilResolve()
  async generateConfig(app: App) {
    this.modalsService.configGenerator(app);
  }

  private pushNewApp(app: App) {
    this.apps.unshift(app);

    this.alertCtrl.create({
      title: 'App creation',
      message: `New app "${app.title}" has been created. Would you like to create a channel for the app`,
      buttons: [
        {
          role: 'cancel',
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            this.createChannel(app);
          }
        }
      ]
    }).present();

  }

}
