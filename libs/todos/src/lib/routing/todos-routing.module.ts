import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TodayComponent } from '../today/today.component'

export const todosRoutes: Routes = [
  {
    path: 'today',
    component: TodayComponent,
  },
  {
    path: '**',
    redirectTo: 'today',
  },
]

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
})
export class TodosRoutingModule {}
