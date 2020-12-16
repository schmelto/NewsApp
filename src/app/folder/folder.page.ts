import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  public folder: string;
  data: any;
  public country: string = '';
  public category: string = '';
  public search: string = '';

  constructor(private activatedRoute: ActivatedRoute, private newsService: NewsService, private app: AppComponent) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.checkCountry();
    this.checkCategory();
    this.checkSearch();
    this.loadData();
  }

  checkCountry() {
    this.country = this.app.getCountry();
    this.loadData();
  }

  checkCategory() {

  }

  checkSearch() {

  }

  loadData() {
    this.newsService.getData(this.folder, this.country, this.category, this.search).subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

}
