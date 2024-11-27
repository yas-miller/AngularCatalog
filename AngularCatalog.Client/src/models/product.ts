import { Category } from "./category"
import { User } from "./user"

export class Product {
  Id: Number | undefined
  Name!: string
  Category: Category | null | undefined
  Description: string | null | undefined
  PriceRubles: number | null | undefined
  Notes: string | null | undefined
  NotesSpecial: string | null | undefined
  ImageUrl: string | null | undefined
  UserCreated: User | undefined
  DateTimeCreated: Date | undefined
}
