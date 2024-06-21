"use client"
import {Button} from '@material-tailwind/react'
import {Close} from "@mui/icons-material";
function PasswordEditAlert (){
    return(
        <div
            className={" p-3 h-16 w-screen bg-black/20 shadow-2xl flex items-center justify-center rounded-lg  text-black font-monte-1"}>
            <div className={'flex gap-3 lg:gap-0 justify-around items-center w-full'}>
                <div className={'capitalize text-xs md:text-md lg:text-xl'}>
                    Change your password to the one you can easily remember
                    <span className={'text-blue-900 text-sm px-1'}>(recommended)</span>
                </div>
                <Button ripple={false} className={'rounded-[0.25rem]'}>
                    change
                </Button>
                <Close className={'hover:bg-transparent/20 hover:p-2 hover:rounded cursor-pointer'} fontSize={"large"}/>
            </div>

        </div>
    )
}

export default PasswordEditAlert
