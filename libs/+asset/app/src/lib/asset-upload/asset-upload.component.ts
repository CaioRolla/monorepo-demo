import { HttpEventType } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  forwardRef,
  HostListener,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BehaviorSubject,
  filter,
  forkJoin,
  from,
  map,
  mergeMap,
  Subject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

import { AssetService } from '../services/asset.service';
import { Asset } from '@nui/+asset/core';
import { AssetUploadStatus, FileData } from './data';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'nui-asset-upload',
  templateUrl: './asset-upload.component.html',
  styleUrls: ['./asset-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetUploadComponent),
      multi: true,
    },
  ],
})
export class AssetUploadComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  public readonly AssetUploadStatus = AssetUploadStatus;

  @ViewChild('input', { static: false }) private _input!: ElementRef;

  private readonly _subscription = new Subscription();

  private readonly _disabled$ = new BehaviorSubject<boolean>(false);

  private readonly _loading$ = new BehaviorSubject<boolean>(false);

  private readonly _uploading$ = new BehaviorSubject<boolean>(false);

  private readonly _files$ = new BehaviorSubject<File[]>([]);

  private readonly _editIds$ = new BehaviorSubject<string[]>([]);

  private readonly _getRequests$ = this._editIds$.pipe(
    tap(() => this._loading$.next(true)),
    switchMap((ids) => {
      return forkJoin([...ids.map((id) => this._assetService.get(id))]);
    })
  );

  private readonly _requests$ = this._files$.pipe(
    mergeMap((files) => {
      return from(files).pipe(
        filter((file) => {
          const data = this._data$.value.find((d) => d.fileName === file.name);
          return !!data && data.status === AssetUploadStatus.PENDING;
        }),
        mergeMap(
          (file) => {
            this._data$.next(
              this._data$.value.map((data) => {
                if (data.fileName === file.name) {
                  return {
                    ...data,
                    status: AssetUploadStatus.UPLOADING,
                  };
                }
                return data;
              })
            );
            return this._assetService
              .create(file)
              .pipe(map((res) => ({ res, file })));
          },
          undefined,
          1
        )
      );
    })
  );

  public readonly _data$ = new BehaviorSubject<FileData[]>([]);

  public readonly data$ = this._data$.asObservable();

  public readonly disabled$ = this._disabled$.asObservable();

  public readonly loading$ = this._loading$.asObservable();

  public readonly uploading$ = this._uploading$.asObservable();

  @Input() multiple = false;

  @Input() canReorder = false

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: any) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  constructor(private readonly _assetService: AssetService) {}

  @HostListener('window:dragenter', ['$event'])
  public onWindowDragEnter(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    // ...
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    // ...
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.inputChanged(event.dataTransfer.files);
  }

  writeValue(assetIds: string[]): void {
    this._editIds$.next(assetIds);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this._disabled$.next(disabled);
  }

  ngOnInit(): void {
    this._handleRequests();
    this._handleGetRequests();
    this._handleOnChange();
    this._handleIsUploading();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _handleRequests(): void {
    const sub = this._requests$.subscribe(({ res, file }) => {
      if (res) {
        switch (res.type) {
          case HttpEventType.UploadProgress:
            this._data$.next(
              this._data$.value.map((data) => {
                if (data.fileName === file.name) {
                  return {
                    ...data,
                    progress: (res.loaded / (res.total || 0)) * 100,
                    total: res.total || 0,
                    loaded: res.loaded,
                  };
                }

                return data;
              })
            );
            break;

          case HttpEventType.Response:
            this._data$.next(
              this._data$.value.map((data) => {
                if (data.fileName === file.name) {
                  return {
                    ...data,
                    status: AssetUploadStatus.COMPLETE,
                    asset: res.body as Asset,
                  };
                }
                return data;
              })
            );
            break;

          default:
            break;
        }
      }
    });
    this._subscription.add(sub);
  }

  private _handleGetRequests(): void {
    const sub = this._getRequests$.subscribe((assets) => {
      this._data$.next(
        assets.map((asset) => {
          return {
            fileName: asset.originalname,
            extension: asset.originalname.split('.').pop() as string,
            progress: 100,
            total: asset.size,
            loaded: asset.size,
            status: AssetUploadStatus.EDIT,
            asset,
          };
        })
      );
      this._loading$.next(false);
    });
    this._subscription.add(sub);
  }

  private _handleOnChange(): void {
    const sub = this._data$.subscribe((data) => {
      const ids = data
        .filter(
          (v) =>
            (v.asset && v.status === AssetUploadStatus.COMPLETE) ||
            v.status === AssetUploadStatus.EDIT
        )
        .map((v) => v.asset?.id);
      this.onChange(ids);
    });
    this._subscription.add(sub);
  }

  private _handleIsUploading(): void {
    const sub = this._data$.subscribe((data) => {
      this._uploading$.next(
        data.some(
          (v) =>
            v.status === AssetUploadStatus.UPLOADING ||
            v.status === AssetUploadStatus.PENDING
        )
      );
    });
    this._subscription.add(sub);
  }

  public inputChanged(fileList: FileList): void {
    if (!this.multiple && this._data$.value.length > 0) {
      const file = fileList[0];

      this._data$.next([
        {
          fileName: file.name,
          extension: file.name.split('.').pop() as string,
          progress: 0,
          total: file.size,
          loaded: 0,
          status: AssetUploadStatus.PENDING,
        },
      ]);

      this._files$.next([file]);

      this._input.nativeElement.value = '';

      return;
    }

    const files = Array.from(fileList).filter(
      (f) => !this._files$.value.map((v) => v.name).includes(f.name)
    );

    this._data$.next([
      ...this._data$.value,
      ...files
        .filter(
          (file) =>
            !this._data$.value.map((v) => v.fileName).includes(file.name)
        )
        .map((file) => {
          return {
            fileName: file.name,
            extension: file.name.split('.').pop() as string,
            progress: 0,
            total: file.size,
            loaded: 0,
            status: AssetUploadStatus.PENDING,
          };
        }),
    ]);

    this._files$.next([...this._files$.value, ...files]);

    this._input.nativeElement.value = '';
  }

  public removeFile(fileName: string): void {
    this._data$.next(this._data$.value.filter((v) => v.fileName !== fileName));
    this._files$.next(this._files$.value.filter((v) => v.name !== fileName));
  }

  public trackByFileName(index: number, data: any): string {
    return data.fileName;
  }

  public onDropFile(event: CdkDragDrop<any>): void {
    const data = [...this._data$.value];
    moveItemInArray(data, event.previousIndex, event.currentIndex);
    this._data$.next([...data])
  }
}
