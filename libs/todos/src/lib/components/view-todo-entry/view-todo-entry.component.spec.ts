import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { EMPTY, Subject } from 'rxjs'
import { ViewTodoEntryComponent } from './view-todo-entry.component'

describe('ViewTodoEntryComponent', () => {
  let spectator: Spectator<ViewTodoEntryComponent>
  const createComponent = createComponentFactory({
    component: ViewTodoEntryComponent,
    shallow: true,
  })

  it('should create', () => {
    spectator = createComponent({
      props: {
        todo: {
          title: 'Buy Milk',
          status: 'pending',
        },
        isExpanded: false,
      },
    })

    expect(spectator.component).toBeTruthy()
  })

  describe('click outside', () => {
    function getOutsideClickSubject(): Subject<void> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (spectator.component as any).outsideClicks$
    }

    it('should save component on the outside click', () => {
      spectator = createComponent({
        props: {
          todo: {
            title: 'Buy Milk',
            status: 'pending',
          },
          isExpanded: true,
        },
      })

      spectator.component.onSave = jest.fn().mockReturnValue(EMPTY)

      const outsideClick$ = getOutsideClickSubject()

      outsideClick$.next()

      expect(spectator.component.onSave).toHaveBeenCalled()
    })
  })
})
