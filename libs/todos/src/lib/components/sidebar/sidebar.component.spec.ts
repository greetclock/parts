import { fakeAsync, tick } from '@angular/core/testing'
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { TodosFacadeService } from '@parts/todos/data'
import { defer, of } from 'rxjs'
import { SidebarComponent } from './sidebar.component'

describe('SidebarComponent', () => {
  let todosNumber: number

  let spectator: Spectator<SidebarComponent>
  const createComponent = createComponentFactory({
    component: SidebarComponent,
    providers: [
      mockProvider(TodosFacadeService, {
        todosNumber$: defer(() => of(todosNumber)),
      }),
    ],
    shallow: true,
  })

  beforeEach(() => {
    todosNumber = 0
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })

  it('should watch the number of todos', fakeAsync(() => {
    todosNumber = 10

    spectator = createComponent()
    tick()

    const todayLink = spectator.component.links.find((it) => it.id === 'today')

    expect(todayLink?.endText).toEqual('10')
  }))
})
