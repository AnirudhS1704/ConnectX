import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import LoginPage from "./login";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  
  const supabase = useSupabaseClient();
  const session = useSession();
  useEffect(()=>{
    console.log({id: session?.user?.id});
    if (session) {
      supabase.from("posts").select('id, content, created_at, photos, profiles(id, avatar, name)').order('created_at', {ascending: false})
    .then(response=>{
      console.log(response);
      setPosts(response.data);
    });
    supabase.from("profiles").select().eq('id', session.user.id)
        .then((result=>{
            if (result?.data?.length) {
                setProfile(result.data[0]);
            }
        }));
    }
  }, [session?.user?.id])
  console.log({profile});
  if (!session) {
    return <LoginPage />
  }

  return (
    <Layout profile={profile}>
       <PostForm profile={profile}/>
       {posts?.map(post=>(
        <PostCard key={post.created_at} post={post} loggedInUser={profile}/>
       ))}
    </Layout>
  )
}
