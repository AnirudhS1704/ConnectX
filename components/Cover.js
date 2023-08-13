import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function Cover({url, editable}) {
    const supabase = useSupabaseClient();
    const [isUploading, setIsUploading] = useState(false);
    const session = useSession();
    const loggedInUser = session?.user?.id;

    function updateCover(event) {
        setIsUploading(true);
        const file = event.target?.files[0];
        console.log(file)
        if (file) {
            const newName = Date.now() + file.name;
            supabase.storage.from("covers").upload(newName, file)
            .then(response =>{
               if (response.error) {
                throw response.error;
               }
               else{
                const url = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/covers/"+response.data.path;
                supabase.from("profiles").update({cover: url}).eq('id', loggedInUser)
                .then(response =>{
                    if (response.error) {
                        throw response.error;
                    }
                    else{
                        console.log(response);
                    }
                })
               }
               setIsUploading(false);
               window.location.reload(false);
            })
        }

    }
    return (
        <div className="h-48 overflow-hidden justify-center items-center  rounded-t-lg relative">
            {isUploading && (
                <BeatLoader color="#62CDFF" speedMultiplier={0.5} className="absolute top-16 right-64" size={30}/>
            )}
            <div>
                <img src={url}/>
            </div>
            {editable && (
                <label className="absolute right-2 bottom-2 cursor-pointer">
                    <div className="bg-white p-1 bg-opacity-60">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                    </div>
              <input type="file" className="hidden" onChange={updateCover}/>
                </label>
              
            )}
        </div> 
    )
}