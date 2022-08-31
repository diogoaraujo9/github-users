import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { UsernameSearchFormComponent } from '../_common/components/username-search-form/username-search-form.component';
import * as fixtures from '../_common/fixtures';
import { UserHttpService } from '../_common/services/user.http.service';
import { SearchUserComponent } from './search-user.component';

describe('SearchUserComponent', () => {
  let toastrService: jasmine.SpyObj<ToastrService>;
  let fixture: ComponentFixture<SearchUserComponent>;
  let component: SearchUserComponent;
  let routerSpy: any;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    const mockUserHttpService = jasmine.createSpyObj('UserHttpService', {
      loadUser: fixtures.user
    });

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, UsernameSearchFormComponent],
      declarations: [SearchUserComponent],
      providers: [
        { provide: ToastrService, useValue: toastrService },
        { provide: UserHttpService, useValue: mockUserHttpService },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to another page after valid search', async () => {
    await component.searchUser(fixtures.user.login);

    const navArgs = routerSpy.navigate.calls.first().args[0];
    expect(navArgs[1]).toBe(fixtures.user.login);
  });
});
