import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

export type LinerProgressTheme = 'primary' | 'neutral' | 'accent' | 'success';

@Component({
  selector: 'nui-linear-progress',
  templateUrl: './linear-progress.component.html',
  styleUrls: ['./linear-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinearProgressComponent {
  @Input() progress = 0;

  @Input() theme: LinerProgressTheme = 'neutral';

  @Input() color?: string;

  constructor(
    public readonly elementRef: ElementRef,
    public readonly _cd: ChangeDetectorRef
  ) {}
}
