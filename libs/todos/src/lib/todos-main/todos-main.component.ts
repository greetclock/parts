import { Component } from '@angular/core'
import { RxState } from '@rx-angular/state'
import { TodosMainUiStateService } from './todos-main-ui-state.service'

@Component({
  selector: 'parts-todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css'],
  providers: [TodosMainUiStateService, RxState],
})
export class TodosMainComponent {
  addingNew$ = this.state.state.select('addingNew')

  constructor(private state: TodosMainUiStateService) {}
}
