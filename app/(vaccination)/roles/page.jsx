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
    IconButton
} from "@material-tailwind/react";
import globalRoles from "@/store/roles";
import {Delete, Edit} from "@mui/icons-material";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";

const Roles = () => {
    const roles = globalRoles((state)=>state.roles)
    const TABLE_HEAD = ["No", "Role", "Account Level", "Actions"];
    const [selectedRow, setSelectedRow] =  useState()
    const {control} = useForm()
    const levels = [
        "Ministry", "Regional", "District"
    ]
    return <main className={'flex flex-col'}>
    <div className={'py-4 px-2 md:py-8 flex flex-col gap-6 md:gap-8 border-b border-black'}>
        <div className={'font-monte-1 text-xl md:text-3xl '}>Create New Role</div>
        <form className={'flex flex-col gap-8 md:gap-12'}>
            <div className={'border-b w-full border-gray-400 px-3 pb-8'}>
                <div className={'md:w-3/6'}>
                    <span>Select Level For The Role</span>
                    <Controller
                        control={control}
                        rules={{ required:"This field is required" }}
                        name="account_type"
                        render={({
                                     field: { onChange, onBlur, value, ref },
                                     fieldState: { error },
                                 }) => (
                            <div className="font-monte-1 text-black">
                                <Select
                                    className="text-black font-monte-1"
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
                    <span>Enter Name For The Role</span>
                    <Input className={'md:w-full'}/>
                </div>
            </div>
            <div className={'md:bg-black/10 w-full rounded py-5 px-3'}>
                <div className={'md:w-3/6 flex md:justify-start gap-6'}>
                    <Button className={'rounded-[0.25rem] text-center w-full md:w-24 bg-blue-900'}>
                        save
                    </Button>
                    <Button className={'rounded-[0.25rem] text-center w-full md:w-24 bg-red-900'}>
                        cancel
                    </Button>
                </div>
            </div>
        </form>
    </div>
<div className={'flex justify-center items-center w-full md:py-6 py-4'}>
    <Card className="h-full w-10/12 overflow-scroll border-t">
        <CardHeader floated={false} shadow={false} className={'font-monte-1 text-2xl p-4'}>Table for Roles</CardHeader>
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
            {roles.map(({ role, id, account_type }, index) => {
                const isLast = index === roles.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                    <tr key={id} className={''}>
                        <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {id}
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
                                            action: "update",
                                            contacts: contacts,
                                        });
                                        setValue(
                                            "contacts",
                                            contacts.split("+255")[1]
                                        );
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>

                            {/*{loggedInUser.id !== id ? (*/}
                                <Tooltip content="Delete Role">
                                    <IconButton
                                        variant="text"
                                        onClick={() =>
                                            setSelectedRow({ id: id, action: "delete" })
                                        }
                                    >
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            {/*) : (*/}
                            {/*    <div className="w-10"></div>*/}

                        </td>

                    </tr>
                );
            })}
            </tbody>
        </table>
    </Card>
</div>


</main>
}

export default Roles
