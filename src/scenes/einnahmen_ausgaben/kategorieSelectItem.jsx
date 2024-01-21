import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getKategorien } from '../Kategorien/getKategorien';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.mjs";
import { useState, useEffect } from 'react';

const customformcontrol ={
    width: '300px',
    border: '2px solid white', // Randfarbe
    borderRadius: '8px',
    transition: 'border 0.3s', // Sanfte Übergangseffekte
}


const KategorieSelect = ({onSelectionChange}) => {

    const [user] = useAuthState(auth);
    const [kategorien, setKategorien] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getKategorien(user, setKategorien);
        };

        fetchData();
    }, [user]);

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onSelectionChange(value);
    };

  return (
    <FormControl fullWidth sx={customformcontrol}>
        <InputLabel>Kategorie</InputLabel>
        <Select
            label="kategorie"
            value={selectedValue}
            onChange={handleChange}
        >
            {kategorien.map(kategorie => (
                <MenuItem value={kategorie} key={kategorie}>{kategorie}</MenuItem>
            ))}
        </Select>
    </FormControl>
  );
};

export default KategorieSelect;