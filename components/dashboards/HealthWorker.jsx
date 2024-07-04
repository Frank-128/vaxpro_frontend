import globalUser from "@/store/user";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {Button} from "@material-tailwind/react";
import {Add} from "@mui/icons-material";
import {useRouter} from "next/navigation";

import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import globalBookings from "@/store/bookings";
import {useEffect, useState} from "react";

const HealthWorker = () => {
    const loggedUser = globalUser((state) => state.loggedInUser)
    const router = useRouter()
    const bookings = globalBookings((state) => state.bookings);
    const [pendingBookings, setPendingBookings] = useState([])

    useEffect(() => {
        const filteredBookings = bookings.filter(({status})=>{
          return   status === "confirmed"
        })
        setPendingBookings(filteredBookings)
    }, [bookings]);

    console.log(pendingBookings,"this is the bookings list")

    const members = [
        {
            name: "Weekly Visitors",
            bg:"bg-[#f5edfc]/40",
            textColor:"text-[#9D86DE]",
            valueColor:"text-[#8d25df]",
            value:100,

        },
        {
            name: "Total Vaccinations",
            bg:"bg-[#daebfe]/40",
            textColor:"text-[#0074fc]/60",
            valueColor:"text-[#0074fc]",
            value:67,


        },

        {
            name: "Bookings",
            bg:"bg-[#c4c4c4]/40",
            textColor:"text-[#0c0c0c]/50",
            valueColor:"text-[#0c0c0c]",
            value:pendingBookings.length,


        },
    ];

    const data = [
        {
            name: 'PCV',
            uv: 4000,
            pv: 2400,
            amt: 200,
        },
        {
            name: 'OPV',
            uv: 3000,
            pv: 1398,
            amt: 340,
        },
        {
            name: 'Pentavalent',
            uv: 2000,
            pv: 9800,
            amt: 590,
        },
        {
            name: 'Rota',
            uv: 2780,
            pv: 3908,
            amt: 120,
        },
        {
            name: 'MR',
            uv: 1890,
            pv: 4800,
            amt: 90,
        },
        {
            name: 'BCG',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'HPV',
            uv: 3490,
            pv: 4300,
            amt: 500,
        },
    ];

    return(
    <div>
        { loggedUser &&
            <div className={'h-screen flex flex-col gap-6 md:gap-3'}>
                <div className={'flex justify-between flex-col md:flex-row md:gap-3 gap-2'}>
                    <div className={` ${loggedUser.role.account_type !== "health_worker" && 'md:w-full'} bg-blue-500/15 p-1 md:p-2 rounded flex gap-2 items-center md:w-3/4 w-full`}>
                        <span> Welcome Back</span>
                       {loggedUser.role.account_type === "health_worker" ?<>
                        <span
                            className={'text-xl font-monte-1 text-blue-800'}>{loggedUser?.health_workers[0]?.first_name}</span>
                        <span
                            className={'text-xl font-monte-1 text-blue-800'}>{loggedUser?.health_workers[0]?.last_name} </span>
                       </>:
                            <span
                            className={'text-xl font-monte-1 text-blue-800'}>{loggedUser?.facilities?.facility_name} Branch Manager</span>
                            }
                        <span>!!</span>
                    </div>
                   { loggedUser.role.account_type === "health_worker" && <Button className={'md:w-1/4 w-fit self-end rounded-[0.25rem] bg-blue-900 flex justify-center items-center gap-1 md:gap-3'}
                            onClick={() => {
                                router.push("/children")
                            }}>
                        <Add/>
                        <span>Register Child</span>
                    </Button>}
                </div>

                <div className={'flex flex-col md:flex-row w-full h-[35rem] gap-2'}>
                    <div className={'flex w-full md:w-4/6 flex-col'}>
                        <div className={'md:flex grid grid-cols-2 w-full h-[15rem] md:h-[20%] gap-2'}>
                            {members.map(({bg, name, textColor, valueColor, value},index) => (
                                <div key={index}
                                     className={`${bg} 
                                      flex-col text-sm items-start
                                      p-2 rounded-xl flex w-full md:w-2/6 h-[90%] shadow-sm justify-center gap-0 md:gap-3`}>
                                    <span className={`${textColor} font-extrabold`}>
                                      {name}
                                    </span>
                                    <span className={`${valueColor} font-monte-1 font-extrabold`}>
                                      {value}
                                    </span>
                                </div>
                            ))
                            }
                        </div>
                        <div className={'bg-[#BF40BF]/10 h-[80%] rounded-md flex justify-center items-center '}>
                            <ResponsiveContainer width="90%" height="80%">
                                <AreaChart
                                    width={300}
                                    height={200}
                                    data={data}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    {/*<CartesianGrid strokeDasharray="3 3" />*/}
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    {/*<Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />*/}
                                    {/*<Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />*/}
                                    <Area type="monotone" dataKey="amt" stackId="1" stroke="#800080/50" fill="#BF40BF" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>


                    <div className={'bg-black/20 rounded-lg w-full md:w-2/6 flex items-center justify-center'}>
                        <LocalizationProvider className={'w-full'} dateAdapter={AdapterDayjs}>
                            {/*<DemoContainer className={'w-full'} components={['DateCalendar', 'DateCalendar']}>*/}
                            <DateCalendar className={'w-full'} defaultValue={dayjs()} readOnly/>
                            {/*</DemoContainer>*/}
                        </LocalizationProvider>
                    </div>

                </div>


            </div>
        }
    </div>

    )
}

export default HealthWorker;
