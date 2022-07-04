import { jest } from '@jest/globals'
import { defer, of, isObservable } from 'rxjs'

export function mockObservable(value: (...args: any[]) => any) {
  return jest.fn().mockImplementation((...args: any[]) =>
    defer(() => {
      const v = value(...args)

      if (!isObservable(v)) {
        return of(v)
      } else {
        return v
      }
    })
  )
}
