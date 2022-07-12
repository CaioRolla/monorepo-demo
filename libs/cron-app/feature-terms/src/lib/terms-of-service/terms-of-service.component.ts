import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nui-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsOfServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
