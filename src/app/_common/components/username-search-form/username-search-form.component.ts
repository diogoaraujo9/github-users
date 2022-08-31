import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightLong, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'username-search-form',
  templateUrl: './username-search-form.component.html',
  styleUrls: ['./username-search-form.component.scss'],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule]
})
export class UsernameSearchFormComponent implements OnChanges {
  @Input() size: 'big' | 'normal' = 'big';
  @Input() loading: boolean = false;
  @Output() searchUsername = new EventEmitter<string>();
  public usernameControl = new FormControl('', [Validators.required, this.userService.validateFormUsername()]);
  public form: FormGroup = new FormGroup({
    username: this.usernameControl
  });
  public faMagnifyingGlass = faMagnifyingGlass;
  public faArrowRightLong = faArrowRightLong;
  public faSpinner = faSpinner;

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loading']) {
      if (this.loading) {
        this.usernameControl.disable();
      } else {
        this.usernameControl.enable();
      }
    }
  }

  public searchUser(): void {
    if (this.form.invalid) {
      return;
    }

    this.searchUsername.emit(this.usernameControl.value as string);
  }
}
