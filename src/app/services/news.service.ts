import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Article, ArticlesByCategoryAndPage, NewsResponse } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

  const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private articlesByCategory: ArticlesByCategoryAndPage = {

  }

  getTopHeadlines():Observable<Article[]>{

   return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`).pipe(map(resp => resp.articles))

  }


  getbusinessArticles(category:string):Article[]{

    return this.articlesByCategory[category].articles;

  }


  getTopHeadlinesByCategpry(category: string, loadMore:boolean = false):Observable<Article[]>{


    if(loadMore){
      return this.getArticlesByCategory(category)
    }

    if(this.articlesByCategory[category]){

      return of(this.articlesByCategory[category].articles)

    }


    return this.getArticlesByCategory(category)

    // return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`).pipe(map(resp => resp.articles))

  }


  private getArticlesByCategory(category:string):Observable<Article[]>{

    if(Object.keys(this.articlesByCategory).includes(category)){

    } else {
      this.articlesByCategory[category] = {
        page:0,
        articles: []
      }
    }

    const page = this.articlesByCategory[category].page + 1;

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&apiKey=${apiKey}`).pipe(map(

  ({articles}) => {

    if(articles.length === 0) return this.articlesByCategory[category].articles;

    this.articlesByCategory[category] = {
      page: page,
      articles: [...this.articlesByCategory[category].articles, ...articles]
    }

    return this.articlesByCategory[category].articles;

  }
))

  }

}


