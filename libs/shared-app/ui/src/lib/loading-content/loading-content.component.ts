import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'nui-loading-content',
  templateUrl: './loading-content.component.html',
  styleUrls: ['./loading-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingContentComponent  {

  @Input() loading: boolean = false;

}
