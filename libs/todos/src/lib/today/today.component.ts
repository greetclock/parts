import { Component } from '@angular/core'
import { RxState } from '@rx-angular/state'
import { TodosMainComponentState } from '../todos-main/todos-main.component'

@Component({
  selector: 'parts-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent {
  addingNew$ = this.state.select('addingNew')

  constructor(private state: RxState<TodosMainComponentState>) {}
}
