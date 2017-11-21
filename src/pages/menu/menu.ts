import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
public drugList:Array<any>;
public loadedDrugList:Array<any>;
public drugRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.drugRef = firebase.database().ref('/drugs');

    this.drugRef.on('value', drugList => {
  let drugs = [];
  drugList.forEach( drug => {
    drugs.push(drug.val());
    return false;
  });
  this.drugList = drugs;
  this.loadedDrugList = drugs;
});
}

  initializeItems(): void {
    this.drugList = this.loadedDrugList;
  }
  getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();
  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;
  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }
  this.drugList = this.drugList.filter((q) => {
    if(q.name && q) {
      if (q.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.drugList.length);
}
}
