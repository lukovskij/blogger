export const sendDataHandler = (items, props) => () => {
  const { email, username, password } = items
  if (username) {
    props.listener(username, email, password)
  } else {
    props.listener(email, password)
  }
}

export const validateEmail = value => {
  let error
  if (!value) {
    error = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address'
  }
  return error
}

export const validateUsername = value => {
  let error
  if (value === 'admin') {
    error = 'Nice try!'
  }
  return error
}

export const validatePassword = value => {
  let error
  if (!value) error = 'Required'
  else if (value.length <= 6) error = 'Passwoed must  be more then 6 chars'
  return error
}
