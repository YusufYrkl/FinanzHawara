import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.mjs";
import { useAuthState } from "react-firebase-hooks/auth";

const plusButtonStyles = {
    borderRadius: '8px',
    backgroundColor: '#4CAF50', // Grüne Farbe
    color: 'white',
    fontSize: '24px',
    '&:hover': {
      backgroundColor: 'darkgreen', // Ändern Sie die Hover-Farbe nach Bedarf
    },
};

const saveButtonStyles = {
    borderRadius: '8px',
    backgroundColor: '#4CAF50', // Grüne Farbe
    color: 'white',
    fontSize: '18px',
    '&:hover': {
      backgroundColor: 'darkgreen', // Ändern Sie die Hover-Farbe nach Bedarf
    },
};

const cancelButtonStyles = {
    borderRadius: '8px',
    backgroundColor: 'red', // Grüne Farbe
    color: 'white',
    fontSize: '18px',
    '&:hover': {
      backgroundColor: 'darkred', // Ändern Sie die Hover-Farbe nach Bedarf
    },
};

const textStyles = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginLeft: '10px',
};

const inputStyles = {
    marginBottom: '10px',
    width: '100%',
    border: '2px solid white', // Randfarbe
    borderRadius: '8px',
    transition: 'border 0.3s', // Sanfte Übergangseffekte
};

const EinnahmenAusgaben = () => {

  const [showInputs, setShowInputs] = useState(false);

  const [formData, setFormData] = useState({
    beschreibung: '',
    betrag: '',
    kategorie: '',
  });

  const handleSaveClick = () => {
    // Process or save the data as needed
    console.log('Form Data:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
    }));
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Einnahmen/Ausgaben" subtitle="Hier kannst du deine Einnahmen und Ausgaben bearbeiten" />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Grid container alignItems="center" spacing={2}>
            <Grid item>
                <Button variant="contained" sx={plusButtonStyles} onClick={() => setShowInputs(true)}>
                    +
                </Button>
            </Grid>
            <Grid item>
                <Typography variant="body1" sx={textStyles}>Neue Einnahme hinzufügen</Typography>
            </Grid>
            <Grid item>
                {showInputs && (
                    <Grid container alignItems="center" spacing={5}>
                        <Grid item><TextField name="beschreibung" label="Beschreibung" variant="outlined" sx={inputStyles} onChange={handleInputChange}/></Grid>
                        <Grid item><TextField name="betrag" label="Betrag" variant="outlined" sx={inputStyles} onChange={handleInputChange} /></Grid>
                        <Grid item><TextField name="kategorie" label="Kategorie" variant="outlined" sx={inputStyles} onChange={handleInputChange} /></Grid>
                        <Grid item>
                            <Button variant="contained" sx={saveButtonStyles} onClick={handleSaveClick}>
                                Speichern
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="error" sx={cancelButtonStyles} onClick={() => setShowInputs(false)}>
                                Abbrechen
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EinnahmenAusgaben;