import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {MatSort} from '@angular/material';


class EnquiryModel {

  name: string;
  number: number;
  Date: Date;

}

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent  {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  enqCollectionRef: AngularFirestoreCollection<EnquiryModel>;
  enquiries: Observable<EnquiryModel[]>;
  displayedColumns: any;
  constructor(public afs: AngularFirestore) {
    this.enqCollectionRef = this.afs.collection<EnquiryModel>('Enquiry', ref =>
      ref.orderBy('date', 'desc'));
    this.enquiries = this.enqCollectionRef.valueChanges();
    this.displayedColumns = ['Name', 'Phone', 'Time'];

  }
delete(){

}


}
