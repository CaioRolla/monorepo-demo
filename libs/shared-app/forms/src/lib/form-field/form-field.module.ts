import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormFieldComponent } from './form-field.component';
import { LabelComponent } from './label/label.component';
import { InputComponent } from './input/input.component';
import { NuiSuffix } from './suffix/suffix.directive';
import { NuiPrefix } from './prefix/prefix.directive';
import { HintComponent } from './hint/hint.component';
import { ErrorComponent } from './error/error.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    FormFieldComponent,
    LabelComponent,
    InputComponent,
    NuiSuffix,
    NuiPrefix,
    HintComponent,
    ErrorComponent,
    SelectComponent,
  ],
  imports: [CommonModule],
  exports: [
    FormFieldComponent,
    LabelComponent,
    InputComponent,
    NuiSuffix,
    NuiPrefix,
    HintComponent,
    ErrorComponent,
    SelectComponent,
  ],
})
export class FormFieldModule {}
