'use client'
import {
    Input,
    Select,
    Option,
    Button,
    Card,
    Typography,
    CardHeader,
    Tooltip,
    IconButton,
    Dialog, DialogBody, DialogFooter, DialogHeader
} from "@material-tailwind/react";
import globalRoles from "@/store/roles";
import {Close, Delete, Edit, Warning} from "@mui/icons-material";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import axios from "../../../axios";
import {useInitial} from "@/constants/functions";
import globalAlert from "@/store/alert";
import globalUser from "@/store/user";
import clsx from "clsx";

const Roles = () => {
    const roles = globalRoles((state)=>state.roles)
    const TABLE_HEAD = ["No", "Role", "Account Level", "Actions"];
    const [selectedRow, setSelectedRow] =  useState({id:"", action:"", role:"", level:""})
    const  {getRoles} = useInitial();
    const setAlert = globalAlert((state)=>state.setAlert);
    const [loading, setLoading] = useState(false);
    const loggedInUser = globalUser((state) => state.loggedInUser);
    const {control,
        setError,
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,

        formState:{errors}} = useForm()
    const levels = [
        "Ministry", "Regional", "District"
    ]



    const roleSubmit = (data) =>{
        setLoading(true);
        if(data.account_type === "Ministry"){
            data.account_type = "ministry"
        } else if (data.account_type === "Regional"){
            data.account_type = "regional"
        }else if(data.account_type === "District"){
            data.account_type = "district"
        }
        axios.post('new_role', data).then(res=>{
            if (res.status === 201){
                getRoles()
                setAlert({visible:true, type:"success", message:res.data})
                setLoading(false);
                reset()
            } else if(res.data.status === 409){
                setLoading(false);
                setError("role", {message:res.data.message})
                console.log(res)

            }else{
                console.log(res);
                setLoading(false);

            }
        })
        setLoading(false);
    }

    const roleHandler = (id, action)=>{
        if(action === "delete"){
            axios.delete(`delete_role/${id}`).then(res=>{
                if(res.status === 200){
                    setSelectedRow({id:"", level: "", role: "", action: ""})

                    setAlert({
                        visible:true,
                        type:"success",
                        message:res.data
                    })

                    getRoles()
                }else{
                    setAlert({
                        visible:true,
                        type:"error",
                        message:res.data
                    })
                }
            })
        }else if(action === "edit"){

        }
    }

    return <main className={'flex flex-col'}>
    <div className={'py-4 px-2 md:py-8 flex flex-col gap-6 md:gap-8 border-b border-black'}>
        <div className={'font-monte-1 text-xl md:text-3xl '}>Create New Role</div>
        <form onSubmit={handleSubmit(roleSubmit)} className={'flex flex-col gap-8 md:gap-12'}>
            <div className={'border-b w-full border-gray-400 px-3 pb-8'}>
                <div className={'md:w-3/6'}>
                    <span>Select Level For The Role:</span>
                    <Controller
                        control={control}
                        rules={{ required:"Select level at which the role is going to be used" }}
                        name="account_type"
                        render={({
                                     field: { onChange, onBlur, value, ref },
                                     fieldState: { error },
                                 }) => (
                            <div className="font-monte-1 text-black">
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
                                        mount: { y: 0 },
                                        unmount: { y: 25 },
                                    }}
                                >
                                    {levels.map((level,index) => (
                                        <Option
                                            key={index}
                                            className="text-black font-monte-1"
                                            value={level}
                                        >
                                            {level}
                                        </Option>
                                    ))}
                                </Select>

                                {error && (
                                    <p className="text-red-900 text-xs font-monte">
                                        {error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className={'border-b w-full border-gray-400 px-3 pb-8'}>
                <div className={'md:w-3/6'}>
                    <span>Enter Name For The Role:</span>
                    <Input
                        {...register("role",{required:"Role name is required"})}
                        labelProps={{
                        className: "before:content-none after:content-none",
                    }} className={'md:w-full !border-t-blue-gray-200 focus:!border-t-gray-900'}/>

                    {errors.role && (
                        <p className="text-red-900 text-xs font-monte">
                            {errors.role.message}
                        </p>
                    )}
                </div>
            </div>
            <div className={'md:bg-black/10 w-full rounded py-5 px-3'}>
                <div className={'md:w-3/6 flex md:justify-start gap-6'}>
                    <Button loading={loading} type={'submit'} className={'rounded-[0.25rem] text-center w-full md:w-24 bg-blue-900'}>
                        { loading?'saving': 'save'}
                    </Button>
                    <Button className={'rounded-[0.25rem] text-center w-full md:w-24 bg-red-900'}>
                        cancel
                    </Button>
                </div>
            </div>
        </form>
    </div>
<div className={'flex justify-center items-center w-full md:py-6 py-4'}>
    <Card className="h-full w-full lg:w-10/12 overflow-scroll border-t">
        <CardHeader floated={false} shadow={false} className={'font-monte-1 text-2xl p-4'}>Table For Roles</CardHeader>
        <table className="w-full min-w-max table-auto text-left">
            <thead>
            <tr>
                {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-200 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-monte-1 leading-none opacity-70"
                        >
                            {head}
                        </Typography>
                    </th>
                ))}
            </tr>
            </thead>
            <tbody >
            {roles.map(({ role,id,  account_type }, index) => {
                const isLast = index === roles.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (

                        <tr key={index}>
                        <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {index+1}
                            </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                {role}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                {account_type}
                            </Typography>
                        </td>

                        <td className={`${classes} flex justify-around bg-blue-gray-50/50`}>
                            <Tooltip content="Edit Role">
                                <IconButton
                                    variant="text"
                                    onClick={() => {
                                        setSelectedRow({
                                            id: id,
                                            action: "edit",
                                        });
                                        setValue(
                                            "role",
                                            role
                                        );
                                        setValue(
                                            "account_type",
                                            account_type
                                        );
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>

                            {(loggedInUser.role.account_type !== account_type) || (loggedInUser.role.role !== role) ? (
                                <Tooltip content="Delete Role">
                                    <IconButton
                                        variant="text"
                                        onClick={() =>
                                            setSelectedRow({ id: id, action: "delete",role:role, level:account_type })
                                        }
                                    >
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <div className="w-10"></div>
                            )
                            }
                        </td>
                        </tr>
                );
            })}

            </tbody>
        </table>
    </Card>
</div>

<Dialog
    className="flex flex-col items-center"
    size="xs"
    open={selectedRow.action === "delete"}
    handler={() => setSelectedRow({ id: "", action: "", role: "",level: "" })}
>
<DialogBody className=" text-xs text-red-900">
    <div className={'flex items-center'}> <Warning/> Warning</div>
    <Typography className={'bg-red-500/10 text-xs rounded p-2'}>
        You have selected to delete <span className={'text-blue-900 font-bold capitalize px-1'}>{selectedRow.role}</span> role which is at
        <span className={'text-blue-900 font-bold capitalize px-1'}>{selectedRow.level}</span>level. This action is extremely dangerous for it will lead to completely removal of all accounts associated with this role.
       <p className={'text-red-900 text-xs font-bold bg-red-500/50 p-1 w-5/12 rounded'}>This action can not be undone.</p>
    </Typography>


    <Typography className={'text-lg text-black py-3'}>Confirm to proceed with this action.</Typography>
</DialogBody>
    <DialogFooter className={'flex gap-6 justify-end w-full'}>
        <Button onClick={()=>roleHandler(selectedRow.id, selectedRow.action)} loading={loading}
                className={'rounded-[0.25rem] text-center w-full md:w-24 bg-green-900'}>
            { loading?'deleting': 'Confirm'}
        </Button>
        <Button onClick={()=>{
            setSelectedRow({id:"", level: "", role: "", action: ""})
        }} className={'rounded-[0.25rem] text-center w-full md:w-24 bg-red-900'}>
            cancel
        </Button>
    </DialogFooter>
</Dialog>

        <Dialog  className="flex flex-col items-center"
                 size="xs"
                 open={selectedRow.action === "edit"}
                 handler={() => setSelectedRow({ id: "", action: "", role: "",level: "" })}>
            <DialogHeader> Edit Role</DialogHeader>
            <DialogBody className={'w-full'}>
                <form onSubmit={handleSubmit(roleHandler)} className={'flex w-full flex-col gap-8 md:gap-2'}>
                        <div className={'md:w-5/6'}>
                            <span className={'text-black'}>Select Level For The Role:</span>
                            <Controller
                                control={control}
                                rules={{required:"Select level at which the role is going to be used"}}
                                name="account_type"
                                render={({
                                             field: {onChange, onBlur, value, ref},
                                             fieldState: {error},
                                         }) => (
                                    <div className="font-monte-1 text-black">
                                        <Select
                                            defaultValue={getValues("account_type")}
                                            className="text-black font-monte-1 !border-t-blue-gray-200 focus:!border-gray-900 "
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            selected={value}
                                            value={value}
                                            size="lg"
                                            animate={{
                                                mount: {y: 0},
                                                unmount: {y: 25},
                                            }}
                                        >
                                            {levels.map((level, index) => (
                                                <Option
                                                    defaultValue={getValues("account_type")}
                                                    key={index}
                                                    className="text-black font-monte-1"
                                                    // value={level}
                                                >
                                                    {level}
                                                </Option>
                                            ))}
                                        </Select>

                                        {error && (
                                            <p className="text-red-900 text-xs font-monte">
                                                {error.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className={'md:w-5/6'}>
                            <span className={'text-black'}>Enter Name For The Role:</span>
                            <Input
                                defaultValue={getValues("role")}
                                {...register("roleEdit", {required: "Role name is required"})}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }} className={'md:w-full !border-t-blue-gray-200 focus:!border-t-gray-900'}/>

                            {errors.roleEdit && (
                                <p className="text-red-900 text-xs font-monte">
                                    {errors.roleEdit.message}
                                </p>
                            )}
                        </div>

                    <DialogFooter className={' w-full rounded py-5 px-3'}>
                        <div className={'md:w-3/6 flex md:justify-start gap-6'}>
                            <Button loading={loading} type={'submit'}
                                    className={'rounded-[0.25rem] text-center w-full md:w-24 bg-blue-900'}>
                                {loading ? 'editing' : 'edit'}
                            </Button>
                            <Button className={'rounded-[0.25rem] text-center w-full md:w-24 bg-red-900'}>
                                cancel
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogBody>

        </Dialog>

    </main>
}

export default Roles
