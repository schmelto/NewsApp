import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../services/news.service';
import { AppComponent } from '../app.component';
import { EventlistenerService } from '../services/eventlistener.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  clickEventsubscription: Subscription;

  public folder: string;
  data: any;
  public country: string = '';
  public category: string = '';
  public search: string = '';

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
    this.checkSearch();
    this.loadData();
  }

  checkCountry() {
    this.country = this.app.getCountry();
  }

  checkCategory() {

  }

  checkSearch() {

  }

  loadData() {
    if (this.search != '' || this.folder == 'top-headlines')
    this.newsService.getData(this.folder, this.country, this.category, this.search).subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

}
