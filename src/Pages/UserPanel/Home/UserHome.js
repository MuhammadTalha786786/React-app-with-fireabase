import React from 'react'
import Input from '../../../Components/Input/Input'
import { useDispatch, useSelector } from 'react-redux';

 


const UserHome = () => {
const appState= useSelector(state => (state.auth.userInfo))
console.log(appState)


  return (
    <div>

      <img src={appState.userImage} alt="Logo" />
        <h1 className='text-primary'>
            Hello there
        </h1>
        <Input/>

    </div>
  )
}

export default UserHome