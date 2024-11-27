import { Product } from "./product"
import { User } from "./user"

export class Category {
  Id: Number | undefined
  Name!: string
  UserCreated: User | undefined
  DateTimeCreated: Date | undefined
  Products: Product[] | undefined
}
