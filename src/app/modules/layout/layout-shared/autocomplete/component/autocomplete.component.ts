import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, distinctUntilChanged, debounceTime, filter, switchMap } from 'rxjs/operators';
import { HttpService } from '../../../../shared/services/http.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.sass']
})
export class AutocompleteComponent implements OnInit {
  list: any[];

  constructor(
    private _http: HttpService
  ) { }

  @Input() data: Autocomplete;
  @Output() resultSelected = new EventEmitter<any>();
  ngOnInit() {
    this.searchResult();
    if (this.data.list) {
      this.list = [];
    }
  }
  searchResult() {
    this.data.control.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      tap(x => {
        if (typeof x === 'string') {
          if (!x.trim()) {
            this.list = [];
          } else if (x.trim().length < 3) {
            this.list = this.list.filter(item => item.name.indexOf(x.trim()) >= 0)
          }
        }
      }),
      filter(x => (x && typeof x === 'string' && x.trim() && x.trim().length >= 3)),
      switchMap(searchKey => this._http.get<any>(this.data.url, { searchKey }, false))
    ).subscribe(
      response => {
        this.list = response.data;
      }
    )
  }
  selectResult(event) {
    this.resultSelected.emit(event);
  }
}

export interface Autocomplete {
  control: FormControl,
  url: string,
  key?: string,
  hint?: string,
  list?: any[]
}