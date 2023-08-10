import React, { useEffect, useState } from 'react'
import { db } from '../../../Components/firebase'

export default function useHome() {

    const [posts, setPosts] = useState([])



    useEffect(()=>{
        getPostData()

    },[])




    const getPostData  = () =>{

        db.collection('posts')
        .get()
        .then((snapshot) => {
            const temp = []
              snapshot.forEach((x)=>{
                temp.push(x.data())
              })
              setPosts(temp)

        })
        .catch((err) => {
          console.log(err);
        });




    }
return{

    posts
}
}
