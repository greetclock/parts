export interface Todo {
  uuid: string
  title: string
  description?: string
  status: 'pending' | 'done'
}
