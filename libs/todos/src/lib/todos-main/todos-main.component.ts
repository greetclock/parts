import { Component } from '@angular/core'
import { RxState } from '@rx-angular/state'

export interface TodosMainComponentState {
  addingNew: boolean
}

@Component({
  selector: 'parts-todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css'],
  providers: [RxState],
})
export class TodosMainComponent {
  addingNew$ = this.state.select('addingNew')

  constructor(public state: RxState<TodosMainComponentState>) {
    this.initializeComponentState()
  }

  private initializeComponentState() {
    const initialState: TodosMainComponentState = {
      addingNew: false,
    }

    this.state.set(initialState)
  }
}
