import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessKeysPage } from './access-keys';

@NgModule({
  declarations: [
    AccessKeysPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessKeysPage),
  ],
})
export class AccessKeysPageModule {}
