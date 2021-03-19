const users = []

export const addUser = (id, room, name, picture) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  )

  const user = { id, name, picture, room }
  users.push(user)
  return { id, name: user.name, picture: user.picture }
}

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) return users.splice(index, 1)[0]
}

export const getUser = (id) => users.find((user) => user.id === id)

export const getUsersInRoom = (room) =>
  users.filter((user) => user.room === room)
