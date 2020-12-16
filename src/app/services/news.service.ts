import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { exit } from 'process';
const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getData(type, country, category, search) {
    if (type == 'top-headlines') return this.http.get(`${API_URL}/${type}?country=${country}&category=${category}&apiKey=${API_KEY}`);
    else return this.http.get(`${API_URL}/${type}?q=${search}&apiKey=${API_KEY}`);
  }
}
