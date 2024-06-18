
"use client"
import globalUser from "@/store/user";

const Profile = () =>{
    const loggedInUser = globalUser((state)=>state.loggedInUser)
    return(
        <main>
            {loggedInUser.uid}
        </main>
    )
}

export default Profile
