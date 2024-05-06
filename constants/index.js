import { ArrowDownward, ArrowDropDown, Book, ChildCare, HealthAndSafety, Home, KeyboardArrowDown, Medication, Note, Person, Report } from "@mui/icons-material";

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
        name:'OverallDash',
        link:'/overalldash',
        icon:<Medication/>
        
    },
    {
        name:'Children',
        link:'/children',
        icon:<ChildCare/>
        
    },
    {
        name:'ChildDetails',
        link:'/childdetails',
        icon:<ChildCare/>
        
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