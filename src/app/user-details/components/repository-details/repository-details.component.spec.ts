import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Repository } from 'src/app/_common/models/repository';
import * as fixtures from '../../../_common/fixtures';
import { RepositoryDetailsComponent } from '../repository-details/repository-details.component';

describe('RepositoryDetailsComponent', () => {
  let fixture: ComponentFixture<RepositoryDetailsComponent>;
  let component: RepositoryDetailsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FontAwesomeModule],
      declarations: [RepositoryDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryDetailsComponent);
    component = fixture.componentInstance;
    component.repository = fixtures.repositories.items[0] as Repository;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit go back event', async () => {
    spyOn(component.goBack, 'emit');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.goBack.emit).toHaveBeenCalled();
  });
});
