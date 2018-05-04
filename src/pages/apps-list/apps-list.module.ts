import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppsListPage } from './apps-list';

@NgModule({
  declarations: [
    AppsListPage,
  ],
  imports: [
    IonicPageModule.forChild(AppsListPage),
  ],
})
export class AppsListPageModule {}
