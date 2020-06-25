import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  breakpoint;
  productDetails:any;
  BadgeValue = 0;
  cartItems:any=[];
  searchField=false;
  constructor( private api:ApiService, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.breakpoint =this.break_point(window.innerWidth);
    this.getScore();
  }

  async getScore() {
    await this.api.getscorecard('products')
     .subscribe((res: any) =>{
       let response:any;
       response = JSON.parse(res);
       this.productDetails = response;
     } );
  }
  addToCart(item){
    if(this.checkCart(item)){
      this.openSnackBar('Product already added','');
    }else{
      this.cartItems.push(item); 
      this.BadgeValue += 1;
      this.openSnackBar('Added to cart','');
    }
  }
  checkCart(item){
    let val = false;
    this.cartItems.forEach(element => {
      if(element.id == item.id) val = true;
    });
    return val;
  }
  onResize(event) {
    this.breakpoint = this.break_point(event.target.innerWidth);
  }
  break_point(size){
    switch(true) {
      case (size <= 350):
        return 1;
        break;
      case (size >= 350 && size <= 800):
        return 2
        break;
      case (size >= 800 && size <= 1020):
        return 4
        break;
      case (size > 1020):
        return 6
        break;
      default:
        return 2
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
