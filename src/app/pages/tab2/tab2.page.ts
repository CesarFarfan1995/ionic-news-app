import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories:string[] =['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technol' ];

  public selectedCategory:string = this.categories[0];

  public articles:Article[] =[];

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll

  constructor(private newSvc:NewsService) {}


ngOnInit(): void {
  this.newSvc.getTopHeadlinesByCategpry(this.selectedCategory)
  .subscribe( articles =>{

    if(this.newSvc.getbusinessArticles('business')){

     this.articles = this.newSvc.getbusinessArticles('business');
     console.log(this.articles, 'estes es el if')   
    }else{

      this.articles = [...articles]
    }

    
  })
}


  segmentChanged(category:any){

    this.selectedCategory = category.detail.value;
    this.newSvc.getTopHeadlinesByCategpry(this.selectedCategory)
    .subscribe(articles => this.articles =[...articles])


  }

  loadData(){

    this.newSvc.getTopHeadlinesByCategpry(this.selectedCategory, true)
    .subscribe(articles => 
      {

             this.articles = articles;    
            // event.target.complete() 
 
         this.infiniteScroll.complete()
      
      }
      );



  }

  

}
