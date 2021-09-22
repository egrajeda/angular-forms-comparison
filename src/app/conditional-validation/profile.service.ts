import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Profile } from './profile';

export interface ProfileSaveResponse {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  save(profile: Profile): Observable<ProfileSaveResponse> {
    console.log('Save:', profile);
    return of({
      id: 1,
    }).pipe(delay(1000));
  }
}
