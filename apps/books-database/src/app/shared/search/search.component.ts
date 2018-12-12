import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @ViewChild('queryInput')
  queryInput: ElementRef;

  constructor(private router: Router) { }
  ngOnInit() {
  }

  onKey(event) {
    if (event.keyCode === 13) {
      let query = this.queryInput.nativeElement.value;
      this.queryInput.nativeElement.value = "";
      this.router.navigate(['/books/search/', query]);
      

    }
  }
}
