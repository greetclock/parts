import { Spectator, createComponentFactory } from '@ngneat/spectator/jest'

import { TodoEntryComponent } from './todo-entry.component'

describe('TodoEntryComponent', () => {
  let spectator: Spectator<TodoEntryComponent>
  const createComponent = createComponentFactory(TodoEntryComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
