import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { SettingsSurveyFacade } from '../../+state/settings-survey.facade';

@Component({
  selector: 'nui-id-field-tab',
  templateUrl: './id-field-tab.component.html',
  styleUrls: ['./id-field-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdFieldTabComponent implements OnInit {
  public readonly loadingIdentifiers$ =
    this._settingsSurveyFacade.loadingIdentifiers$;
  public readonly identifiersError$ =
    this._settingsSurveyFacade.identifiersError$;
  public readonly identifiers$ = this._settingsSurveyFacade.identifiers$;
  public readonly identifiersTotalAmount$ =
    this._settingsSurveyFacade.identifiersTotalAmount$;
  public readonly identifiersPage$ =
    this._settingsSurveyFacade.identifiersPage$;
  public readonly identifiersPages$ =
    this._settingsSurveyFacade.identifiersPages$;
  public readonly paginatedIdentifiers$ =
    this._settingsSurveyFacade.paginatedIdentifiers$;
  public readonly displayEmptyIdentifiersMessage$ =
    this._settingsSurveyFacade.displayEmptyIdentifiersMessage$;
  public readonly showingIdentifiers$ =
    this._settingsSurveyFacade.showingIdentifiers$;
  public readonly disablePreviousIdentifier$ =
    this._settingsSurveyFacade.disablePreviousIdentifier$;
  public readonly disableNextIdentifier$ =
    this._settingsSurveyFacade.disableNextIdentifier$;

  @Input() surveyId!: string;

  constructor(private readonly _settingsSurveyFacade: SettingsSurveyFacade) {}

  ngOnInit(): void {
    this._settingsSurveyFacade.loadIdentifiers(this.surveyId);
  }

  public reloadIdentifiers(): void {
    this._settingsSurveyFacade.loadIdentifiers(this.surveyId);
  }

  public nextIdentifiersPage(): void {
    this._settingsSurveyFacade.nextIdentifiersPage();
  }

  public previousIdentifiersPage(): void {
    this._settingsSurveyFacade.previousIdentifiersPage();
  }
}
