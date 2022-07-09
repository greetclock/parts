import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { TodosFacadeService } from '@parts/todos/data'
import { EMPTY } from 'rxjs'
import { LogbookComponent } from './logbook.component'

describe('LogbookComponent', () => {
  let spectator: Spectator<LogbookComponent>
  const createComponent = createComponentFactory({
    component: LogbookComponent,
    providers: [
      mockProvider(TodosFacadeService, {
        doneTodos$: EMPTY,
      }),
    ],
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
