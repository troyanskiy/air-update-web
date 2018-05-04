import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { ResourceModule } from '@ngx-resource/handler-ngx-http';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthResource } from '../resources/auth.resource';
import { AppsResource } from '../resources/apps.resource';

import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { ModalsService } from '../services/modals.service';


import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ResourceModule.forRoot(),
    ComponentsModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    AuthResource,
    AppsResource,

    EventService,
    AuthService,
    ModalsService
  ]
})
export class AppModule {}
