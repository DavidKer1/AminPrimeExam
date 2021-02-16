import axios from "axios"

export const postRegister = ({nombre, username, password}) => {
  return axios.post('http://127.0.0.1:5000/register', {
    nombre,
    username,
    password
  }).then((res) => {
    console.log(res);
    return res
  }).catch((err) => {
    return err
  })
}

export const postLogin = ({ username, password}) => {
  return axios.post('http://127.0.0.1:5000/login', {
    username,
    password
  }).then((res) => {
    return res
  }).catch((err) => {
    return err
  })
}