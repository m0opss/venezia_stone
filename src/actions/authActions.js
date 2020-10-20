

const authActions = {
  setAuth: (data) => {
    return {
      type: 'SET_AUTH',
      payload: data,
    }
  },
  setToken: (data) => {
    localStorage.setItem('auth_token', data)
    return {
      type: 'SET_TOKEN',
      payload: data,
    }
  },
}

export default authActions
