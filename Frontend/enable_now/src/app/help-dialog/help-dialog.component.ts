import { Component, Inject, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>,
    private elementRef: ElementRef
  ) { }

  src: string = '/assets/help.pdf';

  ngAfterViewInit() {
    this.pageRendered();
  }

  pageRendered() {
    const iframe = document.createElement('iframe');
    iframe.src = this.src;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';
    this.elementRef.nativeElement.querySelector('#pdfContainer').appendChild(iframe);
  }
}
