'use client'
import {Input, Button} from "@material-tailwind/react";
import React from "react";
import {useForm} from "react-hook-form";

const PasswordRecovery = () => {
    const submitContanct = (data) =>{

    }
    const {register, handleSubmit,formState: {errors}} = useForm();
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <main className="flex justify-center items-center min-h-screen min-w-screen text-transparent/35">
            <div
                className="flex w-[90%] lg:w-[27%] h-[30rem] border-2 flex-col justify-center items-start gap-4 px-8 pb-16 rounded bg-transparent">
                <span className={'self-center font-monte-1 text-2xl text-transparent/60'}>VaxPro</span>
                <span className="md:text-lg capitalize font-monte-1">Enter phone number your account has been registered with.</span>
                <form
                    onSubmit={handleSubmit(submitContanct)}
                    className="flex w-full flex-col gap-4"
                    >
                    <div className={'w-full flex flex-col justify-center'}>
                        <span className={'text-black text-sm'}>Phone Number</span>
                        <div className="flex font-monte-1 relative ">
                        <span
                            className={
                                ` ${isFocused ? "border-r-2 border-black" : 'border-r border-gray-500 '} absolute inset-y-0 left-0 rounded-l px-2 text-black flex items-center bg-gray-300`
                            }
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
                                placeholder="7xxxxxxxx"
                                {...register("contacts", {
                                    onBlur: () => setIsFocused(false),
                                    required: "This field is required for verification of your account",
                                    maxLength: {
                                        value: 9,
                                        message: "Phone number should be exactly 9 digits",
                                    },
                                    minLength: {
                                        value: 9,
                                        message: "Phone number should be exactly 9 digits",
                                    },
                                    pattern: {
                                        value: /^[67][12345789][0-9]+$/,
                                        message: "Please enter valid number",
                                    },
                                })}
                            />
                        </div>
                        {errors.contacts && (
                            <p className="text-red-900 text-xs font-monte py-1">
                                {errors.contacts.message}
                            </p>
                        )}
                    </div>

                    <Button type={'submit'} ripple={false} className={'bg-black rounded-[0.25rem]'}>
                        submit
                    </Button>
                </form>
            </div>
        </main>
    )
}

export default PasswordRecovery
