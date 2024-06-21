import {Button, Select,Option} from "@material-tailwind/react";
import {FilterAltOutlined} from "@mui/icons-material";
import globalAddress from "@/store/address";
import globalVaccines from "@/store/vaccines";
import {useEffect, useState} from "react";
import globalUser from "@/store/user";
import axios from "@/axios";

const Filter = () => {
    const [filterValues,setFilterValues] = useState({
        region:null,
        district:null,
        year:null,
        vaccine:null,
        gender:null,

    });
    const regions = globalAddress((state) => state.regions);
    const vaccines = globalVaccines(state=>state.vaccines);
    const [districts,setDistricts] = useState([]);
    const authenticatedToken = globalUser(state=>state.authenticatedToken);



    const filter_array = [
        {
            option_type: "region",
            options:regions
        },
        {
            option_type: "district",
            options:districts
        },
        {
            option_type: "gender",
            options:["Male", "Female"]
        },
        {
            option_type: "year",
            options:[2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
        },
        {
            option_type: "vaccine",
            options:vaccines
        }
    ]

    const handleSelect = (option_type,e)=>{
        console.log(e.target.value);
        console.log(option_type);
        switch(option_type){
            case "region":
                if (e.target.value === "all"){
                    setDistricts(null)
                    return
                }
                axios
                    .get(`region_districts/${e.target.value}`, {
                        headers: {
                            Authorization: `Bearer ${authenticatedToken}`,
                        },
                    })
                    .then((res) => {
                        console.log("we got answer from backed");
                        setDistricts(res.data);
                    })
                setFilterValues({...filterValues,region:e.target.value});
                break;
            case "district":
                setFilterValues({...filterValues,district:e.target.value});
                break;
            case "gender":
                setFilterValues({...filterValues,gender:e.target.value});
                break;
            case "age":
                setFilterValues({...filterValues,age:e.target.value});
                break;
            case "year":
                setFilterValues({...filterValues,year:e.target.value});
                break;
            default:
                break;
        }
    }

console.log(regions)
    return (

        <div className={'flex justify-around md:justify-end gap-2 overflow-x-scroll pb-6'}>

            {filter_array.map(({options, option_type}, index) => (
                <select key={index} onChange={(e)=>handleSelect(option_type,e)} className="w-28 text-xs h-8 p-2 border border-black rounded bg-white text-gray-700">
                    {
                        option_type === "region" ?

                            (
                                <>
                                    <option value="all" className="">All regions</option>
                                    {options?.map(({ region_name, id }, index) => (
                                        <option value={id} key={index} className="">
                                            {region_name}
                                        </option>
                                    ))}
                                </>
                            ) : option_type === "district" ? (
                                    <>
                                        <option value={null} className="">All districts</option>
                                        {filterValues.region !== null ? options?.map(({district_name, id}, index) => (
                                                <option value={id} key={index}
                                                        className={''}>{district_name}</option>)) :
                                            <option disabled>Select region first</option>}
                                    </>
                                )
                                : option_type === "gender" ?(
                                    <>
                                        <option option={null}>Gender</option>
                                        {options?.map((i, index) => (

                                            <option value={i} key={index}
                                                    className={''}>{i}
                                            </option>))}

                                    </>
                                    )
                                : option_type === "vaccine" ?
                                        (
                                            <>
                                                <option value={null}>Vaccine</option>
                                                {options?.map((vaccine, index) => (
                                                    <option value={vaccine.id} key={index}
                                                            className={''}>{vaccine.name}</option>))}
                                            </>
                                        )
                                    :(
                                        <>
                                            <option value={null}>Year</option>
                                            {options?.map((year, index) => (
                                                <option value={year} key={index}
                                                        className={''}>{year}</option>

                                            ))}
                                        </>
                                        )
                    }
                </select>))}
            <Button

                className={'bg-transparent w-28 h-8 p-2 text-xs border border-black text-black rounded-[0.25rem] flex justify-center items-center gap-2'}>

                <span> Reset all</span>
            </Button>
        </div>

    )
}


export default Filter;
