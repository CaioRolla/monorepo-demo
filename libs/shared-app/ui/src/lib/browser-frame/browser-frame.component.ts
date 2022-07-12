import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'nui-browser-frame',
  templateUrl: './browser-frame.component.html',
  styleUrls: ['./browser-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserFrameComponent {

  @Input() barText = '';


}
