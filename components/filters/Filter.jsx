import { Button, Select, Option } from "@material-tailwind/react";
import { FilterAltOutlined } from "@mui/icons-material";
import globalAddress from "@/store/address";
import globalVaccines from "@/store/vaccines";
import { useEffect, useState } from "react";
import globalUser from "@/store/user";
import axios from "@/axios";
import "../../axios";

const Filter = ({ setAllChildren }) => {
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const [filterValues, setFilterValues] = useState(
    loggedInUser?.role?.account_type === "regional"
      ? {
          region: loggedInUser.region_id,
          district: null,
          year: null,
          vaccine: null,
          gender: null,
        }
      : loggedInUser?.role?.account_type === "district"
      ? {
          region: loggedInUser.region_id,
          district: loggedInUser.district_id,
          year: null,
          vaccine: null,
          gender: null,
        }
      : {
          region: null,
          district: null,
          year: null,
          vaccine: null,
          gender: null,
        }
  );
  const regions = globalAddress((state) => state.regions);
  const vaccines = globalVaccines((state) => state.vaccines);
  const [districts, setDistricts] = useState([]);
  const authenticatedToken = globalUser((state) => state.authenticatedToken);


  const filter_array = [
    {
      option_type: "region",
      options: regions,
      authorized_accounts: ["ministry"],
    },
    {
      option_type: "district",
      options: districts,
      authorized_accounts: ["ministry", "regional"],
    },
    {
      option_type: "gender",
      options: ["Male", "Female"],
      authorized_accounts: ["ministry", "regional", "district"],
    },
    {
      option_type: "year",
      options: [
        2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
      ],
      authorized_accounts: ["ministry", "regional", "district"],
    },
    {
      option_type: "vaccine",
      options: vaccines,
      authorized_accounts: ["ministry", "regional", "district"],
    },
  ];

  const handleSelect = (option_type, target_value) => {
    switch (option_type) {
      case "region":
        if (target_value === null) {
          setDistricts(null);
        }
        target_value !== null &&
          axios
            .get(`region_districts/${target_value}`, {
              headers: {
                Authorization: `Bearer ${authenticatedToken}`,
              },
            })
            .then((res) => {
              setDistricts(res.data);
            });
        setFilterValues({ ...filterValues, region: target_value });
        break;
      case "district":
        setFilterValues({ ...filterValues, district: target_value });
        break;
      case "gender":
        setFilterValues({ ...filterValues, gender: target_value });
        break;
      case "age":
        setFilterValues({ ...filterValues, age: target_value });
        break;
      case "year":
        setFilterValues({ ...filterValues, year: target_value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (loggedInUser?.role?.account_type === "regional") {
      axios
        .get(`region_districts/${loggedInUser?.region_id}`, {
          headers: {
            Authorization: `Bearer ${authenticatedToken}`,
          },
        })
        .then((res) => {
          setDistricts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (loggedInUser?.role?.account_type === "district") {
      axios
        .get(`region_districts/${loggedInUser?.region_id}`, {
          headers: {
            Authorization: `Bearer ${authenticatedToken}`,
          },
        })
        .then((res) => {
          setDistricts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedInUser, authenticatedToken]);

  useEffect(() => {
    const fetchChildren = () => {
      axios.post("all_children", filterValues).then((res) => {
        setAllChildren(res.data);
      });
    };
    fetchChildren();
  }, [setAllChildren, filterValues]);

  console.log(loggedInUser);
  return (
    <div
      className={
        "flex justify-around md:justify-end gap-2 overflow-x-scroll pb-2 md:mb-4"
      }
    >
      {filter_array
        .filter((item) =>
          item.authorized_accounts.includes(loggedInUser?.role?.account_type)
        )
        .map(({ options, option_type }, index) => (
          <select
            key={index}
            value={
              filterValues[option_type] == null ? "" : filterValues[option_type]
            }
            onChange={(e) =>
              handleSelect(
                option_type,
                e.target.value === "all" ? null : e.target.value
              )
            }
            className="w-28 text-xs h-8 p-2 border border-black rounded bg-white text-gray-700"
          >
            {option_type === "region" ? (
              <>
                <option value={"all"} className="">
                  All regions
                </option>
                {options?.map(({ region_name, id }, index) => (
                  <option value={id} key={index} className="">
                    {region_name}
                  </option>
                ))}
              </>
            ) : option_type === "district" ? (
              <>
                <option value={"all"} className="">
                  All districts
                </option>
                {districts.length !== 0 ? (
                  options?.map(({ district_name, id }, index) => (
                    <option value={id} key={index} className={""}>
                      {district_name}
                    </option>
                  ))
                ) : (
                  <option disabled>Select region first</option>
                )}
              </>
            ) : option_type === "gender" ? (
              <>
                <option option={"all"}>Gender</option>
                {options?.map((i, index) => (
                  <option value={i} key={index} className={""}>
                    {i}
                  </option>
                ))}
              </>
            ) : option_type === "vaccine" ? (
              <>
                <option value={"all"}>Vaccine</option>
                {options?.map((vaccine, index) => (
                  <option value={vaccine.id} key={index} className={""}>
                    {vaccine.name}
                  </option>
                ))}
              </>
            ) : (
              <>
                <option value={"all"}>Year</option>
                {options?.map((year, index) => (
                  <option value={year} key={index} className={""}>
                    {year}
                  </option>
                ))}
              </>
            )}
          </select>
        ))}
      <Button
        onClick={() => {
            setDistricts([])
          if (loggedInUser?.role.account_type === "ministry") {
            setFilterValues({
              region: null,
              district: null,
              year: null,
              vaccine: null,
              gender: null,
            });
          } else if (loggedInUser?.role.account_type === "regional") {
            setFilterValues({
              region: loggedInUser?.region_id,
              district: null,
              year: null,
              vaccine: null,
              gender: null,
            });
          } else if (loggedInUser?.role.account_type === "district") {
            setFilterValues({
              region: loggedInUser?.region_id,
              district: loggedInUser?.district_id,
              year: null,
              vaccine: null,
              gender: null,
            });
          }
        }}
        className={
          "bg-transparent w-28 h-8 p-2 text-xs border border-black text-black rounded-[0.25rem] flex justify-center items-center gap-2"
        }
      >
        <span> Reset all</span>
      </Button>
    </div>
  );
};

export default Filter;
