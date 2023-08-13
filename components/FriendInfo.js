import Avatar from "./Avatar";

export default function Friendinfo() {
    return (
        <div className="flex gap-4">
                        <div>
                            <Avatar width={"w-12"} height={"h-12"}/>
                        </div>
                        <div className="leading-4">
                            <h2 className="text-lg font-bold">Jack Smith</h2>
                            <p className="text-md">5 mutual friends</p>
                        </div>
                    </div>
    )
}