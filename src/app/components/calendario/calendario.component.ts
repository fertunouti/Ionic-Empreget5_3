import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  selectedDate!: string;

  @Output() dateSelected = new EventEmitter<string>();
  @Output() closeCalendar = new EventEmitter<void>();

  onDateSelected() {
    if (this.selectedDate) {
      this.dateSelected.emit(this.selectedDate);
    }
    this.closeCalendar.emit();
  }

}
// calendario.component.ts



