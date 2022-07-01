import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TodosRoutingModule } from './routing/todos-routing.module'
import { TodayComponent } from './today/today.component'

@NgModule({
  imports: [CommonModule, TodosRoutingModule],
  declarations: [TodayComponent],
})
export class TodosModule {}
