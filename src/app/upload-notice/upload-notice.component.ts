import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Notice} from '../model/model';
import {Observable} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {async} from 'q';

class Ddesignations {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-upload-notice',
  templateUrl: './upload-notice.component.html',
  styleUrls: ['./upload-notice.component.css']
})
export class UploadNoticeComponent  {

  noticecollectionref: AngularFirestoreCollection<Notice>;
  notices: Observable<Notice[]>;
  Date: Date;
  Description: Notice['description'];
  Designation: Notice['designation'];
  Document: Notice['document'];
  Title: Notice['title'];
  designation: Ddesignations[] = [
    {value: 'Principle', viewValue: 'Principle'},
    {value: 'Staff', viewValue: 'Staff'},
    {value: 'Staff2', viewValue: 'Staff2'}
  ];
   task: AngularFireUploadTask;
   ref: AngularFireStorageReference;
   uploadState: Observable<string>;
   uploadProgress: Observable<number>;
   snapshot: Observable<any>;
   downloadurldoc: string;
   doc: string;



  constructor(public afs: AngularFirestore, public afStorage: AngularFireStorage ) {
    this.noticecollectionref = this.afs.collection<Notice>('Notice');
    this.notices = this.noticecollectionref.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Notice;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  addata() {
 this.afs.collection('Notice').add({
   title: this.Title,
   description: this.Description,
   designation: this.Designation,
    document: this.Document,
 });
 this.Date = new Date();
 console.log(this.Date, this.Title, this.Designation, this.Description,   );
 this.Description = null;
 this.Designation = null;
 this.Title = null;
 this.Date = null;
 this.Description = '';
 this.Designation = '';
 this.Title = '';


  }
upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
finalize(async () => {
this.downloadurldoc = await this.ref.getDownloadURL().toPromise();
console.log( 'the ' + this.downloadurldoc);
this.Document =  this.downloadurldoc;
}
)
    );

}

}
