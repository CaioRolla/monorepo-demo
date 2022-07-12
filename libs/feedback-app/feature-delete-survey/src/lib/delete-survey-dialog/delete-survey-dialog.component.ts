import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  AfterViewInit,
} from '@angular/core';
import { Dialog, NUI_DIALOG_DATA } from '@nui/shared-app/ui/dialog';
import { DeleteSurveyFacade } from '../+state/delete-survey.facade';

@Component({
  selector: 'nui-delete-survey-dialog',
  templateUrl: './delete-survey-dialog.component.html',
  styleUrls: ['./delete-survey-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteSurveyDialogComponent implements AfterViewInit {

  public readonly deletingSurvey$ = this._deleteSurveyFacade.deletingSurvey$;

  constructor(
    private readonly _dialog: Dialog,
    public readonly _deleteSurveyFacade: DeleteSurveyFacade,
    @Inject(NUI_DIALOG_DATA) public readonly data?: any,
  ) {}

  public ngAfterViewInit(): void {
    document.getElementById('delete-survey-dialog__delete-button')?.focus({preventScroll:true});
  }
  public onCancel(): void {
    this._dialog.close();
  }

  public onDelete(): void {
    this._deleteSurveyFacade.deleteSurvey(this.data?.surveyId as string)
  }
}
