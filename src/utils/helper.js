import {usersDb2, usersDb} from "./db"

// Load demo data
export const getUsers = () => usersDb

// Capitalize the first letter of a word
export function capitalize (str = "...") {
  return str[0].toUpperCase() + str.slice(1)
}
