import { Spectator, createComponentFactory } from '@ngneat/spectator/jest'

import { AboutComponent } from './about.component'

describe('AboutComponent', () => {
  let spectator: Spectator<AboutComponent>
  const createComponent = createComponentFactory(AboutComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
