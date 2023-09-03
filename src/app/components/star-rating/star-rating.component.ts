import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  @Input() mediaRating!: number
  @Input() maxRating: number = 5;
  @Output() ratingChange = new EventEmitter();

  currentRating: number = 0;
  maxRatingArray = [1,2,3,4,5]

  selectRating(rating: number): void {
    this.currentRating = rating;
    this.ratingChange.emit(this.currentRating);
  }

}