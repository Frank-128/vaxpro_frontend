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
  },
  {
    name: "User management",
    icon: <Person />,
    suffixIcon: <KeyboardArrowDown />,
    role: ["default"],

    sublinks: [
      {
        name: "ministry",
        link: "/user_management/ministry",
        icon: <HealthAndSafety />,
        role: ["1000-1"],
      },
      {
        name: "regional",
        link: "/user_management/regional",
        icon: <HealthAndSafety />,
        role: ["1000-1", "2000-1"],
      },
      {
        name: "district",
        link: "/user_management/district",
        icon: <HealthAndSafety />,
        role: ["2000-1"],
      },
    ],
  },
  {
    name: "Hospital management",
    link: "/hospital_management",
    icon: <HealthAndSafety />,
    role: ["3000-1"],
  },
  {
    name: "Vaccination",
    link: "/vaccination",
    icon: <Medication />,
    role: ["1000-1"],
  },
  {
    name: "Bookings",
    link: "/bookings",
    icon: <Book />,
    role: ["5000-1"],
  },
  {
    name: "Certificates",
    link: "/certificates",
    icon: <Note />,
    role: ["5000-1"],
  },
  {
    name: "Reports",
    link: "/reports",
    icon: <Report />,
    role: ["default"],
  },
];
