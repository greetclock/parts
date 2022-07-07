import { Injectable } from '@angular/core'
import { RxState } from '@rx-angular/state'

export interface TodosMainUiState {
  addingNew: boolean
}

@Injectable()
export class TodosMainUiStateService {
  constructor(public state: RxState<TodosMainUiState>) {
    this.initializeUiState()
  }

  setAddingNew(addingNew: boolean) {
    this.state.set({ addingNew })
  }

  private initializeUiState() {
    const initialState: TodosMainUiState = {
      addingNew: false,
    }

    this.state.set(initialState)
  }
}
