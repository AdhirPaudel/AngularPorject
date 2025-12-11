import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.models';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private users$ = new BehaviorSubject<User[]|any>([
    { id: 1, name: 'Alice', email: 'alice@mail.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', role: 'Editor' },
    { id: 3, name: 'Eve', email: 'eve@mail.com', role: 'Viewer' }
  ]);

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  addUser(user: User) {
    const updated = [...this.users$.value, user];
    this.users$.next(updated);
  }
}
