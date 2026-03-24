import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class='card' *ngIf="product">
  <h2>{{product.Name}}</h2>
  <p>ID: {{product.productID}}</p>
  <p>Price: ₹ {{product.price}}</p>
  </div>
  `,
  styleUrls: ['./product-detail.component.css']
})


export class ProductDetailComponent implements OnInit{

  product: any;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService
  ) { }

  ngOnInit() {
    const Id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.service.getProductByID(Id);
  }
}
