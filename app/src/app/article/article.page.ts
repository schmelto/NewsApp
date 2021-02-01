import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  article: any;

  constructor(private newsService: NewsService, public modalCtrl: ModalController,) { }

  ngOnInit() {
    this.article = this.newsService.currentArticle;
  }
  closeModal() {
    this.modalCtrl.dismiss();
}

}
