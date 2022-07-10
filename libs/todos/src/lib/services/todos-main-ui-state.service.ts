import { Injectable } from '@angular/core'
import { Todo } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { combineLatest, map, Observable } from 'rxjs'

export interface TodosMainUiState {
  addingNew: boolean
  expandedEntry: Todo['uuid'] | null
  logbookOpened: boolean
  showControls: boolean
}

@Injectable()
export class TodosMainUiStateService {
  isTodoExpanded$: Observable<boolean> = combineLatest([
    this.state.select('addingNew'),
    this.state.select('expandedEntry'),
  ]).pipe(
    map(([addingNew, expandedEntry]) => addingNew || expandedEntry !== null)
  )

  constructor(public state: RxState<TodosMainUiState>) {
    this.initializeUiState()
  }

  setAddingNew(addingNew: boolean) {
    this.state.set({ addingNew })
  }

  expandEntry(uuid: Todo['uuid']) {
    this.state.set({
      expandedEntry: uuid,
    })
  }

  collapseEntry(uuid: Todo['uuid']) {
    const expandedEntry = this.state.get('expandedEntry')

    if (expandedEntry === uuid) {
      this.state.set({
        expandedEntry: null,
      })
    }
  }

  collapseAll() {
    this.state.set({
      expandedEntry: null,
      addingNew: false,
    })
  }

  logbookOpened(opened: boolean) {
    this.state.set({
      logbookOpened: opened,
    })
  }

  showControls() {
    this.state.set({
      showControls: true,
    })
  }

  hideControls() {
    this.state.set({
      showControls: false,
    })
  }

  private initializeUiState() {
    const initialState: TodosMainUiState = {
      addingNew: false,
      expandedEntry: null,
      logbookOpened: false,
      showControls: true,
    }

    this.state.set(initialState)
  }
}
