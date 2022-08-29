import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() updatedPage = new EventEmitter<number>();

  public goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.updatedPage.next(this.currentPage + 1);
    }
  }

  public goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.updatedPage.next(this.currentPage - 1);
    }
  }
}
