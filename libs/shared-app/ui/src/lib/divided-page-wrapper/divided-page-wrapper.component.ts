import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'nui-divided-page-wrapper',
  templateUrl: './divided-page-wrapper.component.html',
  styleUrls: ['./divided-page-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividedPageWrapperComponent implements OnInit {

  @Input() pageTitle?: string;

  @Input() pageSubTitle?: string;


  @Input() iframeUrl?: string;

  @Input() applicationLogoUrl?: string;

  

  constructor() {}

  ngOnInit(): void {}
}
