import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuDirective } from './menu.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuSeparatorItemComponent } from './menu-separator-item/menu-separator-item.component';



@NgModule({
  declarations: [
    MenuComponent,
    MenuDirective,
    MenuItemComponent,
    MenuSeparatorItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    MenuDirective,
    MenuItemComponent,
    MenuSeparatorItemComponent
  ]
})
export class MenuModule { }
