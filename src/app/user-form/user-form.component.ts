import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports:[ MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class UserFormComponent {

  form = new FormGroup({
    name: new FormControl('',[Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[A-Za-z ]+$/)]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    role: new FormControl('',[
      Validators.required
    ])
  });

  constructor(private dialog: MatDialogRef<UserFormComponent>) {}

  close() {
    this.dialog.close();
  }

  save() {
    if (this.form.valid) {
      this.dialog.close(this.form.value);
    }
    this.form.markAllAsTouched();
  }

}
