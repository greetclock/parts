import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { TodosMainComponent } from './todos-main.component'

describe('TodosMainComponent', () => {
  let spectator: Spectator<TodosMainComponent>
  const createComponent = createComponentFactory(TodosMainComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
