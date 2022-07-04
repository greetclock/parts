import { Injectable } from '@angular/core'
import { v4 as getUuid } from 'uuid'

@Injectable({
  providedIn: 'root',
})
export class UuidGeneratorService {
  getUuid(): string {
    return getUuid()
  }
}
