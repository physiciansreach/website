import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature-dialog',
  templateUrl: './signature-dialog.component.html',
  styleUrls: ['./signature-dialog.component.scss']
})
export class SignatureDialogComponent implements OnInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signature: any = null;

  public signaturePadOptions: Object = {
    'canvasWidth': 1000,
    'canvasHeight': 100,
    'backgroundColor': 'rgb(211,211,211)'
  };

  constructor(public dialogRef: MatDialogRef<SignatureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  drawComplete() {
    this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
  }

  cancel() {
    this.clear();
    this.dialogRef.close();
  }

  clear() {
    this.signaturePad.clear();
    this.signature = '';
  }

}
