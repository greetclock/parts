import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TodosDataModule } from '@parts/todos/data'
import { AutofocusDirective } from './autofocus.directive'
import { CheckboxComponent } from './checkbox/checkbox.component'
import { ControlsComponent } from './controls/controls.component'
import { NewTodoComponent } from './new-todo/new-todo.component'
import { TodosRoutingModule } from './routing/todos-routing.module'
import { TodayComponent } from './today/today.component'
import { TodoEntryComponent } from './todo-entry/todo-entry.component'
import { TodosMainComponent } from './todos-main/todos-main.component'
import { ViewTodoEntryComponent } from './view-todo-entry/view-todo-entry.component'

@NgModule({
  imports: [CommonModule, TodosRoutingModule, FormsModule, TodosDataModule],
  declarations: [
    TodayComponent,
    TodosMainComponent,
    ControlsComponent,
    NewTodoComponent,
    TodoEntryComponent,
    CheckboxComponent,
    AutofocusDirective,
    ViewTodoEntryComponent,
  ],
})
export class TodosModule {}
