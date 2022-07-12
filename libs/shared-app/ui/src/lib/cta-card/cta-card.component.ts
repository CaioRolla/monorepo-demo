import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nui-cta-card',
  templateUrl: './cta-card.component.html',
  styleUrls: ['./cta-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtaCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
