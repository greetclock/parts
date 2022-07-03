import { jest } from '@jest/globals'
import { defer, of } from 'rxjs'

export function mockObservable(value: (...args: any[]) => any) {
  return jest
    .fn()
    .mockImplementation((...args: any[]) => defer(() => of(value(...args))))
}
