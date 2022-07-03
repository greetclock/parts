import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { TodosDataModule } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { NewTodoComponent } from './new-todo.component'

describe('NewTodoComponent', () => {
  let spectator: Spectator<NewTodoComponent>
  const createComponent = createComponentFactory({
    component: NewTodoComponent,
    imports: [TodosDataModule],
    providers: [mockProvider(RxState)],
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
