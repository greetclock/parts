import { Component } from '@angular/core'
import { RxState } from '@rx-angular/state'
import { combineLatest, map, Observable } from 'rxjs'
import { TodosMainUiStateService } from './todos-main-ui-state.service'

@Component({
  selector: 'parts-todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css'],
  providers: [TodosMainUiStateService, RxState],
})
export class TodosMainComponent {
  isTodoExpanded$: Observable<boolean> = combineLatest([
    this.state.state.select('addingNew'),
    this.state.state.select('expandedEntry'),
  ]).pipe(
    map(([addingNew, expandedEntry]) => addingNew || expandedEntry !== null)
  )

  constructor(private state: TodosMainUiStateService) {}
}
