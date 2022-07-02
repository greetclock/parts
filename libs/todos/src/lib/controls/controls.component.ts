import { Component } from '@angular/core'
import { RxState } from '@rx-angular/state'
import { TodosMainComponentState } from '../todos-main/todos-main.component'

@Component({
  selector: 'parts-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  constructor(private state: RxState<TodosMainComponentState>) {}

  addNew() {
    this.state.set({
      addingNew: true,
    })
  }
}
