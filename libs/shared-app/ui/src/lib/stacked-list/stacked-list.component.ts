import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nui-stacked-list',
  templateUrl: './stacked-list.component.html',
  styleUrls: ['./stacked-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackedListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
