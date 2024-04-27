import { ArrowDownward, ArrowDropDown, Book, HealthAndSafety, Home, KeyboardArrowDown, Medication, Note, Person, Report } from "@mui/icons-material";

export const navlinks = [
    {
        name:'Dashboard',
        link:'/',
        icon: <Home/>

    },
    {
        name:'User management',
        icon: <Person />,
        suffixIcon: <KeyboardArrowDown />,
        sublinks:[
            {
                name:'ministry',
                link:'/user_management/ministry',
                icon:<HealthAndSafety/>

                
            },
            {
                name:'regional',
                link:'/user_management/regional',
                icon:<HealthAndSafety/>
                
            },
            {
                name:'district',
                link:'/user_management/district',
                icon:<HealthAndSafety/>
                
            },
           
        ]
        
    },
    {
        name:'Hospital management',
        link:'/hospital_management',
        icon:<HealthAndSafety/>
        
    },
    {
        name:'Vaccination',
        link:'/vaccination',
        icon:<Medication/>
        
    },
    {
        name:'Bookings',
        link:'/bookings',
        icon:<Book/>
        
    },
    {
        name:'Certificates',
        link:'/certificates',
        icon:<Note/>
        
    },
    {
        name:'Reports',
        link:'/reports',
        icon:<Report />
        
    }
]

export const FACILITY_ROWS = [
    {
      facility_reg_no: "TZ001",
      facility_name: "Muhimbili National Hospital",
      contacts: "+255 22 215 1363",
      region: "Dar es Salaam",
      district: "Ilala",
      date: "23/04/18",
    },
    {
      facility_reg_no: "TZ002",
      facility_name: "Bugando Medical Centre",
      contacts: "+255 28 250 0631",
      region: "Mwanza",
      district: "Ilemela",
      date: "23/04/18",
    },
    {
      facility_reg_no: "TZ003",
      facility_name: "Kilimanjaro Christian Medical Centre",
      contacts: "+255 27 275 4377",
      region: "Kilimanjaro",
      district: "Moshi",
      date: "19/09/17",
    },
    {
      facility_reg_no: "TZ004",
      facility_name: "Mbeya Referral Hospital",
      contacts: "+255 25 250 0387",
      region: "Mbeya",
      district: "Mbeya",
      date: "24/12/08",
    },
    {
      facility_reg_no: "TZ005",
      facility_name: "Arusha Lutheran Medical Centre",
      contacts: "+255 27 254 5600",
      region: "Arusha",
      district: "Arusha",
      date: "04/10/21",
    },
    {
        facility_reg_no: "TZ006",
        facility_name: "Puskas Medical Centre",
        contacts: "+255 28 250 0631",
        region: "Mwanza",
        district: "Ilemela",
        date: "23/04/18",
      },
      {
        facility_reg_no: "TZ007",
        facility_name: "Ileje Medical Centre",
        contacts: "+255 27 275 4377",
        region: "Kilimanjaro",
        district: "Moshi",
        date: "19/09/17",
      },
      {
        facility_reg_no: "TZ008",
        facility_name: "Bugando Medical Centre",
        contacts: "+255 28 250 0631",
        region: "Mwanza",
        district: "Ilemela",
        date: "23/04/18",
      },
      {
        facility_reg_no: "TZ009",
        facility_name: "Kilimanjaro Christian Medical Centre",
        contacts: "+255 27 275 4377",
        region: "Kilimanjaro",
        district: "Moshi",
        date: "19/09/17",
      },
      {
        facility_reg_no: "TZ010",
        facility_name: "Bugando Medical Centre",
        contacts: "+255 28 250 0631",
        region: "Mwanza",
        district: "Ilemela",
        date: "23/04/18",
      },
      {
        facility_reg_no: "TZ011",
        facility_name: "Mwakibenyo  Medical Centre",
        contacts: "+255 27 275 4377",
        region: "Mbeya",
        district: "Chunya",
        date: "19/09/17",
      },
      {
        facility_reg_no: "TZ012",
        facility_name: "Estete Medical Centre",
        contacts: "+255 28 250 0631",
        region: "Morogoro",
        district: "Msamvu",
        date: "23/04/18",
      },
      {
        facility_reg_no: "TZ013",
        facility_name: "Powell Medical Centre",
        contacts: "+255 27 275 4377",
        region: "Tanga",
        district: "Kilindi",
        date: "19/09/17",
      },
      {
        facility_reg_no: "TZ014",
        facility_name: "Fungato Medical Centre",
        contacts: "+255 28 250 0631",
        region: "Mwanza",
        district: "Mabatini",
        date: "23/04/18",
      },
      {
        facility_reg_no: "TZ015",
        facility_name: "Seliani Medical Centre",
        contacts: "+255 27 275 4377",
        region: "Arusha",
        district: "Ngarenaro",
        date: "19/09/17",
      },
      {
        facility_reg_no: "TZ016",
        facility_name: "Agha Khan Medical Centre",
        contacts: "+255 28 250 0631",
        region: "Mwanza",
        district: "Ilemela",
        date: "23/04/18",
      },
      {
        facility_reg_no: "TZ017",
        facility_name: "Biliamuro Medical Centre",
        contacts: "+255 27 275 4377",
        region: "Kilimanjaro",
        district: "Moshi",
        date: "19/09/17",
      },
  ];

export const api_facilities = [
  {
    "facility_reg_no":"tf_001",
    "facility_name":"Kinondoni Hospital",

  },
  {
    "facility_reg_no":"tf_002",
    "facility_name":"Mwananyamala Hospital",

  },
  {
    "facility_reg_no":"tf_003",
    "facility_name":"Mwenge Hospital",

  },
  {
    "facility_reg_no":"tf_004",
    "facility_name":"Masaki Hospital",

  },
  {
    "facility_reg_no":"tf_005",
    "facility_name":"Yombo Hospital",

  },
]


export const district_wards = [
  {
    "ward_id":1,
    "ward_name":"Ubungo"
  },
  {
    "ward_id":2,
    "ward_name":"Segerea"
  },
  {
    "ward_id":3,
    "ward_name":"Tabata"
  },
  {
    "ward_id":4,
    "ward_name":"Kariakoo"
  },
  {
    "ward_id":5,
    "ward_name":"Buguruni"
  },
]