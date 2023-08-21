import React from 'react'
import Input from '../../../Components/Input/Input'
import { useDispatch, useSelector } from 'react-redux';
import useHome from './useHome';
import RecipeReviewCard from './components/PostCard';
import NewPost from './components/NewPost';

const UserHome = () => {
  const appState = useSelector(state => (state.auth.userInfo))

  const { posts } = useHome()
  console.log(posts, "posts")


  return (
    <>
      <div style={{ display: 'grid', marginTop: 10, justifyContent: "center", alignItems: 'center' }}>
        <NewPost />

        <div style={{ marginTop: 10 }}  >
          {
            posts?.map((p) => {
              return (

                <RecipeReviewCard postData={p} />
              )
            })
          }
        </div>

      </div>
    </>
  )
}

export default UserHome