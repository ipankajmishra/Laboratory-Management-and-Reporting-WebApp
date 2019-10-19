import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 category: any = [];
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 
  create_NewStudent(record) {
    return this.firestore.collection('category').add(record);
  }
 
  read_Students() {
    return this.firestore.collection('category').snapshotChanges();
  }
 
  update_Student(recordID,record){
    this.firestore.doc('category/' + recordID).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc('category/' + record_id).delete();
  }
}