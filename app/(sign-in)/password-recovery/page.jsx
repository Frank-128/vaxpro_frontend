'use client'
import {Button, Input} from "@material-tailwind/react";
import React, {useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from '../../../axios';
import {CheckCircle, Replay} from "@mui/icons-material";
import {useRouter} from "next/navigation";

const PasswordRecovery = () => {
    const [user, setUser] = useState({
        userFound: "", code: "", userNotFound: false, success: 'initial'
    });
    const [loading, setLoading] = useState(false);
    const inputs = useRef([]);
    const length = user.code ? user.code.length : 4;
    const [values, setValues] = useState(Array(length).fill(''));
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isFocused, setIsFocused] = React.useState(false);
    const router = useRouter();
    const [contacts, setContacts] = React.useState('');
    const [sent, setSent] = useState(false);


    const submitContact = (data) => {
        setLoading(true);
        const contacts = `+255${data.contacts}`
        axios.get(`password-recovery/${contacts}`).then((response) => {
            if (response.status === 201) {
                setContacts(response.data.contacts);
                const phone = `${response.data.contacts.substring(0, 5)}******${response.data.contacts.substring(response.data.contacts.length - 2)}`;
                setUser({...user, userFound: phone, code: response.data.code})
                setLoading(false)
            } else {
                setUser({...user, userNotFound: true})
                setLoading(false)
            }
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })
    }

    const resendCode = () => {
        setSent(true)
        axios.get(`resend-code/${contacts}`).then((response) => {
            if (response.status === 201) {
                setUser({...user, code: response.data})
            } else {
                console.log(response.data.message)
            }
        }).catch(err => console.log(err))

        setTimeout(() => {
                setSent(false)
            },

            8000)
    }

    const handleChange = (value, index) => {
        if (isNaN(value) || value.length > 1) return;

        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if (value && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }

        if (newValues.every(val => val !== '') && newValues.length === user.code.length) {
            let allMatch = true;
            for (let i = 0; i < length; i++) {
                if (newValues[i] !== user.code[i]) {
                    allMatch = false;
                    break;
                }
            }
            if (allMatch) {
                setUser({...user, success: true})

                setTimeout(() => {
                    router.push(`/password-recovery/recovery-questions/?contacts=${contacts}`)
                    setUser({...user, userFound: "", code: ""})
                }, 2000)

            } else {
                setUser({...user, success: false})

            }
        } else {
            setUser({...user, success: 'initial'})

        }
    };


    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (<main className="flex justify-center items-center min-h-screen min-w-screen text-transparent/35">
        <div
            className={`${user.userFound && 'pointer-events-none'} flex w-[90%] lg:w-[27%] h-[30rem] border-2 flex-col justify-center items-start gap-4 px-8 pb-16 rounded bg-transparent`}>
            <span className={'self-center font-monte-1 text-2xl text-transparent/60'}>VaxPro</span>
            <span className="md:text-lg capitalize font-monte-1">Enter phone number your account has been registered with.</span>
            {user.userNotFound && <span
                className={'bg-red-500/20 border border-red-900 rounded p-2 text-red-900 text-xs font-monte-1'}>
                    Account registered with provided phone number does not exist.
                    </span>}

            <form
                onSubmit={handleSubmit(submitContact)}
                className="flex w-full flex-col gap-4"
            >
                <div className={'w-full flex flex-col justify-center'}>
                    <span className={'text-black text-sm'}>Phone Number</span>
                    <div className="flex font-monte-1 relative ">
                        <span
                            className={` ${isFocused ? "border-r-2 border-black" : 'border-r border-gray-500 '} absolute inset-y-0 left-0 rounded-l px-2 text-black flex items-center bg-gray-300`}
                        >
                       +255
                        </span>

                        <Input
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onFocus={() => setIsFocused(true)}
                            autoComplete="off"
                            className="text-black font-monte-1 w-[5rem] 4xs:w-[10rem] 2xs:w-full pl-16 border focus:border-2 rounded !border-t-blue-gray-200 focus:!border-t-gray-900"
                            size="lg"
                            placeholder="7XXXXXXXX"
                            {...register("contacts", {
                                onBlur: () => setIsFocused(false),
                                onChange: () => setUser({...user, userNotFound: false}),
                                required: "This field is required for verification of your account",
                                maxLength: {
                                    value: 9, message: "Phone number should be exactly 9 digits",
                                },
                                minLength: {
                                    value: 9, message: "Phone number should be exactly 9 digits",
                                },
                                pattern: {
                                    value: /^[67][123456789][0-9]+$/, message: "Please enter valid number",
                                },
                            })}
                        />
                    </div>
                    {errors.contacts && (<p className="text-red-900 text-xs font-monte py-1">
                        {errors.contacts.message}
                    </p>)}
                </div>

                <Button loading={loading} type={'submit'} ripple={false}
                        className={'bg-black rounded-[0.25rem] flex justify-center'}>
                    submit
                </Button>
            </form>
        </div>

        {user.userFound && <div
            className={'absolute top-32 shadow-xl text-transparent/50 bg-white text-xs border rounded z-90 justify-center items-center p-6 w-[85%] lg:w-3/12'}>
            {user.success === true ? <div className={'text-green-900 flex flex-col justify-center items-center gap-2'}>
                <CheckCircle fontSize={'large'}/>
                <span>Verified Successfully</span>
            </div> : <div className={'w-full h-full flex flex-col gap-3 '}>
                        <span>Verification code has been sent to this number <span
                            className={'text-black font-monte-1'}>{user.userFound}</span>  </span>

                <div className={'flex gap-2 items-center justify-center'}>
                    {Array(user.code.length).fill().map((_, index) => (<input
                        key={index}
                        ref={(e) => inputs.current[index] = e}
                        type="text"
                        inputMode={"numeric"}
                        maxLength="1"
                        // value={value}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`${!user.success && `focus:ring-red-800 border-red-900 focus:outline-red-800`} w-12 h-12 text-center text-black font-monte-1 text-lg border border-gray-300 rounded-md focus:outline-black focus:ring-2 focus:ring-black`}
                    />))}

                </div>
                {!user.success && <div
                    className={'text-red-900 border border-red-900 text-xs p-2 flex flex-col justify-center items-center rounded w-full bg-red-500/50'}>
                    <p>Verification Failed</p>
                    <p>Incorrect Code Provided</p>
                </div>}
                <div className={'flex flex-col w-full'}>
                    <span className={'text-[0.7rem] px-1'}>{"Didn't get the code?"}</span>
                    <span
                        onClick={() => {
                            resendCode()
                        }}
                        className={`${sent && 'pointer-events-none'} w-32 text-black self-start bg-transparent/5 gap-1 hover:bg-transparent/10 rounded cursor-pointer p-1 flex justify-center items-center`}>
                       {!sent ? (<span>
                           Resend code <span className="text-xs"><Replay style={{ fontSize: '15px' }}/></span>
                               </span>) : 'Code Sent'}
                     </span>
                </div>

                <div className={'flex gap-2 justify-end w-full'}>
                    <Button
                        onClick={() => setUser({...user, userFound: "", code: ""})}
                        className={'self-end bg-transparent shadow-none border border-black/70 lowercase  focus:shadow-none text-black/70 h-6 w-16 flex justify-center items-center text-xs'}>
                        cancel</Button>
                </div>


            </div>}

        </div>}
    </main>)
}

export default PasswordRecovery
