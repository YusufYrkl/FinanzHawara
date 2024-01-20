import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.mjs";
import { useAuthState } from "react-firebase-hooks/auth";
import KategorieSelect from "./kategorieSelectItem";
import Uebersicht from "./uebersicht";

const plusButtonStyles = {
    borderRadius: '8px',
    backgroundColor: '#4CAF50', // Grüne Farbe
    color: 'white',
    fontSize: '24px',
    '&:hover': {
      backgroundColor: 'darkgreen', // Ändern Sie die Hover-Farbe nach Bedarf
    },
};

const minusButtonStyles = {
  borderRadius: '8px',
  backgroundColor: 'red', // Grüne Farbe
  color: 'white',
  fontSize: '24px',
  '&:hover': {
    backgroundColor: 'darkred', // Ändern Sie die Hover-Farbe nach Bedarf
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

  const [user] = useAuthState(auth);
  const userDocRef = doc(db, "users", user.uid);

  const handleSaveClick = (i) => {

      if (user) {
        const fieldName = i == 1 ? 'einnahmen' : 'ausgaben';
  
        // The new entry you want to add to the map
        const id = Timestamp.now().seconds;
        const newEntry = {
          "id": id,
          "beschreibung": formData.beschreibung,
          "betrag": formData.betrag,
          "kategorie": formData.kategorie
        };
  
        // Update the document with the new entry in the map
        updateDoc(userDocRef, {
          [`${fieldName}.${newEntry.id}`]: newEntry,
        })
        .then(() => {
          console.log('Document successfully updated with new entry in the map!');
        })
        .catch((error) => {
          console.error('Error updating document:', error);
        });
      }
    
    i == 1 ? setShowInputsPlus(false) : setShowInputsMinus(false);
    console.log('Form Data:', formData);
  };

  const [showInputsPlus, setShowInputsPlus] = useState(false);
  const [showInputsMinus, setShowInputsMinus] = useState(false);

  const [formData, setFormData] = useState({
    beschreibung: '',
    betrag: '',
    kategorie: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
    }));
  };

  const handleSelectionChange = (selectedKategorie) => {
    setFormData({
      ...formData,
      kategorie: selectedKategorie,
    });
    console.log(selectedKategorie);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Einnahmen/Ausgaben" subtitle="Hier kannst du deine Einnahmen und Ausgaben bearbeiten" />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Grid container alignItems="center" spacing={2}>
            <Grid item>
                <Button variant="contained" sx={plusButtonStyles} onClick={() => setShowInputsPlus(true)}>
                    +
                </Button>
            </Grid>
            <Grid item>
                <Typography variant="body1" sx={textStyles}>Neue Einnahme hinzufügen</Typography>
            </Grid>
            <Grid item>
                {showInputsPlus && !showInputsMinus &&(
                    <Grid container alignItems="center" spacing={5}>
                        <Grid item><TextField name="beschreibung" label="Beschreibung" variant="outlined" sx={inputStyles} onChange={handleInputChange}/></Grid>
                        <Grid item><TextField name="betrag" label="Betrag" variant="outlined" sx={inputStyles} onChange={handleInputChange} /></Grid>
                        <Grid item><KategorieSelect onSelectionChange={handleSelectionChange} /></Grid>
                        <Grid item>
                            <Button variant="contained" sx={saveButtonStyles} onClick={() => handleSaveClick(1)}>
                                Speichern
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="error" sx={cancelButtonStyles} onClick={() => setShowInputsPlus(false)}>
                                Abbrechen
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
            <Grid item>
                <Button variant="contained" sx={minusButtonStyles} onClick={() => setShowInputsMinus(true)}>
                    -
                </Button>
            </Grid>
            <Grid item>
                <Typography variant="body1" sx={textStyles}>Neue Ausgabe hinzufügen</Typography>
            </Grid>
            <Grid item>
                {showInputsMinus && !showInputsPlus && (
                    <Grid container alignItems="center" spacing={5}>
                        <Grid item><TextField name="beschreibung" label="Beschreibung" variant="outlined" sx={inputStyles} onChange={handleInputChange}/></Grid>
                        <Grid item><TextField name="betrag" label="Betrag" variant="outlined" sx={inputStyles} onChange={handleInputChange} /></Grid>
                        <Grid item><KategorieSelect onSelectionChange={handleSelectionChange} /></Grid>
                        <Grid item>
                            <Button variant="contained" sx={saveButtonStyles} onClick={() => handleSaveClick(0)}>
                                Speichern
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="error" sx={cancelButtonStyles} onClick={() => setShowInputsMinus(false)}>
                                Abbrechen
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
      </Box>
      <Uebersicht/>
    </Box>
  );
};
export default EinnahmenAusgaben;