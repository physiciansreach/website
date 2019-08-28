import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-deny-dialog',
  templateUrl: './deny-dialog.component.html',
  styleUrls: ['./deny-dialog.component.scss']
})
export class DenyDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DenyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.form = new FormGroup({
      reason: new FormControl('', Validators.required)
    });
  }

  ok() {

    if (!this.form.valid) {
      return;
    }

    this.dialogRef.close(this.form.controls['reason'].value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
