"use client";
import {Card, CardBody, Typography} from "@material-tailwind/react";
import globalUser from "@/store/user";
import globalAllUsers from "@/store/all_users";
import HealthWorker from "@/components/dashboards/HealthWorker";
import Filter from "@/components/filters/Filter";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";

function TeamCard({name, title, bg, textColor, valueColor}) {
    return (<Card className={`rounded-lg ${bg} h-28}`} shadow={false}>
            <CardBody className=" w-full h-full flex flex-col items-start ">
                <Typography
                    className={`w-full h-2/3 text-sm ${textColor} font-extrabold`}
                >
                    {name}
                </Typography>
                <Typography
                    className={` text-2xl w-full h-1/3 font-extrabold font-monte-1  ${valueColor}`}
                >
                    {title}
                </Typography>
            </CardBody>
        </Card>);
}

export function Dashboard() {

    const children = globalAllUsers((state) => state.allChildren);
    const setAllChildren = globalAllUsers((state) => state.setAllChildren);
    const loggedInUser = globalUser((state) => state.loggedInUser);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const members = [{
        name: "Vaccinated Children",
        title: children?.vaccinated_children,
        bg: "bg-[#f5edfc]/40",
        textColor: "text-[#9D86DE]",
        valueColor: "text-[#8d25df]",
    }, {
        name: "Ongoing Vaccinations",
        title: children?.unvaccinated_children,
        bg: "bg-[#daebfe]/40",
        textColor: "text-[#0074fc]/60",
        valueColor: "text-[#0074fc]",
    }, {
        name: "Registered Children",
        title: children?.registered_children,
        bg: "bg-[#fde28b]/20",
        textColor: "text-[#f28c07]/60",
        valueColor: "text-[#d07806]",
    }, {
        name: "Success Rate",
        title: children?.success + "%",
        bg: "bg-[#c4c4c4]/70",
        textColor: "text-[#0c0c0c]/50",
        valueColor: "text-[#0c0c0c]",
    },];

    const RADIAN = Math.PI / 180;
    const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}, {
        name: 'Group C',
        value: 300
    }, {name: 'Group D', value: 200},];
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);


        return (<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>);
    }

    const CustomLegend = (props) => {
        const {payload} = props;
        return (<ul style={{listStyle: 'none', padding: 0}}>
                {payload.map((entry, index) => (<li key={`item-${index}`} style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem',
                    }}>
          <span
              style={{
                  display: 'inline-block',
                  width: '50px',
                  height: '50px',
                  borderRadius: '10%',
                  backgroundColor: entry.color,
                  marginRight: '10px',
                  marginVertical: '10px',
              }}
          ></span>
                        {entry.value}
                    </li>))}
            </ul>);
    };


    return (<section className="min-h-screen py-2 md:px-4 ">
            {loggedInUser && <>
                {(loggedInUser.role?.account_type === "health_worker" || loggedInUser.role?.account_type === "branch_manager") ? (
                    <HealthWorker/>) : (<div className="container mx-auto">

                        <Filter setAllChildren={setAllChildren}/>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {members.map((props, key) => children == null ? (<Card
                                    key={key}
                                    className={`rounded-lg bg-green-200  h-28 animate-pulse`}
                                    shadow={false}
                                >
                                    <CardBody className="text-center">
                                        <Typography
                                            variant="h5"
                                            color="blue-gray"
                                            className="!font-medium  bg-slate-800 rounded  text-lg text-white"
                                        ></Typography>
                                        <Typography
                                            color="blue-gray"
                                            className="mb-2 !text-base bg-slate-300 rounded !font-semibold text-white"
                                        ></Typography>
                                    </CardBody>
                                </Card>) : (<TeamCard key={key} {...props} />))}
                        </div>
                        <div className={'w-full h-[30rem] flex flex-col justify-center mt-12 underline px-16 gap-3'}>
                            <span className={'text-black font-monte-1 ml-[16rem]'}>THE CHART SHOWING USERS DATA</span>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                    <Legend
                                        style={{padding: '10px'}}
                                        layout="vertical"
                                        verticalAlign="middle"
                                        align="right"
                                        content={CustomLegend}
                                        // onMouseEnter={handleMouseEnter}
                                        // onMouseLeave={handleMouseLeave}
                                    />
                                    <Pie
                                        data={children?.chart_data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={220}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>


                        <div className="grid grid-cols-1 mt-20 gap-6 md:grid-cols-2 lg:grid-cols-2">
                          {/*<ChartGraph vaccineName="Vaccine: Polio" />*/}
                          {/*<ChartGraph vaccineName="Vaccine: BCG" />*/}
                          {/*<ChartGraph vaccineName="Vaccine: MR" />*/}
                        </div>
                    </div>)}
            </>}
        </section>);
}

export default Dashboard;
