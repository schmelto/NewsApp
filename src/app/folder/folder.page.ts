import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ArticlePage } from '../article/article.page';
import { NewsService } from '../services/news.service';
import { AppComponent } from '../app.component';
import { EventlistenerService } from '../services/eventlistener.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  clickEventsubscription: Subscription;

  private folder: string;
  data: any;
  page = 1;
  private country: string = '';
  private category: string = '';
  private search: string = '';
  public showInfiniteScroll: boolean = true;
  private language: string;
  private from: string;
  private to: string;
  private sortBy: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private app: AppComponent,
    private EventlistenerService: EventlistenerService,
    public modalController: ModalController
  ) {

    this.clickEventsubscription = this.EventlistenerService.getClickEvent().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.checkCountry();
    this.checkCategory();
    this.checkSelectionInEverything();
    this.loadData();
  }

  checkCountry() {
    this.country = this.app.getCountry();
  }

  checkCategory() {
    this.category = this.app.getCategory();
  }

  checkSelectionInEverything() {
    this.language = this.app.getLanguage();
    this.from = this.app.getFrom();
    this.to = this.app.getTo();
    this.sortBy = this.app.getSortBy();
  }

  loadData() {
    if (this.search != '' || this.folder == 'top-headlines') {
      this.newsService.getData(this.folder, this.country, this.category, this.search, this.page, this.language, this.from, this.to, this.sortBy).subscribe(data => {
        // initial load of the data
        if (this.page == 1) {
          this.data = data;
          console.log(data);
        }
        // append next articles to the data array
        else {
          let arr: any[] = data['articles'];

          for (let i = 0; i < data['articles'].length; i++) {
            this.data.articles.push(arr[i]);
          }
          this.checkIfAllArtriclesAreLoaded();
        }
      });
    }
  }

  moreData(event) {
    this.page++;
    this.loadData();

    setTimeout(() => {
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 500);
  }

  doRefresh(event) {
    this.resetParameters();
    this.loadData();

    setTimeout(() => {
      event.target.complete();
    });
  }

  resetParameters() {
    this.data = null;
    this.page = 1;
    this.country = '';
    this.category = '';
    this.search = '';
    this.showInfiniteScroll = true;
  }

  checkIfAllArtriclesAreLoaded() {
    if (this.data['articles'].length >= this.data.totalResults) this.showInfiniteScroll = false;
  }

  async presentModal(article) {
    this.newsService.currentArticle = article;
    const modal = await this.modalController.create({
      component: ArticlePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


}
