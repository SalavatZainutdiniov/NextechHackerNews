import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {

  public readonly SHOW_PAGES_COUNT: number = 5;

  @Input() pagination: Pagination | null = null;

  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  startItemIndex: number = 0;
  endItemIndex: number = 0;
  pageFrom: number = 0;
  pageTo: number = 0;
  selectedPage: number = 0;
  totalItemsCount: number = 0;

  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {

    if (this.pagination == null) {
      this.resetPages();
      return;
    }

    this.selectedPage = this.pagination.selectedPage;
    this.totalItemsCount = this.pagination.totalItemsCount;

    this.calcStartEnd(this.pagination);
    this.calcPages(this.pagination);
  }
  
  onChange(pageIndex: number) {
    if (pageIndex < 1) {
      return;
    }

    if (this.pagination == null) {
      return;
    }

    if (pageIndex > this.pagination.totalPages) {
      return;
    }

    this.change.emit(pageIndex);
  }

  resetPages() {
    this.startItemIndex = 0;
    this.endItemIndex = 0;
    this.pageFrom = 1;
    this.pageTo = 1;
    this.selectedPage = 0;
    this.totalItemsCount = 0;

    this.pages = [];
  }

  calcStartEnd(page: Pagination) {
    this.startItemIndex = ((page.selectedPage - 1) * page.pageSize) + 1;
    this.endItemIndex = Math.min(page.selectedPage * page.pageSize, page.totalItemsCount);
  }

  calcPages(page: Pagination) {
    if (page.selectedPage < this.SHOW_PAGES_COUNT - 1) {
      this.pageFrom = 1;
      this.pageTo = Math.min(page.totalPages, this.SHOW_PAGES_COUNT + 1);
    } else {
      this.pageFrom = Math.max(1, page.selectedPage - Math.floor(this.SHOW_PAGES_COUNT / 2));
      this.pageTo = Math.min(page.totalPages + 1, this.pageFrom + this.SHOW_PAGES_COUNT);
      this.pageFrom = this.pageTo - this.SHOW_PAGES_COUNT;
    }

    this.pages = Array.from({ length: (this.pageTo - this.pageFrom) }, (_, i) => i + this.pageFrom);
  }
}