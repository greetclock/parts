export function contains(parent: HTMLElement, child: HTMLElement): boolean {
  let currentElement: HTMLElement | null = child
  while (currentElement !== null) {
    if (currentElement === parent) {
      return true
    }

    currentElement = currentElement.parentElement
  }

  return false
}
