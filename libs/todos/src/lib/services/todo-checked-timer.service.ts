import { Injectable } from '@angular/core'
import { debounceTime, Subject } from 'rxjs'

export const CHECKED_DELAY = 2000

@Injectable({
  providedIn: 'root',
})
export class TodoCheckedTimerService {
  private checkedSubject = new Subject<void>()

  public checked$ = this.checkedSubject.pipe(debounceTime(CHECKED_DELAY))

  checkTodo() {
    this.checkedSubject.next()
  }
}
