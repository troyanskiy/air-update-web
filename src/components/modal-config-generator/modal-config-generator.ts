import { Component } from '@angular/core';
import { AlertController, NavParams, ViewController } from 'ionic-angular';
import { ResourceGlobalConfig } from '@ngx-resource/core';
import { App } from '../../models/App';
import { AuthService } from '../../services/auth.service';
import {
  AccessKeyType, IAccessKeyData, IAccessKeyDataCreation, IChannel,
  IConfigPushPull, IModalGeneralEditSaveDataOptions
} from '../../app/declarations';
import { UniqueUntilResolve } from '../../decorators/uniqueUntilResolve.decorator';
import { ModalsService } from '../../services/modals.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Channel } from '../../models/Channel';


@Component({
  selector: 'modal-config-generator',
  templateUrl: 'modal-config-generator.html'
})
export class ModalConfigGeneratorComponent {

  app: App;

  config: IConfigPushPull = null;
  configUrl: SafeResourceUrl = null;

  pushKey: IAccessKeyData;
  pullKey: IAccessKeyData;

  pushKeys: IAccessKeyData[] = [];
  pullKeys: IAccessKeyData[] = [];

  updateMethods: IConfigGeneratorGenericListOption[] = [
    {
      value: 'background',
      title: 'Update in background'
    },
    {
      value: 'splash',
      title: 'Update at splash screen'
    },
    {
      value: 'manual',
      title: 'Manual update control'
    }
  ];

  updateMethod: IConfigGeneratorGenericListOption = this.updateMethods[0];

  channels: IConfigGeneratorGenericListOption[];

  channel: IConfigGeneratorGenericListOption;


  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private domSanitizer: DomSanitizer,
              private modalService: ModalsService) {

    this.app = this.navParams.get('app');

    this.channels = this.app.channels.map((channel: Channel) => ({value: channel.code, title: channel.title}));

    if (this.channels.length) {
      this.channel = this.channels[0];
    }

    this.init();
  }

  async init() {
    const accessKeys = await this.authService.getAccessKeys();

    this.pushKeys = accessKeys.filter((key: IAccessKeyData) => key.type === AccessKeyType.Push);
    this.pullKeys = accessKeys.filter((key: IAccessKeyData) => key.type === AccessKeyType.Pull);

    if (this.pushKeys.length) {
      this.pushKey = this.pushKeys[0];
    }

    if (this.pullKeys.length) {
      this.pullKey = this.pullKeys[0];
    }

  }

  close() {
    this.viewCtrl.dismiss();
  }

  @UniqueUntilResolve()
  async generate() {

    let errorMessage = '';

    if (!this.pullKey) {
      errorMessage = 'Please select Pull key';
    }
    if (!this.pushKey) {
      errorMessage = 'Please select Push key';
    }

    if (errorMessage) {
      this.alertCtrl.create({
        title: 'Error',
        message: errorMessage,
        buttons: ['OK']
      }).present();
      return;
    }

    const tokens = await this.authService.generatePushPullTokens({
      appId: this.app._id,
      pushKey: this.pushKey.key,
      pullKey: this.pullKey.key
    });


    this.config = {
      apiServer: ResourceGlobalConfig.url as string,
      appId: this.app._id,
      updateMethod: this.updateMethod.value,
      channels: this.app.channels.reduce((obj: any, channel: IChannel) => {
        obj[channel.code] = channel._id;

        return obj;
      }, {}),
      channel: this.channel ? this.channel.value : "",
      ...tokens
    };

    if (this.config.apiServer.startsWith('/')) {
      this.config.apiServer = location.origin + this.config.apiServer;
    }

    this.configUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('data:application/json;charset=utf-8,' + JSON.stringify(this.config, null, 2));

  }

  createNewAccessKeyPush() {
    this.createNewAccessKey(AccessKeyType.Push);
  }

  createNewAccessKeyPull() {
    this.createNewAccessKey(AccessKeyType.Pull);
  }

  async createNewAccessKey(type: AccessKeyType) {

    const accessKey = await this.modalService.generalEditPromise<IAccessKeyData>({
      title: 'New access key creation',
      withTypes: true,
      defType: type,
      saveHandler: (data: IModalGeneralEditSaveDataOptions) =>
        this.authService.createAccessKey(data as IAccessKeyDataCreation)
    });

    if (accessKey) {
      if (accessKey.type === AccessKeyType.Push) {
        this.pushKeys.push(accessKey);
        this.pushKey = accessKey;
      } else {
        this.pullKeys.push(accessKey);
        this.pullKey = accessKey;
      }
    }

  }

}

export interface IConfigGeneratorGenericListOption {
  value: string;
  title: string;
}
