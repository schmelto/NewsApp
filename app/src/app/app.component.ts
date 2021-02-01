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

  public selectedCountry: string = 'us';
  public selectedCategory: string = 'general';
  public selectedLanguage: string = 'en';
  public selectedSortBy: string = 'publishedAt';
  public selectedFrom: string;
  public selectedTo: string;

  countries = [
    { id: 1, value: 'de', name: "Germany" },
    { id: 2, value: 'us', name: "United States" },
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
  languages = [
    { id: 1, value: 'de', name: "German" },
    { id: 2, value: 'en', name: "English" },
  ];
  sortBy = [
    { id: 1, value: 'publishedAt', name: "Published At" },
    { id: 2, value: 'relevancy', name: "Relevancy" },
    { id: 3, value: 'popularity', name: "Popularity" },
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
    this.getDates();
  }

  getDates() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    this.selectedFrom = yyyy + '-' + mm + '-' + dd;

    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    dd = String(oneWeekAgo.getDate()).padStart(2, '0');
    mm = String(oneWeekAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = oneWeekAgo.getFullYear();

    this.selectedTo = yyyy + '-' + mm + '-' + dd;
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
    this.EventlistenerService.sendClickEvent();
  }
  getCategory() {
    return this.selectedCategory;
  }

  changeSortBy(data) {
    this.selectedCountry = data.detail.value;
    this.EventlistenerService.sendClickEvent();
  }

  getSortBy() {
    return this.selectedSortBy;
  }

  changeLanguage(data) {
    this.selectedLanguage = data.detail.value;
    this.EventlistenerService.sendClickEvent();
  }

  getLanguage() {
    return this.selectedLanguage;
  }

  changeFrom(data) {
    this.selectedFrom = data.detail.value;
    this.EventlistenerService.sendClickEvent();
  }

  getFrom() {
    return this.selectedFrom;
  }

  changeTo(data) {
    this.selectedTo = data.detail.value;
    this.EventlistenerService.sendClickEvent();
  }

  getTo() {
    return this.selectedTo;
  }

}
