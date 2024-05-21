import {create} from 'zustand'

const globalAlert = create((set)=>({
    alert: {
        visible:false,
        message:"",
        type:""
        },
    setAlert : (value)=>{
        
        set(()=>({
                alert:value      
    }))
    setTimeout(()=>{
        set(()=>({ alert: {
            visible:false,
            message:"",
            type:""
            }}))
    },3000)
}


})) 


export default globalAlert