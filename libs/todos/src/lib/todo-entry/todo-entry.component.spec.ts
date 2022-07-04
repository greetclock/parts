import { Spectator, createComponentFactory } from '@ngneat/spectator/jest'

import { TodoEntryComponent } from './todo-entry.component'

describe('TodoEntryComponent', () => {
  let spectator: Spectator<TodoEntryComponent>
  const createComponent = createComponentFactory(TodoEntryComponent)

  it('should create', () => {
    spectator = createComponent({
      props: {
        todo: {
          uuid: 'uuid1',
          title: 'Hello',
        },
      },
    })

    expect(spectator.component).toBeTruthy()
  })

  it('should throw error if props are not submitted', () => {
    expect(() => createComponent()).toThrow()
  })
})
