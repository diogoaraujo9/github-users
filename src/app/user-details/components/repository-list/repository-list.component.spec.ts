import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from 'src/app/_common/components/pagination/pagination.component';
import { Repository } from 'src/app/_common/models/repository';
import { RepositoryHttpService } from 'src/app/_common/services/repository.http.service';
import { changeInputValue } from 'src/app/_common/utils/test.utils';
import * as fixtures from '../../../_common/fixtures';
import { RepositoryDetailsComponent } from '../repository-details/repository-details.component';
import { RepositoryListComponent } from './repository-list.component';

describe('RepositoryListComponent', () => {
  let toastrService: jasmine.SpyObj<ToastrService>;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let component: RepositoryListComponent;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error']);

    const mockRepositoryHttpService = jasmine.createSpyObj('RepositoryHttpService', {
      loadRepositories: fixtures.repositories
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        PaginationComponent
      ],
      declarations: [RepositoryListComponent, RepositoryDetailsComponent],
      providers: [
        { provide: ToastrService, useValue: toastrService },
        { provide: RepositoryHttpService, useValue: mockRepositoryHttpService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    component.user = fixtures.user;

    fixture.detectChanges();
  });

  it('should filter with provided values', fakeAsync(() => {
    const spyLoadRepositories = spyOn(component, 'loadRepositories');

    const nameInput = fixture.debugElement.nativeElement.querySelector('input[id="repository-name-filter"]');
    const starsInput = fixture.debugElement.nativeElement.querySelector('input[id="repository-stars-filter"]');

    changeInputValue(nameInput, 'repo');
    changeInputValue(starsInput, '2');

    tick(1000);

    expect(spyLoadRepositories).toHaveBeenCalled();
    expect(component.filter.name).toBe('repo');
    expect(component.filter.minStarsQuantity).toBe(2);

    flush();
  }));

  it('should sort with provided values', () => {
    const spyLoadRepositories = spyOn(component, 'loadRepositories');

    const columnSelector = 'div.repository-list__column';
    const nameSort = fixture.debugElement.nativeElement.querySelector(columnSelector);
    const starsSort = fixture.debugElement.nativeElement.querySelector(`${columnSelector} ~ ${columnSelector}`);

    nameSort.click();
    expect(component.filter.sort).toBe('name');
    expect(component.filter.sortDirection).toBe('desc');
    nameSort.click();
    expect(component.filter.sort).toBe('name');
    expect(component.filter.sortDirection).toBe('asc');

    starsSort.click();
    expect(component.filter.sort).toBe('stars');
    expect(component.filter.sortDirection).toBe('asc');
    starsSort.click();
    expect(component.filter.sort).toBe('stars');
    expect(component.filter.sortDirection).toBe('desc');

    expect(spyLoadRepositories).toHaveBeenCalled();
  });

  it('should show repository details', async () => {
    await component.loadRepositories();
    fixture.detectChanges();

    const repositoryRow = fixture.debugElement.nativeElement.querySelector('div.repository-list__item');

    repositoryRow.click();
    expect(component.selectedRepository).toBe(fixtures.repositories.items[0] as Repository);
  });

  it('should show repository list', async () => {
    component.repositories = fixtures.repositories.items as Repository[];
    component.selectedRepository = component.repositories[0];

    fixture.detectChanges();
    component.showRepositoryList();

    expect(component.selectedRepository).toBeNull();
  });
});
