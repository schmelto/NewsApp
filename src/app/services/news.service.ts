import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  currentArticle: any;

  constructor(private http: HttpClient ) { }

  // getData(url) {
  //     return this.http.get(`${API_URL}/${url}&apiKey=${API_KEY}`);
  // }
  getData(){
    return this.http.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=44eb30e4688e4bee91c9c28e70279e36`);
  }
}
