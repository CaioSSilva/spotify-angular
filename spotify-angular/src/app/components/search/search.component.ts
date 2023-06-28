import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchIcon = faMagnifyingGlass;

  searchValue: string | undefined;

  search(event: any) {
    this.searchValue = event.target.value;
  }
}
