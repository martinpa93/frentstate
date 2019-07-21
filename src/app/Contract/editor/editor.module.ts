import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EditorComponent } from './editor.component';
import { CKEditorModule  } from '@ckeditor/ckeditor5-angular';


@NgModule({
  imports: [
    SharedModule,
    CKEditorModule,
    RouterModule.forChild([{path:'', component:EditorComponent}]),
  ],
  declarations: [
    EditorComponent
  ]
})
export class EditorModule {}
