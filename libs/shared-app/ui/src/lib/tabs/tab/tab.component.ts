import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nui-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  @ViewChild('content', { read: ElementRef, static: false })
  contentRef?: ElementRef;

  @Input() tabId: string | null = null;

  private readonly _hidden$ = new BehaviorSubject<boolean>(true);

  public readonly hidden$ = this._hidden$.asObservable();

  constructor(private readonly _cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  public hide(): void {
    this._hidden$.next(true);
  }

  public show(): void {
    this._hidden$.next(false);
  }

}
