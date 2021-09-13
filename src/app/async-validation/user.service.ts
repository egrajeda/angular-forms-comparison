import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './user';

export interface UserSaveResponse {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isUsernameAvailable(username: string): Observable<boolean> {
    console.log('Is username available?', username);
    // Let's say that all usernames with a dot are taken
    return of(username.indexOf('.') === -1 ? true : false).pipe(delay(1000));
  }

  save(user: User): Observable<UserSaveResponse> {
    console.log('Save:', user);
    return of({
      id: 1,
    }).pipe(delay(1000));
  }
}
