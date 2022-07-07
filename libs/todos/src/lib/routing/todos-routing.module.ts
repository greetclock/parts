import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TodayComponent } from '../containers/today/today.component'
import { TodosMainComponent } from '../containers/todos-main/todos-main.component'

export const todosRoutes: Routes = [
  {
    path: '',
    component: TodosMainComponent,
    children: [
      {
        path: 'today',
        component: TodayComponent,
      },
      {
        path: '**',
        redirectTo: 'today',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
]

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
