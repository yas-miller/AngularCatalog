import { EUserType } from "./Enums/eusertype"

export class User {
  Id: Number | undefined
  IsBlocked: boolean = false
  UserType: EUserType = EUserType.User
  Name: string | null | undefined 
  Surname: string | null | undefined
  Email!: string
  Login!: string
  Password: string | null | undefined
}
