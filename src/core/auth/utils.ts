export const addUser = (user: string) => {
  sessionStorage.setItem('user', user)
  dispatchEvent(new Event('add-new-user'))
}
