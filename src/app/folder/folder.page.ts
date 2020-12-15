import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  data: any;
  public searchString: string = 'everything';

  constructor(private activatedRoute: ActivatedRoute, private newsService: NewsService,) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.newsService.getData().subscribe(data => {
      this.data = data;
      console.log(data);
  });
  }

}
