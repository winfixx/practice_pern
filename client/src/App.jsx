import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { check } from './http/userAPI'
import { Context } from './index'

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
      .then(data => {
        user.setUser(data)
        user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner
      style={{ position: 'absolute', top: '50%', left: '50%' }}
      animation={'grow'}
    />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
