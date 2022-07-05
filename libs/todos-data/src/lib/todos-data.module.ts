import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ApiTodosAdapterService } from './adapters/api-todos-adapter.service'
import { TodosAdapterService } from './todos-adapter.service'
import { TodosDataService } from './todos-data.service'
import { TodosFacadeService } from './todos-facade.service'

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: TodosAdapterService,
      useClass: ApiTodosAdapterService,
    },
    TodosFacadeService,
    TodosDataService,
  ],
})
export class TodosDataModule {}
