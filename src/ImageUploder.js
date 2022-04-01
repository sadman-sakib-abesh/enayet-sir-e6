import { db,storage } from './firebase';

import React, { useEffect,useState } from 'react';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import firebase from 'firebase';

const ImageUploder =({userName}) =>{
    const [img,setImage]=useState('')
    const [progress,setProgress]=useState('')
    const [caption,setCaption]=useState('')
    const [title,setTitle]=useState('')

const handleUpload=()=>{

if(img===''){
    db.collection("posts").add({

        timestamp:firebase.database.ServerValue.TIMESTAMP,
        Caption:caption,
        Title:title,
        userName:userName,
        like:[],
        comments:[]
               })
       setCaption('')
       setImage(null)
       setProgress(0)
       setTitle("")
       
}else{

const uploadTask=storage.ref(`images/${img.name}`).put(img)
uploadTask.on('state_changed',(snapshot)=>{

    const progress=Math.round(snapshot.bytesTransferred/snapshot.totalBytes)*100

    setProgress(progress)
},(error)=>{
alert(error)
    console.log(error)
},()=>{

    storage.ref("images").child(`${img.name}`).getDownloadURL().then(url=>{

        db.collection("posts").add({

 timestamp:firebase.database.ServerValue.TIMESTAMP,
 Caption:caption,
 image:url,
 Title:title,
 userName:userName,
 like:[],
 comments:[]
        })
setCaption('')
setImage(null)
setProgress(0)
setTitle("")

    })

}

)





}
}



const handleChange=(e)=>{
if(e.target.files[0]){
    setImage(e.target.files[0])
}
}





        return (
            <div className='file_upload'>

<center>
<progress className='progress' value={progress} max='100'/>
<br/>
<Input type='text' className='input' placeholder='inter a title' value={title} onChange={(e)=>setTitle(e.target.value)}/><br/><br/><br/>

<textarea type='text' className='input-2' placeholder='inter a text' value={caption} onChange={(e)=>setCaption(e.target.value)}></textarea><br/><br/><br/>

<input type='file' onChange={handleChange}/><br/><br/><br/>
<Button onClick={handleUpload}>upload</Button>
</center>

            </div>
        );
    
}

export default ImageUploder;