import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BASE_URL as TODOS_BASE_URL } from '@parts/todos/registry'

export const routes: Routes = [
  {
    path: TODOS_BASE_URL,
    loadChildren: () => import('@parts/todos').then((m) => m.TodosModule),
  },
  {
    path: '**',
    redirectTo: TODOS_BASE_URL,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
