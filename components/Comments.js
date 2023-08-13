import ReactTimeAgo from "react-time-ago";
import Avatar from "./Avatar";
import Link from "next/link";

export default function Comments({comment}) {
    return (
        <>
           <div className="my-2">
            <div className="flex gap-2">
                <div className="min-w-12">
                <Link href={{
                pathname: `/profile/${comment?.profiles?.id}`,
                query: { name: 'test' },
            }}>
                <Avatar width={"w-12"} height={"h-12"} url={comment?.profiles?.avatar}/>
                </Link>
                </div>
                <div className="w-24 grow items-center bg-gray-300 p-2 rounded-2xl" onClick={()=>setOpen(false)}>
                <Link href={"/profile/"+comment?.profiles?.id}>
                <span className="font-semibold hover:text-socialBlue hover:underline hover:cursor-pointer">{comment?.profiles?.name}</span>
                </Link>
                <p className="text-gray-500 text-xs font-bold leading-4 -mt-1"><ReactTimeAgo date={comment?.created_at} locale="en-US"/></p>
                <p className="mt-2">{comment.comment}</p>
                </div>
            </div>
           </div>
           
        </>
    )
}