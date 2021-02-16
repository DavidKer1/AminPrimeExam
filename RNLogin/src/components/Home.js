import React, { useEffect } from 'react'
import { useState } from 'react';
import { View, Text } from 'react-native'
import jwt_decode from "jwt-decode";
export default function Home(props) {
  const [user, setUser] = useState({})
  const {route} = props
  const token = route.params.token
  
  useEffect(() => {
    const {id,nombre,username} = jwt_decode(token)
    setUser({
      id,
      nombre,
      username
    })
  }, [token])
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Token: {token}</Text>
      <Text>Usuario: {JSON.stringify(user)}</Text>
    </View>
  )
}
