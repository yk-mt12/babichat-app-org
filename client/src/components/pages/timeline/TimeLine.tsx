import {
  collection,
  collectionGroup,
  doc,
  DocumentReference,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../../firebase'
import Post from './Post'
import Header from '../../ui/header/Header'
import PostBox from '../../ui/input/post/PostBox'

import './TimeLine.css'
import { useAuth } from '../../../firebase/authFunction'
import BackgroundFluid from '../../ui/background/BackgroundFluid'

type PostType = {
  author: DocumentReference
  displayName: string
  text: string
  avater: string
  image: string
  createTime: string
  updateTime: string
  likeCount: number
  postId: string
}

const TimeLine = () => {
  // TODO: 型定義を正しく行う
  const location = useLocation()
  const signInUser = useAuth()
  const [posts, setPosts] = useState<any>([])
  const [likedPosts, setLikedPosts] = useState<any>([])

  useEffect(() => {
    const q: any = query(collectionGroup(db, 'posts'), orderBy('createTime', 'desc'))
    // 最新の投稿順に並び替える
    // リアルタイムでデータを取得
    const unsub = onSnapshot(q, (querySnapshot: { docs: any[] }) => {
      setPosts(querySnapshot.docs.map((doc) => doc.data()))
    })
    return () => unsub()
  }, [])

  return (
    <>
      <BackgroundFluid top={2} rigth={2} deg={10} backgroundColor={'#fff100'} />
      <BackgroundFluid top={40} rigth={60} deg={30} backgroundColor={'#fbad03'} />
      <BackgroundFluid top={5} rigth={100} deg={90} backgroundColor={'#a3e417'} />
      <BackgroundFluid top={60} rigth={120} deg={45} backgroundColor={'#ee6eee'} />

      <div className='timeline'>
        <Header title='ぽすと' />
        {location.pathname != '/home' && <PostBox />}

        <div className={location.pathname !== '/home' ? 'timeline--block' : ''}>
          {posts.map((post: PostType) => (
            <Post
              key={post.postId}
              author={post.author}
              displayName={post.displayName}
              text={post.text}
              avater={post.avater}
              image={post.image}
              createTime={post.createTime}
              updateTime={post.updateTime}
              likeCount={post.likeCount}
              postId={post.postId}
              likedPosts={likedPosts}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default TimeLine
