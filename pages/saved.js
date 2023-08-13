import Card from "@/components/Card";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function SavedPostsPage() {
    const session = useSession();
    const id = session?.user?.id;
    
    const supabase = useSupabaseClient();
    const [savedPosts, setSavedPosts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(()=>{
        getSavedPosts();
        getloggedInUser();
    },[session]);

    function getSavedPosts() {
        console.log({id});
        if (session?.user?.id) {
            supabase.from('saved').select('posts(id, content, created_at, photos, profiles(id, avatar, name))').eq('user_id', id)
        .then((response) =>{
            console.log({response});
            setSavedPosts(response.data);
        });
        }
        else{
            return;
        }
    }

    function getloggedInUser() {
        supabase.from("profiles").select().eq('id', id)
        .then((result=>{
            if (result?.data?.length) {
                setLoggedInUser(result.data[0]);
            }
        }));
    }
    return (
        <Layout>
            <Card padding={true}>
                <h1 className="text-3xl text-socialBlue text-center">Saved posts</h1>
            </Card>
            {savedPosts?.map(post =>(
                <PostCard post={post.posts} loggedInUser={loggedInUser}/>
            ))}
            
        </Layout>
    )
}