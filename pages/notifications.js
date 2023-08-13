import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function NotificationsPage() {
    return (
        <Layout>
             <Card padding={true}>
                <h1 className="text-3xl text-socialBlue text-center font-bold">Notifications</h1>
            </Card>
            <Card padding={false}>
                    
                    <div className="flex gap-4 items-center border-b-2 border-gray-200 shadow-sm shadow-gray-200 py-2 px-4">
                        <Link href={"/profile"}>
                            <Avatar width={"w-12"} height={"h-12"}/>
                        </Link>
                        <p><i className="font-bold">John clarke</i> &nbsp;liked <Link href={"/profile"} className="text-socialBlue hover:underline">&nbsp;your photo</Link>.</p>
                    </div>
                    <div className="flex gap-4 items-center border-b-2 border-gray-200 shadow-sm shadow-gray-200 py-2 px-4">
                        <Link href={"/profile"}>
                            <Avatar width={"w-12"} height={"h-12"}/>
                        </Link>
                        <p><i className="font-bold">John clarke</i> &nbsp;liked <Link href={"/profile"} className="text-socialBlue hover:underline">&nbsp;your photo</Link>.</p>
                    </div>
                    <div className="flex gap-4 items-center border-b-2 border-gray-200 shadow-sm shadow-gray-200 py-2 px-4">
                        <Link href={"/profile"}>
                            <Avatar width={"w-12"} height={"h-12"}/>
                        </Link>
                        <p><i className="font-bold">John clarke</i> &nbsp;liked <Link href={"/profile"} className="text-socialBlue hover:underline">&nbsp;your photo</Link>.</p>
                    </div>
                    <div className="flex gap-4 items-center border-b-2 border-gray-200 shadow-sm shadow-gray-200 py-2 px-4">
                        <Link href={"/profile"}>
                            <Avatar width={"w-12"} height={"h-12"}/>
                        </Link>
                        <p><i className="font-bold">John clarke</i> &nbsp;liked <Link href={"/profile"} className="text-socialBlue hover:underline">&nbsp;your photo</Link>.</p>
                    </div>
                    
                    
                </Card>
        </Layout>
    )
}