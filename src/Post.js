import React ,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { FormatColorReset } from '@material-ui/icons';



function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };

}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width:400,
    overflowY:'scroll',
    backgroundColor: theme.palette.background.paper,
  border:'0px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const useStyles2 = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width:700,
    overflowY:'scroll',
    backgroundColor: theme.palette.background.paper,
  
    boxShadow: theme.shadows[5],
    padding:'0px'
  },
}));




const Post =({id,user,like,userName,Title,Caption,image,comments}) =>{

  const [modalStyle] = React.useState(getModalStyle);
const [open,setOpen]=useState(false)
const [card,setCard]=useState(false)
const [comment,setComment]=useState('')
const classes = useStyles();
const classes2 = useStyles2();

const liking=()=>{
  db.collection('posts').doc(id).get().then((res)=>{

    let likes=res.data().like
  
likes.push(user)

document.getElementById('heart-1').style.transition='0.6s'



//setTimeout(() => {
  db.collection("posts").doc(id).set({
    timestamp:res.data().timestamp,
    Caption:res.data().Caption,
    image:res.data().image?res.data().image:null,
    userName:res.data().userName,
    Title:res.data().Title,
    like:likes,
    comments:res.data().comments
  });
 
//}, 500);

 })
}




const com=()=>{
  db.collection('posts').doc(id).get().then((res)=>{

    let comm=res.data().comments
  comm.push({commenter:user,text:comment})



//setTimeout(() => {
  db.collection("posts").doc(id).set({
    timestamp:res.data().timestamp,
    Caption:res.data().Caption,
    image:res.data().image?res.data().image:null,
    Title:res.data().Title,
    userName:res.data().userName,
    like:res.data().like,
    comments:comm
  });
 alert("comment posted")
 setComment("")
//}, 500);

 })
}






const unlike=()=>{
  db.collection('posts').doc(id).get().then((res)=>{
    let likes=res.data().like
  
    
    likes.splice(likes.indexOf(user), 1);
  
  document.getElementById('heart-2').style.transition='0.6s'
  
//setTimeout(() => {
  db.collection("posts").doc(id).set({
    timestamp:res.data().timestamp,
    Caption:res.data().Caption,
    Title:res.data().Title,
    image:res.data().image?res.data().image:null,
    userName:res.data().userName,
    like:likes,
    comments:res.data().comments
  });
 
//}, 500);

 })
}






        return (
            <div className='post'>
            
            <Modal
        open={open}
        onClose={()=>setOpen(false)}
        >
         
 <div style={modalStyle} className={classes.paper}>

   <center id='likers_head'>Likes</center>
     {like.map(rec=>
        <div className='post_header'>
        <Avatar alt={rec}
      style={{ height: '35px', width: '35px',fontSize:'18px'}}
         src="/static/images/avatar/1.jpg" 
         className='post_avatar' />
<h3>{rec}</h3>
</div>
     )}
     </div></Modal>

     <Modal
        open={card}
        onClose={()=>setCard(false)}
        >
         
 <div style={modalStyle} className={classes2.paper}>
<div className='pil'>
<div className='second'>
<img src={image} width='100%'/>
</div>
<div className='second'>
<div className='post_header'>
                <Avatar alt={userName}
              style={{ height: '35px', width: '35px',fontSize:'18px'}}
                 src="/static/images/avatar/1.jpg" 
                 className='post_avatar' />
<h3>{userName}</h3>
</div>

{comments.map(rec=><><div className='post_header2'>
  <Avatar alt={rec.commenter}
              style={{ height: '25px', width: '25px',fontSize:'10px'}}
                 src="/static/images/avatar/1.jpg" 
                 className='post_avatar' />
<b>{rec.commenter}</b>  &nbsp;
<p>{rec.text}</p>
</div></>)}



</div>
</div>



     </div></Modal>





              <div className='post_header'>
                <Avatar alt={userName}
              style={{ height: '35px', width: '35px',fontSize:'18px'}}
                 src="/static/images/avatar/1.jpg" 
                 className='post_avatar' />
<h3>{userName}</h3>
</div>

<h4 className='post_text'> <strong>{Title}</strong><br/>{Caption}</h4>
<img src={image}
alt=''
className='image_post'/>
{like.includes(user)?<i id='heart-2' onClick={()=>unlike()} class='fa fa-heart'></i>:<i id='heart-1' onClick={()=>liking()} class='fa fa-heart-o'></i>}<i id='heart-1' onClick={()=>setCard(true)} class='fa fa-comment-o'></i>
{like.length>0?<h4 onClick={()=>setOpen(true)} className='post_text'>Liked by <strong>{like[0]}</strong>{like.length>1?<> and <strong>{like.length-1} other{like.length-1===1?(<></>):(<>s</>)}</strong></>:<></>}</h4>:<></>}
{comments?<p onClick={()=>setCard(true)} className='comments-see'>View all {comments.length} comments</p>:<></>}


<div className='comment'>
<input type='text'  className='in-put' placeHolder='Add a comment...' onChange={(e)=>setComment(e.target.value)}/>{comment?<div onClick={()=>com()} className='btn'>Post</div>:<div className='btn-2'>Post</div>}
</div>
            </div>
        );


};

export default Post;