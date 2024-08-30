export type TService = {
  name: string
  description: string
  image: string
  price: number
  duration: number
  isDeleted: boolean
}

export type TServiceQueries = {
  duration?: number
  search?: string
  sort?: 'ascending' | 'descending'
}
