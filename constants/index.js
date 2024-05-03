import {
  ArrowDownward,
  ArrowDropDown,
  Book,
  HealthAndSafety,
  Home,
  KeyboardArrowDown,
  Medication,
  Note,
  Person,
  Report,
} from "@mui/icons-material";

export const navlinks = [
  {
    name: "Dashboard",
    link: "/",
    icon: <Home />,
    role: ["default"],
    account_type: ["default"],
  },
  {
    name: "User management",
    icon: <Person />,
    suffixIcon: <KeyboardArrowDown />,
    role: ["IT admin"],
    account_type: ["default"],

    sublinks: [
      {
        name: "ministry",
        link: "/user_management/ministry",
        icon: <HealthAndSafety />,
        role: [""],
        account_type: ["ministry"],
      },
      {
        name: "regional",
        link: "/user_management/regional",
        icon: <HealthAndSafety />,
        role: [""],
        account_type: ["ministry", "regional"],
      },
      {
        name: "district",
        link: "/user_management/district",
        icon: <HealthAndSafety />,
        role: ["2000-25-0"],
        account_type: ["regional", "district"],
      },
    ],
  },
  {
    name: "Hospital management",
    link: "/hospital_management",
    icon: <HealthAndSafety />,
    role: ["IT admin"],
    account_type: ["district"],
  },
  {
    name: "Vaccination",
    link: "/vaccination",
    icon: <Medication />,
    role: [""],
    account_type: ["ministry"],
  },
  {
    name: "Bookings",
    link: "/bookings",
    icon: <Book />,
    role: ["5000-1-1"],
    account_type: ["health_worker"],
  },
  {
    name: "Certificates",
    link: "/certificates",
    icon: <Note />,
    role: ["5000-1-1"],
    account_type: ["default"],
  },
  {
    name: "Reports",
    link: "/reports",
    icon: <Report />,
    role: ["default"],
    account_type: ["default"],
  },
];
