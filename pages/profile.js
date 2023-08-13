import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Cover from "@/components/Cover";
import Friendinfo from "@/components/FriendInfo";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import ProfileContent from "@/components/ProfileContent";
import ProfileTabs from "@/components/ProfileTabs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useId, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
    const router = useRouter();
    const userId  = router.query.Id;
    const supabase = useSupabaseClient();
    console.log(userId)
    useEffect(()=>{
      if (!userId) {
        return;
      }
      supabase.from("profiles").select().eq('id', userId)
      .then(result =>{
        if (result.error) {
          throw result.error;
        }
        if (result.data) {
          setProfile(result.data[0]);
        }
      })
    }, [userId])
    console.log(profile);

    const session = useSession();
    const currentUser = session?.user?.id;

    const isUserSame = userId === currentUser;
    const [EditMode, setEditMode] = useState(false);
    var tab;

    if(router?.query?.tab)
      tab = router?.query?.tab[0];
    else 
      tab = 'posts'

      console.log(tab);

    const [name, setName] = useState("");
    const [place, setPlace] = useState("");

    function saveProfile() {
      supabase.from("profiles").update({
        name: name,
        place: place,
      }).eq('id', session.user.id)
      .then(response =>{
        console.log(response);
        setEditMode(false);
        window.location.reload(false);
      })
    }
    
    return (
        <Layout>
            <Card padding={false}>
              <div className="relative transition-all">
                <Cover editable={isUserSame} url={profile?.cover}/>
                <div className="absolute top-32 left-10">
                        <Avatar width={"w-32"} height={"h-32"} url={profile?.avatar} editable={isUserSame}/>
                </div>
                
                <div className="pb-10 ml-44 flex justify-between items-center">
                  <div>
                    <div >
                       {!EditMode?  <h1 className="text-3xl font-bold">{profile?.name}</h1> : 
                       <div className="border-b border-gray-500 mt-4">
                        <input className="text-lg w-72 p-1"  placeholder="Your Name" value={name} onChange={(event)=>setName(event.target.value)}/>
                       </div>
                       } 
                    </div>
                    <div >
                       {!EditMode?  <h1 className="text-gray-500 leading-4">{profile?.place || "California, USA"}</h1> : 
                       <div className="border-b border-gray-500 mt-4">
                        <input className="text-base p-1 w-72"  placeholder="Your Place" value={place} onChange={(event)=>setPlace(event.target.value)}/>
                       </div>
                       } 
                    </div>
                    </div>
                    {isUserSame && !EditMode && 
                    <button onClick={()=>{setEditMode(true);
                    setName(profile?.name);
                    setPlace(profile?.place);}} className="mt-4 mr-4 flex gap-2 bg-socialBlue items-center p-1 rounded-md shadow-gray-400 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
</svg>
                      <p className="text-lg">Edit</p> 

                    </button>}
                    {isUserSame && EditMode && 
                    <div>
                        <button onClick={saveProfile} className="mt-4 mr-4 flex gap-2 bg-socialBlue items-center p-1 rounded-md shadow-gray-400 shadow-md h-10">
                        <p className="text-lg text-white px-2">Save</p> 

                      </button>
                      <button onClick={()=>setEditMode(false)} className="mt-4 mr-4 flex gap-2 bg-socialBlue items-center p-1 rounded-md shadow-gray-400 shadow-md h-10">
                        <p className="text-lg text-white px-2">Cancel</p> 

                      </button>
                    </div>}
                </div>
                <ProfileTabs active={tab} userId={currentUser}/>
              </div>
            </Card>
           <ProfileContent active={tab} userId={userId}/>
        </Layout>
    )
}