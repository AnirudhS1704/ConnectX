import NavigationCard from "../components/NavigationCard";

export default function Layout({children, profile}) {
  console.log({profileId: profile?.id})
  return (
    <div className="md:flex max-w-6xl mx-auto gap-4 mt-4" >
      <div className="lg:w-1/3 md:justify-center sm:w-3/5 md:w-3/5">
        <NavigationCard profile={profile}/>
      </div>
      <div className="grow max-w-xl mt-1 md:w-3/4 ml-4 md:mr-4">
      {children}
      </div>
    </div>
  )
}
