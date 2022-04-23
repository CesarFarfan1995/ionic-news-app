import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { ActionSheetController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  {

  @Input() article:Article;
  @Input() index: number;

  constructor(private iab: InAppBrowser, private platform: Platform, private actionSheetCtrl:ActionSheetController, private socialSharing: SocialSharing) { }

 openArticle(){


if(this.platform.is('ios') || this.platform.is('android')){
    const browser = this.iab.create(this.article.url);
  browser.show()
  return
}

window.open(this.article.url, '_blank')

   
 }


 async openMenu(){

   const  actionSheet = await this.actionSheetCtrl.create({
    header: 'Opciones',
    buttons: [
        {
          text:'Compartir',
          icon: 'share-outline',
          handler: () =>{
            this.sharedArticle()
          }
          
        },

        {
          text:'Favorito',
          icon: 'heart-outline',
          handler: () =>{
            this.toggleFavorite()
          }
        },
        {
          text:'Cancelar',
          icon: 'close-outline',
          role: 'cancel'
        }
    ]

   });

   await actionSheet.present()

 }

 sharedArticle(){
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      null,
      this.article.url
    )
 }


 toggleFavorite(){
   console.log('favorites')
 }
          

}
