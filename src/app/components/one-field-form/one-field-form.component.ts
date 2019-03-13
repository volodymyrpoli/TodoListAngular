import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-one-field-form',
  templateUrl: './one-field-form.component.html',
  styleUrls: ['./one-field-form.component.css']
})
export class OneFieldFormComponent implements OnInit {

  form: FormGroup;
  @Input() title: string;
  @Input() fieldName: string;
  @Input() buttonTitle: string;
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

}
