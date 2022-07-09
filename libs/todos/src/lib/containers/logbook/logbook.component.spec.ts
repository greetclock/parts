import { Spectator, createComponentFactory } from '@ngneat/spectator/jest'

import { LogbookComponent } from './logbook.component'

describe('LogbookComponent', () => {
  let spectator: Spectator<LogbookComponent>
  const createComponent = createComponentFactory(LogbookComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
