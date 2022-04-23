import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { pipe } from 'rxjs';
import { Article, NewsResponse } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = [];
 @ViewChild(IonInfiniteScroll) infiniteScroll : IonInfiniteScroll


  constructor(private newSvc: NewsService) {}

  ngOnInit(): void {


    this.newSvc.getTopHeadlines().subscribe( (articles) => this.articles.push(...articles)

    )

    
  }

  loadData(){

    this.newSvc.getTopHeadlinesByCategpry('business', true)
    .subscribe(articles => 
      {


        this.articles = articles;
        this.infiniteScroll.complete()
        // event.target.complete() 
        console.log(articles)
      
      }
      );



  }

}
