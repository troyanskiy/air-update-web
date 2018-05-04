import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { IAccessKeyData, IAccessKeyDataCreation, IModalGeneralEditSaveDataOptions } from '../../app/declarations';
import { AuthService } from '../../services/auth.service';
import { ModalsService } from '../../services/modals.service';


@IonicPage({
  name: 'AccessKeysPage',
  segment: 'access-keys'
})
@Component({
  selector: 'page-access-keys',
  templateUrl: 'access-keys.html',
})
export class AccessKeysPage {

  keys: IAccessKeyData[] = [];

  constructor(private authService: AuthService, private modalService: ModalsService) {
    this.init();
  }


  async createNewAccessKey() {

    const accessKey = await this.modalService.generalEditPromise<IAccessKeyData>({
      title: 'New access key creation',
      withTypes: true,
      saveHandler: (data: IModalGeneralEditSaveDataOptions) =>
        this.authService.createAccessKey(data as IAccessKeyDataCreation)
    });

    if (accessKey) {
      this.keys.unshift(accessKey);
    }

  }


  private async init() {
    this.keys = await this.authService.getAccessKeys();
  }




}
