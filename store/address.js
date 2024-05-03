import {create} from "zustand"

const globalAddress = create((set,get)=>({
    regions :[],
    districts:[],
    setRegions: (state)=> set(()=>({regions:state})),
    setDistricts:(state)=>set(()=>({districts:state}))
}))

export default globalAddress