import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalTodosAdapterService } from './adapters/local-todos-adapter.service'
import { TodosAdapterService } from './todos-adapter.service'
import { TodosDataService } from './todos-data.service'
import { TodosFacadeService } from './todos-facade.service'

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: TodosAdapterService,
      useClass: LocalTodosAdapterService,
    },
    TodosFacadeService,
    TodosDataService,
  ],
})
export class TodosDataModule {}
