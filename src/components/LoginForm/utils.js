export const sendDataHandler = (items, props) => () => {
  const { email, username, password } = items
  if (username) {
    props.listener(username, email, password)
  } else {
    props.listener(email, password)
  }
}
