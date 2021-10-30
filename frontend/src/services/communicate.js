import axios from 'axios'

const get = ({username, token}) => {
  const request = axios.get(`/users/${username}/${token}`)
  console.log(request)
  const data = request.then(response => response.data)
  console.log(data)
  return data
}

const create = newObject => {
  const url = `/users/${newObject.username}/${newObject.token}`
  const request = axios.post(url, newObject)
  console.log(newObject)
  return request.then(response => response.data)
}

const getSecurityQuestion = (username) => {
  const url = `/security/${username}`

  const request = axios.get(url, {})
  const data = request.then(response => response.data)

  console.log(data)
  return data
}

const createSecurityQuestion = sendObj => {
  const url = `/security/${sendObj.username}`
  const request = axios.post(url, sendObj)
  const data = request.then(response => response.data)
  
  console.log(data)
  return data
}

const communicate = { 
  get, create, getSecurityQuestion, createSecurityQuestion
}

export default communicate