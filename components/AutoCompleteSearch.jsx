"use client"
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { Input, List, ListItem } from '@material-tailwind/react';

const AutoCompleteSearch = ({ name, control }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
    };

    // Function to handle option selection
    const handleOptionClick = (option, onChange) => {
        setSearchTerm(option.ward_name);  // Update display value
        onChange(option.id);  // Update form value
        setInterval(()=>{
            setIsDropdownVisible(false);
        },7000)

    };

    return (
        <div className="select-search">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <div className='relative'>
                        <Input
                            label='Ward'
                            value={searchTerm}
                            onChange={(e) => handleSearch(e, onChange)}
                            onFocus={() => setIsDropdownVisible(true)}
                            onBlur={(e) => {
                                setTimeout(() => setIsDropdownVisible(false), 100);
                                onBlur(e);
                            }}
                            autoComplete="off"
                        />
                        {isDropdownVisible && options.length > 0 && (
                            <List className="max-h-72 bg-gray-100 w-full overflow-y-scroll absolute top-10 left-0">
                                {options.map((option, index) => (
                                    <ListItem
                                        key={index}
                                        onClick={() => handleOptionClick(option, onChange)}
                                    >
                                        {option.ward_name}
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
