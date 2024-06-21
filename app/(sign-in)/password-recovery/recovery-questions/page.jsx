'use client'
import React, {useEffect, useState} from 'react';
import {useSearchParams} from "next/navigation";
import {
    Button,
    Option,
    Dialog,
    Select,
    Spinner,
    CardFooter,
    Card, CardBody
} from "@material-tailwind/react";
import {Controller, useForm} from "react-hook-form";
import axios from '../../../../axios';
import { DoneAll, Info, ReportProblem} from "@mui/icons-material";
import {useRouter} from 'next/navigation';

function RecoveryQuestions() {
    const {control, register, watch, handleSubmit} = useForm();
    const searchParams = useSearchParams()
    const contacts = searchParams.get('contacts')
    const [regions, setRegions] = useState([])
    const [districts, setDistricts] = useState([])
    const [hospitals, setHospitals] = useState([])
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({success:true, message:""})
    const router = useRouter()

    const levels = ["Ministry", "Region", "District", "Hospital"]

    useEffect(() => {
        const allRegions = () => {
            axios.get("regions").then((res) => {
                setRegions(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        const allHospitals = () => {
            axios.get("facilities").then((res) => {
                setHospitals(res.data)
            }).then(err => console.log(err))
        }
        allRegions()

        allHospitals()

    }, []);

    const changeRegion = (id) => {
        axios.get(`region_districts/${id}`).then((res) => {
            setDistricts(res.data)
        }).catch(err => console.log(err))
    }


    const recoveryQuestion = (data) => {
        setLoading(true)
        const newData = {...data, contacts:`+${contacts.trim()}`}
        axios.post('recovery_questions', newData).then((res) => {
            if (res.status === 201) {
              console.log(res.data.message)
                setResponse({...response, success:true, message:res.data.message})
                setTimeout(()=>setLoading(false),3000)
                setTimeout(()=> handleContinue(),8000)

            }else{
                setResponse({...response, success:false, message:res.data.message})
                setTimeout(()=>setLoading(false),3000)
                setTimeout(()=> handleExit(),8000)
            }
        }).catch(err=>{console.log(err); setTimeout(()=>setLoading(false),3000)
        })
    }

    const handleExit = () => {
        setResponse({...response,success:true, message:""})
        router.push('/signin')
    }
    const handleContinue = () =>{
        setResponse({...response,success:true, message:""})
        router.push(`/password-recovery/recovery-questions/change-password/?contacts=${contacts}`)
    }

    return (<main className={'flex flex-col items-center h-screen p-3 md:p-16 text-black'}>
            <div
                className={'flex flex-col gap-4 md:gap-8 lg:gap-10 mt-16 md:mt-24 border border-black rounded ring ring-black px-4 pt-3 pb-16 md:pb-24'}>
                <span className={'md:text-xl lg:text-2xl font-monte-1 text-black capitalize'}>Answer the following questions to proceed with password recovery</span>
                <form onSubmit={handleSubmit(recoveryQuestion)} className={'flex flex-col gap-6'}>

                    <div className={''}>
                        <span className={'capitalize'}>What level is your account registered in?</span>
                        <div className={'w-[90%] md:w-[80%] lg:w-[60%]'}>
                            <Controller
                                control={control}
                                rules={{required: "Answer this question to proceed"}}
                                name="account_type"
                                render={({
                                             field: {onChange, onBlur, value, ref}, fieldState: {error},
                                         }) => (<div className="font-monte-1 text-black">
                                    <Select
                                        className="text-black font-monte-1  focus:!border-t-gray-900 border-t-blue-gray-200"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                        value={value}
                                        size="lg"
                                        animate={{
                                            mount: {y: 0}, unmount: {y: 25},
                                        }}
                                    >
                                        {levels.map((level, index) => (<Option
                                            key={index}
                                            className="text-black font-monte-1 p-1"
                                            value={level}
                                        >
                                            {level}
                                        </Option>))}
                                    </Select>

                                    {error && (<p className="text-red-900 text-xs font-monte p-1">
                                        {error.message}
                                    </p>)}
                                </div>)}
                            />
                        </div>
                    </div>

                    {(watch('account_type') === "Region" || watch('account_type') === "District") &&
                        <div className={''}>
                        <span
                            className={'capitalize'}>   {watch('account_type') === "District" ? "In what region is your district in?" : "what region were you registered with?"}</span>
                            <div className={'w-[90%] md:w-[80%] lg:w-[60%]'}>
                                <Controller
                                    control={control}
                                    rules={{required: "Answer this question to proceed"}}
                                    name="region"
                                    render={({
                                                 field: {onChange, onBlur, value, ref}, fieldState: {error},
                                             }) => (<div className="font-monte-1 text-black">
                                        <Select
                                            className="text-black font-monte-1  focus:!border-t-gray-900 border-t-blue-gray-200"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                            onChange={(val) => {
                                                onChange(val);
                                                if (watch('account_type') === "District") {
                                                    changeRegion(val);
                                                }
                                            }}
                                            onBlur={onBlur}
                                            selected={value}
                                            value={value}
                                            size="lg"
                                            animate={{
                                                mount: {y: 0}, unmount: {y: 25},
                                            }}
                                        >
                                            {regions.map(({region_name, id}, index) => (<Option
                                                key={index}
                                                className="text-black font-monte-1"
                                                value={id}
                                            >
                                                {region_name}
                                            </Option>))}
                                        </Select>

                                        {error && (<p className="text-red-900 text-xs font-monte p-1">
                                            {error.message}
                                        </p>)}
                                    </div>)}
                                />
                            </div>
                        </div>}

                    {(watch('account_type') === "District") && <div className={''}>
                        <span className={'capitalize'}>
                             In what district were you registered in?</span>
                        <div className={'w-[90%] md:w-[80%] lg:w-[60%]'}>
                            <Controller
                                control={control}
                                rules={{required: "Answer this question to proceed"}}
                                name="district"
                                render={({
                                             field: {onChange, onBlur, value, ref}, fieldState: {error},
                                         }) => (<div className="font-monte-1 text-black">
                                    <Select
                                        className="text-black font-monte-1  focus:!border-t-gray-900 border-t-blue-gray-200"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                        value={value}
                                        size="lg"
                                        animate={{
                                            mount: {y: 0}, unmount: {y: 25},
                                        }}
                                    >
                                        {districts.map(({district_name, id}, index) => (<Option
                                            key={index}
                                            className="text-black font-monte-1"
                                            value={id}
                                        >
                                            {district_name}
                                        </Option>))}
                                    </Select>

                                    {error && (<p className="text-red-900 text-xs font-monte p-1">
                                        {error.message}
                                    </p>)}
                                </div>)}
                            />
                        </div>
                    </div>}

                    {(watch('account_type') === "Hospital") && <div className={''}>
                        <span className={'capitalize'}>
                             In which hospital you are working in?</span>
                        <div className={'w-[90%] md:w-[80%] lg:w-[60%]'}>
                            <Controller
                                control={control}
                                rules={{required: "Answer this question to proceed"}}
                                name="hospital"
                                render={({
                                             field: {onChange, onBlur, value, ref}, fieldState: {error},
                                         }) => (<div className="font-monte-1 text-black">
                                    <Select
                                        className="text-black font-monte-1  focus:!border-t-gray-900 border-t-blue-gray-200"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                        value={value}
                                        size="lg"
                                        animate={{
                                            mount: {y: 0}, unmount: {y: 25},
                                        }}
                                    >
                                        {hospitals.map(({facility_name, facility_reg_no}, index) => (<Option
                                            key={index}
                                            className="text-black font-monte-1"
                                            value={facility_reg_no}
                                        >
                                            {facility_name}
                                        </Option>))}
                                    </Select>

                                    {error && (<p className="text-red-900 text-xs font-monte p-1">
                                        {error.message}
                                    </p>)}
                                </div>)}
                            />
                        </div>
                    </div>}


                    <Button
                        disabled={loading}
                        type={'submit'}
                        ripple={false}
                        className={' capitalize self-start bg-transparent w-24 h-8 flex justify-center items-center text-black border border-black rounded-[0.25rem]'}>
                        {
                            loading ? <span className={'flex text-xs justify-center items-center gap-1'}> <Spinner className="h-4 w-4" color={'black'}/>  Processing </span> : "submit"
                        }

                    </Button>
                </form>
            </div>

               <Dialog  open={response.message}  size={'sm'} className={`shadow-none bg-transparent flex justify-center items-center`} >
                   <Card className="bg-white lg:w-[50%] w-[90%] h-fit flex justify-center items-center rounded-md">
                       <CardBody className={'text-black flex flex-col gap-2'}>
                           {!response.success ? <span
                               className={'text-red-900 flex justify-center items-center gap-1 text-xs bg-red-100 rounded p-1'}>
                               <ReportProblem/>
                               <span>Your attempt to change password Failed.</span>
                           </span>:
                           <span className={'text-green-900 p-2 text-xs flex gap-2 justify-center bg-green-100 rounded  items-center'}>
                               <DoneAll/>
                               <span>
                                   You can now continue to change your password.
                               </span>
                           </span>
                           }
                           <span className={'p-2 text-sm capitalize'}>
                               {response.message}.
                           </span>
                           {!response.success &&<span
                               className={'className text-xs rounded p-1 text-blue-900 flex  items-center gap-1'}>
                               <Info/>
                               <span>
                                   Try Contacting with Admin.
                               </span>
                           </span>}

                       </CardBody>
                   <CardFooter className={'w-full flex justify-end'}>
                       { response.success?
                           <Button
                               onClick={()=>{handleContinue()}}
                           className={'flex items-center justify-center w-20 capitalize h-6 bg-transparent text-black border border-black rounded-[0.25rem]'}>
                           continue
                       </Button>:
                           <Button
                               onClick={()=>{handleExit()}}
                               className={'flex items-center justify-center w-20 capitalize h-6 bg-transparent text-black border border-black rounded-[0.25rem]'}>
                               exit
                           </Button>
                       }
                   </CardFooter>
                   </Card>
               </Dialog>
        </main>

    )
}

export default RecoveryQuestions
