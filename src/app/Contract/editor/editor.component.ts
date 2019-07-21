import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {
  title = 'ngx-editor';

  editorConfig = {
    editable: true,
    height: '15rem',
    placeholder: 'Redacción del contrato...',
    translate: 'no'
  };

  htmlContent = '';
  
  //CKEditor5
  public Editor = DecoupledEditor;
  
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
      );
    }
    
  constructor() { }
    
  ngOnInit() {
  }

}
