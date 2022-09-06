import { Grid } from '@mui/material'
import { collection, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore'
import { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../../firebase'
import BackgroundFluid from '../../ui/background/BackgroundFluid'
import Header from '../../ui/header/Header'
import User from './User'
import './UserList.css'

// eslint-disable-next-line react/display-name
const UserList = memo(() => {
  const [users, setUsers] = useState<any>([])
  const location = useLocation()

  useEffect(() => {
    const q: any = query(collection(db, 'users'))
    const unsub = onSnapshot(q, (querySnapshot: { docs: any[] }) => {
      setUsers(querySnapshot.docs.map((doc) => doc.data()))
    })

    return () => unsub()
  }, [])

  const userlist = users

  return (
    <>
      {location.pathname === '/chatroom' || location.pathname === '/home' ? (
        <>
          <BackgroundFluid top={2} rigth={2} deg={10} backgroundColor={'#fff100'} />
          <BackgroundFluid top={40} rigth={60} deg={30} backgroundColor={'#fbad03'} />
          <BackgroundFluid top={5} rigth={100} deg={90} backgroundColor={'#a3e417'} />
          <BackgroundFluid top={60} rigth={120} deg={45} backgroundColor={'#ee6eee'} />
          <Header title='ちゃっとるーむ' />
          <Grid item xs={12} className={`${location.pathname !== '/home' && 'userlist'}`}>
            {location.pathname === '/home' || (
              <div className='userlist-title'>
                <p>ユーザーリスト</p>
              </div>
            )}
            <div>
              <User userlist={userlist} />
            </div>
          </Grid>
        </>
      ) : (
        // ユーザリストのみを表示
        <Grid item xs={4} className='userlist'>
          <div className='userlist-title'>
            <p>ユーザーリスト</p>
          </div>
          <div>
            <User userlist={userlist} />
          </div>
        </Grid>
      )}
    </>
  )
})

export default UserList
