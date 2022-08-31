import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should go to next page', () => {
    spyOn(component.updatedPage, 'emit');
    component.currentPage = 1;
    component.totalPages = 2;
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('span ~ button');
    button.click();

    expect(component.updatedPage.emit).toHaveBeenCalledWith(2);
  });

  it('should go to previous page', () => {
    spyOn(component.updatedPage, 'emit');
    component.currentPage = 2;
    component.totalPages = 2;
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.updatedPage.emit).toHaveBeenCalledWith(1);
  });

  it('should disable previous button if on first page', () => {
    component.currentPage = 1;
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button');

    expect(button.disabled).toBeTruthy();
  });

  it('should disable next button if on last page', () => {
    component.currentPage = 2;
    component.totalPages = 2;
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('span ~ button');

    expect(button.disabled).toBeTruthy();
  });
});
