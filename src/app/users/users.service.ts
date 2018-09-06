import { Observable } from 'rxjs/internal/Rx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;
  selectedUser: User;

  constructor(private firebase: AngularFirestore) {
    this.usersCollection = firebase.collection('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getUser (id: string): Observable<User> {
    return this.firebase.doc<User>(`users/${id}`).valueChanges();
  }

  updateUser(id: string, updatedUser: User): void {
    this.firebase.doc<User>(`users/${id}`).update(updatedUser);
  }

  addUser(newUser: User): void {
    const id = this.firebase.createId();
    console.log(id);
    this.usersCollection.add(newUser);
  }

  deleteUser(id: string) {
    this.firebase.doc<User>(`users/${id}`).delete();
  }
}
