import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { PrettyBytesPipe } from './pipes/pretty-bytes.pipe';
import { FileNameFormatPipe } from './pipes/file-name-format.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SafeUrlPipe, PrettyBytesPipe, FileNameFormatPipe],
  exports: [SafeUrlPipe, PrettyBytesPipe, FileNameFormatPipe],
  providers: [SafeUrlPipe, PrettyBytesPipe, FileNameFormatPipe],
})
export class SharedAppUtilsModule {}
