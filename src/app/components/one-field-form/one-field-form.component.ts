import {AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-one-field-form',
  templateUrl: './one-field-form.component.html',
  styleUrls: ['./one-field-form.component.css']
})
export class OneFieldFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() buttonTitle: string;
  @Input() disabled = false;
  @Output() submitForm = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fieldValue: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value.fieldValue);
      this.form.reset();
    } else {
      alert('Field can`t be empty');
    }
  }

  ngOnChanges(): void {
    if (this.form) {
      if (!this.disabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

}
