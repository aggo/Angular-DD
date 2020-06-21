import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KataService {
  private katasUrl = 'api/katas';

  constructor() {
  }

}
