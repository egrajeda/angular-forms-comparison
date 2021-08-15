import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/simple-form/user';

export interface UserSaveResponse {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  save(user: User): Observable<UserSaveResponse> {
    console.log('Save:', user);
    return of({
      id: 1,
    }).pipe(delay(1000));
  }
}
