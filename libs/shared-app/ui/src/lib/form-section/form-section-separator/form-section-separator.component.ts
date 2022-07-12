import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nui-form-section-separator',
  templateUrl: './form-section-separator.component.html',
  styleUrls: ['./form-section-separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSectionSeparatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
