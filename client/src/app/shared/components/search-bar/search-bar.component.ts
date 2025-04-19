import { Component, EventEmitter, Output, input } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  readonly debounceTimeMs = input<number>(500);
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTimeMs()),
        distinctUntilChanged()
      )
      .subscribe(value => this.search.emit(value??""));
  }
}
