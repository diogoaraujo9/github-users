import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { UsernameSearchFormComponent } from '../_common/components/username-search-form/username-search-form.component';
import * as fixtures from '../_common/fixtures';
import { UserHttpService } from '../_common/services/user.http.service';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let toastrService: jasmine.SpyObj<ToastrService>;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let component: UserDetailsComponent;
  let routerSpy: any;
  let userHttpService: UserHttpService;

  describe('user found', () => {
    beforeEach(async () => {
      toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error']);
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);

      await TestBed.configureTestingModule({
        imports: [RouterTestingModule, FontAwesomeModule, HttpClientTestingModule, UsernameSearchFormComponent],
        declarations: [UserDetailsComponent],
        providers: [
          UserHttpService,
          { provide: ToastrService, useValue: toastrService },
          { provide: Router, useValue: routerSpy },
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ username: 'fakeUser' })
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(UserDetailsComponent);
      component = fixture.componentInstance;

      userHttpService = TestBed.inject(UserHttpService);
    });

    it('should create the component', () => {
      spyOn(userHttpService, 'loadUser').and.resolveTo(fixtures.user);

      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should load user on search', async () => {
      spyOn(userHttpService, 'loadUser').and.resolveTo(fixtures.user);
      fixture.detectChanges();

      await component.changeUser(fixtures.user.login);
      const navArgs = routerSpy.navigate.calls.first().args[0];

      expect(navArgs[1]).toBe(fixtures.user.login);
      expect(component.user).toBeTruthy();
    });

    it('should navigate to search if no user loaded and none found', async () => {
      spyOn(userHttpService, 'loadUser').and.resolveTo(null);
      fixture.detectChanges();

      await component.changeUser(fixtures.user.login);

      const navArgs = routerSpy.navigate.calls.first().args[0];
      expect(navArgs[0]).toBe('search');
    });
  });
});
