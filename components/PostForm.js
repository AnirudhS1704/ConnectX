import { useState } from "react"
import Avatar from "./Avatar";
import Card from "./Card";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { BeatLoader, ScaleLoader } from "react-spinners";

export default function PostForm({profile}) {
    const supabase = useSupabaseClient();
    const [content, setContent] = useState("");
    const [uploads, setUploads] = useState([]);
    const [isUploading, setIsUploading] = useState(false);


    function createPost() {
        supabase.from("posts").insert({
            author: profile.id,
            content: content,
            photos: uploads,
        }).then(response=>{
            if (!response.error) {
               setContent('');
               setUploads([]);
               window.location.reload(false);
            }
        })
    }

    function addPhoto(event) {
        const files = event.target.files;
        setIsUploading(true);
        for (const file of files) {
           const newName = Date.now() + (file.name).replaceAll(" ", "%20");
           supabase.storage.from("photos").upload(newName, file)
           .then(response =>{
            if (response?.data) {
                
                   const url = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/photos/"+response.data.path;
                console.log({url})
                setUploads(prevUploads=>[...prevUploads, url]);
            }
            else{
                console.log(response);
            }
            setIsUploading(false);
           })
        }
    }
    //https://nsgvazgczjcjnddnotiq.supabase.co/storage/v1/object/public/photos/1679378616158WhatsApp%20Image%202023-03-01%20at%208.28.14%20PM.jpeg?t=2023-03-21T06%3A04%3A06.205Z
    //"https://nsgvazgczjcjnddnotiq.supabase.co/storage/v1/object/public/photos/1679378797885WhatsApp Image 2023-03-15 at 7.25.00 PM.jpeg"
    if (profile) {
        <ScaleLoader color="#62CDFF" speedMultiplier={0.5}/>
      }

    return (
        <Card padding={true}>
            <div className="flex gap-4">
                <Avatar width={"w-20"} height={"h-20"} url={profile?.avatar}/>
                <textarea value={content} onChange={(event)=>setContent(event.target.value)} placeholder="Your message" className="grow p-2"/>
            </div>
            <div>
            {isUploading && (
                <div className="flex gap-2">
                    <p className="text-socialBlue text-lg">Uploading</p>
                    <BeatLoader color="#62CDFF" speedMultiplier={0.5}/>
                </div>
            )}
            {uploads.length > 0 && (
                <div className="grid grid-cols-2 gap-2 justify-center">
                    {uploads.map(upload =>(
                        <div className="my-2">
                            <img src={upload} className="h-32 w-48 rounded-lg"/>
                        </div>
                    ))}
                </div>
            )}
            </div>
            <div className="flex gap-6 mt-2 items-center pl-4">
                <div>
                    <button className="flex  gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
                        <h2>People</h2>
                    </button>
                </div>
                <div>
                    <label
                     className="flex  gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
<input type="file" className="hidden" multiple onChange={addPhoto}/>
                        <h2>Photos</h2>
                    </label
                    >
                </div>
                <div>
                    <button className="flex  gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
                        Check In
                    </button>
                </div>
                <div>
                    <button className="flex  gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
</svg>
                        Mood    
                    </button>
                </div>
                <div className="grow text-right">
                    <button onClick={createPost} className="bg-socialBlue text-white px-8 py-2 rounded-xl font-bold">
                        Post
                    </button>
                </div>
            </div>
        </Card>
    )
}