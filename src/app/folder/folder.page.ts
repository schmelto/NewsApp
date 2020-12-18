import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';
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

  public folder: string;
  data: any;
  page = 1;
  public country: string = '';
  public category: string = '';
  public search: string = '';
  public showInfiniteScroll: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private app: AppComponent,
    private EventlistenerService: EventlistenerService
  ) {

    this.clickEventsubscription = this.EventlistenerService.getClickEvent().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.checkCountry();
    this.checkCategory();
    this.loadData();
  }

  checkCountry() {
    this.country = this.app.getCountry();
  }

  checkCategory() {

  }

  loadData() {
    if (this.search != '' || this.folder == 'top-headlines') {
      this.newsService.getData(this.folder, this.country, this.category, this.search, this.page).subscribe(data => {
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
      //console.log(this.data.articles.length);
      //console.log(this.data.totalResults);
      //if (this.data.articles.length == this.data.totalResults) {
      //    // event.target.disabled = true;
      //    console.log('test');
      //}
    }, 500);
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    });
  }

  checkIfAllArtriclesAreLoaded(){
    if(this.data['articles'].length >= this.data.totalResults) this.showInfiniteScroll = false;
  }

}
