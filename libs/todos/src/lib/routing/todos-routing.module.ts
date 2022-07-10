import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from '../containers/about/about.component'
import { LogbookComponent } from '../containers/logbook/logbook.component'
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
        path: 'logbook',
        component: LogbookComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
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
