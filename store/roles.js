import { create } from "zustand";


const globalRoles = create((set, get)=> ({
    roles:[],
    setRoles :(state) => set(()=>({roles:state}))
  }))
  export default globalRoles