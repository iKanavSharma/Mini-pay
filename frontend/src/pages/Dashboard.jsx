import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"
import { Balance } from "../components/Balance"

export const Dashboard=()=>{
    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={""}/>
            <Users/>
        </div>
    </div>
}