import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadNoticeComponent} from './upload-notice/upload-notice.component';
import {EnquiryComponent} from './enquiry/enquiry.component';


const routes: Routes = [
  {path: 'uploadNotice', component: UploadNoticeComponent},
  {path: 'Enquiry', component: EnquiryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
