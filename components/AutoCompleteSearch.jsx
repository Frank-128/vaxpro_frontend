"use client"
import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { Input, List, ListItem } from '@material-tailwind/react';

const AutoCompleteSearch = ({ name, control, ward = null }) => {
    const [searchTerm, setSearchTerm] = useState(ward ? ward.ward_name : '');
    const [options, setOptions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);

    // Effect to set the initial value based on the ward prop
    useEffect(() => {
        if (ward) {
            setSearchTerm(ward.ward_name);
        }
    }, [ward]);

    // Function to handle the search input changes
    const handleSearch = async (event, onChange) => {
        const searchQuery = event.target.value;
        setSearchTerm(searchQuery);

        // Fetch data from backend based on the search query
        if (searchQuery) {
            try {
                const response = await axios.get(`wards?searchQuery=${searchQuery}`);
                if (response.status === 200) {
                    setOptions(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            setOptions([]);
        }

        setIsDropdownVisible(true);
        onChange(''); // Clear the form value since it's a new search
    };

    // Function to handle option selection
    const handleOptionClick = (option, onChange) => {
        setSearchTerm(option.ward_name); // Update display value
        onChange(option.id); // Update form value with ward ID
        setIsDropdownVisible(false);
        setIsSelecting(false);

    };

    return (
        <div className="select-search">
            <Controller
                className={'w-full bg-red-200'}
                name={name}
                control={control}
                rules={{ required: "This field is required" }}
                defaultValue={ward ? ward.id : ''} // Set default value to ward.id if ward is provided
                render={({ field: { onChange, value, onBlur } ,fieldState: { error },}) => (
                    <div className={'relative w-full'}>
                        <Input
                            label='Ward'
                            value={searchTerm} // Control the input value with searchTerm state
                            onChange={(e) => handleSearch(e, onChange)}
                            onFocus={() => setIsDropdownVisible(true)}
                          //  containerProps={{ className: "4xs:min-w-72 " }}
                            onBlur={() => {
                                if (!isSelecting) {
                                    setIsDropdownVisible(false);
                                }
                                onBlur();
                            }}
                            autoComplete="off"
                            className={'h-[3.1rem] w-full'}
                            // containerProps={{className: 'min-w-[95%] sm:min-w-[85%] md:min-w-[70%] lg:min-w-[]'}}
                        />
                        {isDropdownVisible && options.length > 0 && (
                            <List className="max-h-72 bg-gray-100 w-full overflow-y-scroll absolute top-10 left-0 z-10">
                                {options.map((option, index) => (
                                    <ListItem
                                        key={index}
                                        onMouseDown={() => setIsSelecting(true)}
                                        onMouseUp={() => setIsSelecting(false)}
                                        onClick={() => handleOptionClick(option, onChange)}
                                    >
                                        {option.ward_name},  {option.district.district_name}
                                    </ListItem>
                                ))}
                            </List>
                        )}

                    </div>
                )}
            />
        </div>
    );
};

export default AutoCompleteSearch;
