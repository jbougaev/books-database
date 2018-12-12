import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../store';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-editable-text-input',
  templateUrl: './editable-text-input.component.html',
  styleUrls: ['./editable-text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTextInputComponent implements OnChanges, OnInit, OnDestroy {
  @Input()
  invalid: boolean;

  @Input()
  item: Book;

  @Input()
  form: FormGroup;

  @Input()
  propertyNm: string;

  @Input()
  outerEditMode$: Observable<boolean>

  @Output()
  editModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  editableProperty: any;
  isFocus: boolean = false;
  innerEditMode: boolean = false;
  outerEditModeSubscrb: Subscription;

  ngOnInit() {
    this.outerEditModeSubscrb = this.outerEditMode$.subscribe((outerEditMode: boolean) => {
      this.innerEditMode = outerEditMode;
    });
  }

  ngOnChanges() {
    if (this.item) {
      this.editableProperty = this.item[this.propertyNm];
    }
  }

  ngOnDestroy(){
    this.outerEditModeSubscrb.unsubscribe();
  }

  toggleEditMode(edit: boolean) {
    this.isFocus = true;
    if (edit) {
      this.innerEditMode = edit;
      return;
    }

    if (this.form.get(this.propertyNm).pristine && this.form.get(this.propertyNm).valid) {
      this.innerEditMode = false;
    } else {
      this.innerEditMode = true;
      this.editModeChange.emit(true);
    }
  }
}
