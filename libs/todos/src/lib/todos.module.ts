import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ControlsComponent } from './controls/controls.component'
import { TodosRoutingModule } from './routing/todos-routing.module'
import { TodayComponent } from './today/today.component'
import { TodosMainComponent } from './todos-main/todos-main.component'

@NgModule({
  imports: [CommonModule, TodosRoutingModule],
  declarations: [TodayComponent, TodosMainComponent, ControlsComponent],
})
export class TodosModule {}
