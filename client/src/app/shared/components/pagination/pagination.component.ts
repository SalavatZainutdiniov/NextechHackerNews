import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {

  public MAX_PAGES_COUNT: number = 5;

  @Input() pagination!: Pagination;

  startItemIndex!: number;
  endItemIndex!: number;
  pageFrom!: number;
  pageTo!: number;

  pages!: number[];

  ngOnInit(): void {

    this.calcStartEnd();
    this.calcPages();
  }

  calcStartEnd() {
    this.startItemIndex = ((this.pagination.selectedPage - 1) * this.pagination.pageSize) + 1;
    this.endItemIndex = Math.min(this.pagination.selectedPage * this.pagination.pageSize, this.pagination.totalItemsCount);
  }

  calcPages() {
    if (this.pagination.selectedPage < this.MAX_PAGES_COUNT) {
      this.pageFrom = 1;
      this.pageTo = this.MAX_PAGES_COUNT + 1;
    } else {
      this.pageFrom = Math.max(1, this.pagination.selectedPage - Math.floor(this.MAX_PAGES_COUNT / 2));
      this.pageTo = Math.min(this.pagination.totalPages, this.pageFrom + this.MAX_PAGES_COUNT);
      this.pageFrom = this.pageTo - this.MAX_PAGES_COUNT;
    }

    this.pages = Array.from({ length: (this.pageTo - this.pageFrom) }, (_, i) => i + this.pageFrom);
  }
}
