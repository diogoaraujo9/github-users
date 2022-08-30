import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeftLong, faCodeFork, faEye, faStar } from '@fortawesome/free-solid-svg-icons';

import { Repository } from '../../../_common/models/repository';

@Component({
  selector: 'repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent {
  @Input() repository: Repository | null = null;
  @Output() goBack = new EventEmitter();
  public faEye = faEye;
  public faCodeFork = faCodeFork;
  public faStar = faStar;
  public faArrowLeftLong = faArrowLeftLong;

  public emitGoBack(): void {
    this.goBack.emit();
  }
}
