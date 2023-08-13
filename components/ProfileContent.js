import { useEffect, useState } from "react"
import Card from "./Card"
import PostCard from "./PostCard"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ProfileContent({active, userId}) {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const session = useSession();
    const supabase = useSupabaseClient();

    useEffect(()=>{
        console.log(active);
        if (!userId) {
            return;
        }
    if (active === 'posts') {
        getPosts();
        getUser();
    }
}, [userId]);

    async function getPosts() {
        await supabase.from("posts").select('id, content, created_at, photos, profiles(id, avatar, name)')
        .eq('author', userId)
        .order('created_at', {ascending: false})
    .then(response=>{
      console.log(response);
      setPosts(response.data);
    });
    }

    async function getUser() {
        await supabase.from('profiles')
        .select()
        .eq('id', session?.user?.id)
        .then((response)=>{
            setUser(response.data[0]);
            
        })
    }
    return (
        <>
                {active === 'posts' && (
        
                    <div>
                       {posts?.length > 0 && (
                           posts?.map(post =>(
                            <PostCard key={post?.created_at} post={post} loggedInUser={user}/>
                           ))
                       )}
                    </div>
            
                )}
           {active === 'about' && (
            <Card padding={true}>
            <div>
                    <h1 className="text-3xl font-bold mb-2">About</h1>
                    <p className="text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
            </Card>
           )}
            {active === 'friends' && (
                <Card padding={true}>
                    <div>
                    <h1 className="text-3xl font-bold mb-2">Friends</h1>
                  <div className=" border-b-2 border-gray-200 p-4 -mx-4 shadow-sm shadow-gray-200">
                    <Friendinfo />
                  </div>
                  <div className=" border-b-2 border-gray-200 p-4 -mx-4 shadow-sm shadow-gray-200">
                    <Friendinfo />
                  </div>
                  <div className=" border-b-2 border-gray-200 p-4 -mx-4 shadow-sm shadow-gray-200">
                    <Friendinfo />
                  </div>
                  <div className=" border-b-2 border-gray-200 p-4 -mx-4 shadow-sm shadow-gray-200">
                    <Friendinfo />
                  </div>
                  <div className=" border-b-2 border-gray-200 p-4 -mx-4 shadow-sm shadow-gray-200">
                    <Friendinfo />
                  </div>
                  <div className=" border-b-2 border-gray-200 p-4 -mx-4 shadow-sm shadow-gray-200">
                    <Friendinfo />
                  </div>
                    </div>
                </Card>
            )}
            {active === 'photos' && (
                <div>
                    <Card >
                    <h1 className="text-3xl font-bold mb-2 px-4 py-4">Photos</h1>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1">
                        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="lg:max-h-48 lg:w-72 sm:mb-2  rounded-xl"/>
                        <img src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="lg:max-h-48 lg:w-72 sm:mb-2  rounded-xl"/>
                        <img src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" className="lg:max-h-48 lg:w-72 sm:mb-2  rounded-xl"/>
                        <img src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" className="lg:max-h-48 lg:w-72  sm:mb-2 rounded-xl"/>
                        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" className="lg:max-h-48 lg:w-72  sm:mb-2 rounded-xl"/>
                        <img src="https://images.unsplash.com/photo-1612021148925-466704654aeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW9udW1lbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="lg:max-h-48 lg:w-72 sm:mb-2 rounded-xl"/>
                    </div>
                    </Card>
                    </div>
            )}
        </>
    )
}