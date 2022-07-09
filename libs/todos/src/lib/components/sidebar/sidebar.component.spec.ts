import { Spectator, createComponentFactory } from '@ngneat/spectator/jest'

import { SidebarComponent } from './sidebar.component'

describe('SidebarComponent', () => {
  let spectator: Spectator<SidebarComponent>
  const createComponent = createComponentFactory(SidebarComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
