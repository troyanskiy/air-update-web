import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ViewController } from 'ionic-angular';
import { ResourceGlobalConfig } from '@ngx-resource/core';
import { AppsResource } from '../resources/apps.resource';
import { AuthResource } from '../resources/auth.resource';
import { AuthService } from '../services/auth.service';
import { EventChannel, EventService } from '../services/event.service';
import { Defer } from '../classes/defer.class';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  root: any = 'LoginPage';

  panelEnabled: boolean = false;

  pages: IMainMenuPage[] = [
    {
      name: 'AppsListPage',
      title: 'Apps'
    },
    {
      name: 'AccessKeysPage',
      title: 'Access keys'
    }
  ];

  constructor(private platform: Platform,

              private authService: AuthService,
              private eventService: EventService,

              private appResource: AppsResource, // tslint:disable-line
              private authResource: AuthResource // tslint:disable-line

  ) {



    this.initializeApp();
  }

  openPage(page: IMainMenuPage) {
    this.nav.setRoot(page.name);
  }

  private initializeApp() {

    ResourceGlobalConfig.withCredentials = true;
    ResourceGlobalConfig.url = '/api';

    this.subscribe();

    this.authService.loadProfile();

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  private subscribe() {
    this.eventService.channel(EventChannel.ProfileUpdate)
      .subscribe(async () => {

        const loggedIn = this.authService.isLogged;

        this.panelEnabled = loggedIn;

        const view = await this.waitForView();
        const viewName = view.name;

        if (loggedIn && viewName === 'LoginPage') {
          this.nav.setRoot('AppsListPage');
        }

        if (!loggedIn && viewName !== 'LoginPage') {
          this.nav.setRoot('LoginPage');
        }


      });
  }

  private waitForView(defer: Defer<ViewController> = null): Promise<ViewController> {

    const view = this.nav.getActive();

    if (view) {
      if (defer) {
        defer.resolve(view);
      }

      return Promise.resolve(view);
    }

    if (!defer) {
      defer = new Defer<ViewController>();
    }

    setTimeout(() => this.waitForView(defer), 50);

    return defer.promise;

  }

}

export interface IMainMenuPage {
  name: string;
  title: string;
}
