"use client"; 
import {useEffect, useState } from "react";
import Avatar from "./Avatar";
import Card from "./Card";
import Link from "next/link";
import ReactTimeAgo from 'react-time-ago'
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Comments from "./Comments";

export default function PostCard({post, loggedInUser}) {

  const [open, setOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState(false);
  useEffect(()=>{
    getLikes();
    getComments();
    getSaved();
  }, []);
  console.log({likes});
  console.log({comments});

  const isLikedByLoggedInUser = !!likes.find(like => like.user_id === loggedInUser.id);   //Converted to boolean
 console.log({isLikedByLoggedInUser});
  const dropdownClassName = "flex gap-4 p-2 font-bold hover:bg-socialBlue  hover:text-white transition-all rounded-md hover:scale-110 hover:shadow-md hover:shadow-gray-200 w-full";
  console.log(post)
  console.log({loggedInUser});
  const supabase = useSupabaseClient();

  function getLikes() {
    supabase.from('likes').select().eq('post_id', post.id)
    .then((response)=>{
      setLikes(response.data);
    })
  }
  function getComments() {
    supabase.from('comments').select('comment, created_at, profiles(id, avatar, name), post_id').eq('post_id', post.id)
    .then((response)=>{
      setComments(response.data);
    })
  }

  function postComment() {
    supabase.from('comments').insert({
      'comment': comment,
      'user_id': loggedInUser.id,
      'post_id': post.id,
    }).then(response =>{
      console.log(response);
      setComment('');
      getComments();
    })
  }

  async function likePost() {
    if (isLikedByLoggedInUser) {
      const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', loggedInUser.id)
      .eq('post_id', post.id)
      console.log({error});
      if (!error) {
        getLikes();
      }
    }
    else{
      supabase.from('likes').insert({
        post_id: post.id,
        user_id: loggedInUser.id,
      })
      .then(response =>{
        console.log(response);
        getLikes();
      })
    }
  }

  function savePost() {
    supabase.from('saved').insert({
      post_id: post.id,
      user_id: loggedInUser.id,
    })
    .then(response =>{
      console.log(response);
      setOpen(false);
    })
  }

  function getSaved() {
    supabase.from('saved').select().eq('user_id', loggedInUser?.id).eq('post_id', post?.id)
    .then((response)=>{
      if (response.data) {
        setSaved(true);
      }
    })
  }
  
    return (
        <Card padding={true}>
          
          <div className="flex gap-4">
            <div onClick={()=>{setOpen(false); setShowComments(false)}}>
              <Link href={{
            pathname: `/profile/${post?.profiles?.id}`,
            query: { name: 'test' },
          }}>
              <Avatar width={"w-12"} height={"h-12"} url={post?.profiles?.avatar}/>
              </Link>
            </div>
            <div className="grow items-center" onClick={()=>setOpen(false)}>
              <Link href={"/profile/"+post?.profiles?.id}>
              <span className="font-semibold hover:text-socialBlue hover:underline hover:cursor-pointer">{post?.profiles?.name}</span>
              </Link>
              
              <p className="text-gray-500 text-sm"><ReactTimeAgo date={post?.created_at} locale="en-US"/></p>
            </div>
            <div>
            <button className="text-gray-400" onClick={()=>setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
</svg>
            </button>
        <div className="relative">
        {open &&
        (<div className="absolute grow right-6 bg-white shadow-gray-300 shadow-md rounded-xl border-gray-200 px-4 py-2">
        {saved && (
          <button className={dropdownClassName} onClick={savePost}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>
  <p>Save</p>
  </button>
        )}
        <a className={dropdownClassName}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg>

          <p>Notify</p>
          </a>
        <a className={dropdownClassName}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>

          <p>Hide</p>
          </a>
        <a className={dropdownClassName}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

          Delete
          </a>
        <a className={dropdownClassName}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
</svg>


          Report
          </a>
       </div>)}
        </div>

            </div>
          </div>
          <div className="my-4" onClick={()=>setOpen(false)}>
            <p onClick={()=>setShowComments(false)}>{post?.content}</p>
            {post?.photos?.length > 1 && (
             <div className="grid grid-cols-2 gap-2" onClick={()=>setShowComments(false)}>
              { post?.photos?.map(photo =>(
                 <div>
                  <img src={photo} className="rounded-lg w-64 h-44"/>
               </div>
              ))}
              </div> 
            )}
            {post?.photos?.length == 1 && (
             <div className="">
              { post?.photos?.map(photo =>(
                 <div>
                  <img src={photo} className="rounded-lg w-3/4 mx-auto h-64"/>
               </div>
              ))}
              </div> 
            )}
            <div className="flex gap-8 mt-4 px-2">
              <button className="flex gap-2" onClick={likePost}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={isLikedByLoggedInUser? "#E90064" : "none"} viewBox="0 0 24 24" strokeWidth={isLikedByLoggedInUser? 0 : 1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
          {likes?.length}
              </button>
              <button className="flex gap-2" onClick={()=>setShowComments(!showComments)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
          {comments?.length}
              </button>
              <div className="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>
         0
              </div>
            </div>
          </div>
         {showComments && comments.length > 0 && (
           <div className="w-80 absolute z-10 overflow-y-scroll max-h-64">
            
            <Card padding={true}>
              <div className="flex">
              <p className=" text-socialBlue text-lg">Comments</p>
            <button onClick={()=>setShowComments(false)}>
          <div className="ml-40">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-8 h-8">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
</svg>
          </div>

          </button>
              </div>
             {comments.map((c)=>(
              <Comments comment={c}/>
             ))}
            </Card>
         </div>
         )}
          <div className="flex gap-4 relative" onClick={()=>setShowComments(false)}>
            <Avatar width={"w-10"} height={"h-10"} url={loggedInUser?.avatar}/>
            <textarea placeholder="Leave out a comment" className="grow border border-gray-400 rounded-full px-4 py-2 shadow-gray-500 shadow-sm h-10 overflow-hidden" maxLength={40} value={comment} onChange={(event)=>setComment(event.target.value)}/>
            <button className="absolute right-4 top-2" onClick={postComment}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
</svg>
            </button>
          </div>
        </Card>
    )
}