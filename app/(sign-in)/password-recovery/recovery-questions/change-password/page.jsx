'use client'
import React, {useState} from "react";
import {Button, Card, CardBody, CardFooter, Dialog, Input, Spinner} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {CheckCircle, Close, DoneAll, Info, ReportProblem} from "@mui/icons-material";
import {useRouter, useSearchParams} from "next/navigation";
import axios from '../../../../../axios';

function ChangePassword() {
    const {register,reset, watch, handleSubmit, formState: {errors}} = useForm()
    const [passwordValidations, setPasswordValidations] = React.useState({
        minLength: 'initial', capitalLetter: 'initial', specialChar: 'initial', number: 'initial',
    });
    const searchParams = useSearchParams()
    const contacts = searchParams.get('contacts')
    const [validationErrors, setValidationErrors] = React.useState(false)
    const [loading, setLoading]=React.useState(false)
    const [response, setResponse] = useState({success:true, message:""})
   const router = useRouter()

    const validatePassword = (password) => {
        const validations = {
            minLength: password.length >= 8,
            capitalLetter: /[A-Z]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>_-]/.test(password),
            number: /[0-9]/.test(password),
        };
        setPasswordValidations(validations);
    };

    const onPasswordChange = (e) => {
        validatePassword(e.target.value);
        setValidationErrors(false)
    };

    const savePassword = (data) => {
        setLoading(true)

        if (passwordValidations.number &&
            passwordValidations.specialChar &&
            passwordValidations.minLength &&
            passwordValidations.capitalLetter &&
            confirmPassword === password) {

           let {confirmPassword, ...newData} = data;
           newData = {...newData, contacts:`+${contacts.trim()}`}
            console.log(newData)
         axios.put('password_update', newData).then(res=>{
             if(res.data.status === 201){

                 setTimeout(()=>setLoading(false) ,3000)
                 setTimeout(()=> {
                     handleContinue();
                     setResponse({...response, success: true, message: res.data.message})
                     reset()
                 },6000)

             }
             else{
                 setResponse({...response, success: false, message: res.data.message})
                 reset()
                 setTimeout(()=>setLoading(false),3000)

             }
         }).catch(err=>setLoading(false))

        }else{
            setValidationErrors(true)
            setLoading(false)
        }
    }

    const handleContinue =  () =>{
        router.push('/signin')
        setResponse({...response, message: '', success: true})
    }

    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');

    return (<main className={'flex flex-col p-6 md:p-10 lg:p-16'}>
        <form onSubmit={handleSubmit(savePassword)} className={'flex flex-col gap-6 lg:w-[70%] w-full'}>
            { validationErrors &&
                <div className={'flex justify-center items-center w-[90%] md:w-[65%] h-20 text-sm text-red-900 bg-red-200 border border-red-900 rounded p-1'}>
                     Remove all errors before proceeding.
                </div>
            }
            <div className={'w-[90%] md:w-[65%] flex flex-col gap-1'}>
                <span>Enter your new password</span>
                <Input
                    {...register('password', {
                        required: {
                            value: true, message: "Password is required"
                        }, onChange: onPasswordChange
                    })}
                    className={'border-t-gray-400 focus:border-t-black'}
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                />
                {errors.password && <span className={'text-red-900 text-xs p-1'}>{errors.password.message}</span>}
                <div className="text-xs px-4 py-3 gap-2 flex flex-col">
                    <span
                        className={`${passwordValidations.minLength === true && 'text-green-900'}
                        ${passwordValidations.minLength === false && 'text-red-900'}
                       ${passwordValidations.minLength === 'initial' && 'text-black'}
                       'flex gap-2 justify-center items-center'
                        `}
                    >
                        {passwordValidations.minLength === true && < DoneAll style={{fontSize: '18px'}}/>}
                        {passwordValidations.minLength === false && <Close style={{fontSize: '18px'}}/>}
                        <span> Password should be at least 8 characters long</span>
                    </span>
                    <span
                        className={`${passwordValidations.capitalLetter === true && 'text-green-900'}
                        ${passwordValidations.capitalLetter === false && 'text-red-900'}
                       ${passwordValidations.capitalLetter === 'initial' && 'text-black'}
                       'flex gap-2 justify-center items-center'
                        `}
                    >
                        {passwordValidations.capitalLetter === true && < DoneAll style={{fontSize: '18px'}}/>}
                        {passwordValidations.capitalLetter === false && <Close style={{fontSize: '18px'}}/>}
                        <span>Password should have at least one capital letter</span>
                    </span>
                    <span
                        className={`${passwordValidations.specialChar === true && 'text-green-900'}
                        ${passwordValidations.specialChar === false && 'text-red-900'}
                       ${passwordValidations.specialChar === 'initial' && 'text-black'}
                       'flex gap-2 justify-center items-center'
                        `}
                    >
                        {passwordValidations.specialChar === true && < DoneAll style={{fontSize: '18px'}}/>}
                        {passwordValidations.specialChar === false && <Close style={{fontSize: '18px'}}/>}
                        <span>Password should have at least one special character</span>
                    </span>
                    <span
                        className={`${passwordValidations.number === true && 'text-green-900'}
                        ${passwordValidations.number === false && 'text-red-900'}
                       ${passwordValidations.number === 'initial' && 'text-black'}
                       'flex gap-2 justify-center items-center'
                        `}
                    >
                        {passwordValidations.number === true && < DoneAll style={{fontSize: '18px'}}/>}
                        {passwordValidations.number === false && <Close style={{fontSize: '18px'}}/>}
                        <span>Password should have at least one number</span>
                    </span>
                </div>

            </div>

            <div className={'w-[90%] md:w-[65%] flex flex-col gap-1'}>
                <span>Confirm your new password</span>
                <Input
                    {...register('confirmPassword', {
                        required: {
                            value: true, message: "Password is required"
                        },
                        onChange:()=>setValidationErrors(false)

                        // validate: value => value === password || "Passwords do not match"
                    })}

                    className={'border-t-gray-400 focus:border-t-black'}

                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                />
                {errors.confirmPassword &&
                    <span className={'text-red-900 text-xs p-1'}>{errors.confirmPassword.message}</span>}

                <span
                    className={`${confirmPassword === password && confirmPassword !== '' && 'text-green-900'} ${confirmPassword !== password && confirmPassword !== '' && 'text-red-900'} text-xs py-3 px-4
                     flex items-center`}>
                    {confirmPassword === password && confirmPassword !== '' && <DoneAll style={{fontSize: '18px'}}/>}
                    {confirmPassword !== password && confirmPassword !== '' && <Close style={{fontSize: '18px'}}/>}
                    Confirm password should match your password</span>
            </div>
            <div className={'w-[90%] md:w-[65%] flex flex-col gap-1 items-end'}>
                <Button
                    disabled={loading}
                    type={'submit'}
                    ripple={false}
                    className={'capitalize w-24 h-8 flex justify-center items-center border border-black rounded-[0.25rem]'}>
                    {
                        loading ? <span className={'flex text-xs justify-center items-center gap-1'}> <Spinner className="h-4 w-4" color={'black'}/>  saving </span> : "save"
                    }

                </Button>
            </div>

        </form>

        <Dialog  open={response.message}  size={'sm'} className={`shadow-none bg-transparent flex justify-center items-center`} >
            <Card className="bg-white lg:w-[50%] w-[90%] h-fit flex justify-center items-center rounded-md">
                <CardBody className={'text-black flex flex-col gap-2'}>
                    {
                        response.success && <span className={'text-green-900 self-center '}>
                        <CheckCircle style={{fontSize:"50px"}}/>

                        </span>
                    }
                    {
                        !response.success && <span className={'text-red-900 self-center '}>
                        <Close style={{fontSize:"50px"}}/>

                        </span>
                    }
                    <span className={'p-2 text-sm capitalize'}>
                               {response.message}.
                           </span>
                    {!response.success &&<span
                        className={'className text-xs rounded p-1 text-blue-900 flex  items-center gap-1'}>
                               <Info/>
                               <span>
                                   Try updating again.
                               </span>
                           </span>}

                </CardBody>
                <CardFooter className={'w-full flex justify-end'}>
                    { response.success?
                        <Button
                            onClick={()=>{handleContinue()}}
                            className={'flex items-center justify-center w-28 capitalize h-8 bg-transparent text-black border border-black rounded-[0.25rem]'}>
                            log in
                        </Button>:
                        <Button
                            onClick={()=>{setResponse({...response, message: '', success: true})}}
                            className={'flex items-center justify-center w-28 capitalize h-8 bg-transparent text-black border border-black rounded-[0.25rem]'}>
                            try again
                        </Button>
                    }
                </CardFooter>
            </Card>
        </Dialog>
    </main>)
}

export default ChangePassword
