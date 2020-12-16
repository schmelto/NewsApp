import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Top-Headlines',
      url: '/folder/top-headlines',
      icon: 'bonfire'
    },
    {
      title: 'Everything',
      url: '/folder/everything',
      icon: 'eye'
    },
  ];

  countries = [
    { id: 1, value: 'de', name: "DE" },
    { id: 2, value: 'us', name: "US" },
  ];
  private selectedCountry: string = 'de';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  changeCountry(data) {
    this.selectedCountry = data.detail.value;
  }

  getCountry() {
    return this.selectedCountry;
  }

}
