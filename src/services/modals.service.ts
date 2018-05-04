import { Injectable } from '@angular/core';
import { Modal, ModalController } from 'ionic-angular';
import { App } from '../models/App';
import { ModalGeneralEditComponent } from '../components/modal-general-edit/modal-general-edit';
import { Channel } from '../models/Channel';
import { IModalGeneralEditOptions, IModalGeneralEditSaveDataOptions } from '../app/declarations';
import { ModalConfigGeneratorComponent } from '../components/modal-config-generator/modal-config-generator';

@Injectable()
export class ModalsService {

  constructor(private modalCtrl: ModalController) {

  }


  appEdit(app?: App): Promise<App> {

    return this.generalEditPromise<App>({
      title: app ? 'Edit app' : 'Create new app',
      dataTitle: app ? app.title : '',
      dataDescription: app ? app.description : '',
      saveHandler: (data: IModalGeneralEditSaveDataOptions) => {

        if (!app) {
          app = new App();
        }

        console.log(data);

        app.$setData(data);
        app.$save();

        return app.$promise;

      }
    });

  }

  channelEdit(app: App, channel?: Channel): Promise<Channel> {

    return this.generalEditPromise<Channel>({
      title: channel ? 'Edit channel' : 'Create new channel',
      withCode: !channel,
      dataTitle: channel ? channel.title : '',
      dataDescription: channel ? channel.description : '',
      saveHandler: (data: IModalGeneralEditSaveDataOptions) => {

        if (!channel) {
          channel = new Channel();
        }

        channel.$setData(data);
        channel.$save(null, {appId: app._id});

        return channel.$promise;

      }
    });

  }

  configGenerator(app: App) {
    this.modalCtrl.create(ModalConfigGeneratorComponent, {app}).present();
  }

  generalEditPromise<T>(options: IModalGeneralEditOptions): Promise<T> {
    return new Promise<T>((resolve) => {
      const modal = this.generalEdit(options);
      modal.onDidDismiss(resolve);
    });
  }

  generalEdit(options: IModalGeneralEditOptions): Modal {
    const modal = this.modalCtrl.create(ModalGeneralEditComponent, options);
    modal.present();

    return modal;
  }

}

