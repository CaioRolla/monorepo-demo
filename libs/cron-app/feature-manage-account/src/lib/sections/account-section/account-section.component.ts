import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nui-account-section',
  templateUrl: './account-section.component.html',
  styleUrls: ['./account-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSectionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
