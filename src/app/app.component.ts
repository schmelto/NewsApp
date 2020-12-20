import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EventlistenerService } from './services/eventlistener.service';

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

  private selectedCountry: string = 'us';
  private selectedCategory: string = 'general';
  countries = [
    { id: 1, value: 'de', name: "DE" },
    { id: 2, value: 'us', name: "US" },
  ];
  categories = [
    { id: 1, value: 'business', name: "Business" },
    { id: 2, value: 'entertainment', name: "Entertainment" },
    { id: 3, value: 'general', name: "General" },
    { id: 4, value: 'health', name: "Health" },
    { id: 5, value: 'science', name: "Science" },
    { id: 6, value: 'sports', name: "Sports" },
    { id: 7, value: 'technology', name: "Technology" }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private EventlistenerService: EventlistenerService
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
    this.EventlistenerService.sendClickEvent();
  }

  getCountry() {
    return this.selectedCountry;
  }

  changeCategory(data) {
    this.selectedCategory = data.detail.value;
    console.log(data.detail.value);
    this.EventlistenerService.sendClickEvent();
  }
  getCategory() {
    return this.selectedCategory;
  }

}
