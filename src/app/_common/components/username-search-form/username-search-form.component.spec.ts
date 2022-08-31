import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UsernameSearchFormComponent } from './username-search-form.component';

describe('UsernameSearchFormComponent', () => {
  let fixture: ComponentFixture<UsernameSearchFormComponent>;
  let component: UsernameSearchFormComponent;
  let usernameControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameSearchFormComponent],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(UsernameSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    usernameControl = component.usernameControl;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate hyphen at the end', () => {
    usernameControl.setValue('user-');
    expect(component.usernameControl.valid).toBeFalsy();
  });

  it('should validate hyphen at the beggining', () => {
    usernameControl.setValue('-user');
    expect(component.usernameControl.valid).toBeFalsy();
  });

  it('should validate special characters', () => {
    usernameControl.setValue('us$r');
    expect(component.usernameControl.valid).toBeFalsy();
  });

  it('should validate space', () => {
    usernameControl.setValue('us er');
    expect(component.usernameControl.valid).toBeFalsy();
  });

  it('should validate double hyphens', () => {
    usernameControl.setValue('us--er');
    expect(component.usernameControl.valid).toBeFalsy();
  });

  it('should validate valid username', () => {
    usernameControl.setValue('Us3r-name');
    expect(component.usernameControl.valid).toBeTruthy();
  });

  it('should emit username after click', () => {
    spyOn(component.searchUsername, 'emit');

    usernameControl.setValue('Us3r-name');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.searchUsername.emit).toHaveBeenCalled();
  });
});
