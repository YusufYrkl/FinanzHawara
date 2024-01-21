import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { getEinnahmenAusgaben } from './getEinnahmenAusgaben';
import { doc, updateDoc, deleteField, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.mjs";
import { useAuthState } from "react-firebase-hooks/auth";

const textStyles = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginLeft: '10px',
};

const einnahmeBoxStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    border: 2,
    borderRadius: 1,
    p: 1,
    bgcolor: '#4CAF50',
    //bgcolor: 'lightgreen',
    borderColor: 'darkgreen',
};

const ausgabeBoxStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    border: 2,
    borderRadius: 1,
    p: 1,
    bgcolor: 'red',
    //bgcolor: 'lightgreen',
    borderColor: 'darkred',
};

const mainContainerStyles = {
    bgcolor: 'white',
    p: 1,
    marginTop: 2,
    border: 2,
    borderColor: 'lightblue',
    borderRadius: 1,
};

const deleteButtonStylesEinnahme = {
    color: 'red',
    '&:hover': {
        cursor: 'pointer',
      },
};

const deleteButtonStylesAusgabe = {
    color: 'white',
    '&:hover': {
        cursor: 'pointer',
      },
};

const deleteEntry = (user, field, id) => {
    const userDocRef = doc(db, "users", user.uid);  

    if (user) {
      const fieldName = field;
      
      updateDoc(userDocRef, {
        [`${fieldName}.${id}`]: deleteField()
      })
      .then(() => {
        console.log('Document successfully updated with new entry in the map!');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
    }
};


const Uebersicht = () => {
    const [user] = useAuthState(auth);
    const [data, setData] = useState({ einnahmen: {}, ausgaben: {} });

    useEffect(() => {
        const fetchData = async () => {
        await getEinnahmenAusgaben(user, setData);
        };

        fetchData();
    }, [user]);

    let kombiniert = { ...data.einnahmen, ...data.ausgaben };

    let sortierteIDs = Object.keys(kombiniert).map(Number).sort((a, b) => a - b);

    let sortiertesObjekt = {};
    for (let id of sortierteIDs) {
        sortiertesObjekt[id] = kombiniert[id];
    }

  return (
    <Box {...mainContainerStyles}>
        <Box display={'flex'} textAlign={'center'} justifyContent={'space-around'}>
            <Typography sx={textStyles} color={'black'}>Beschreibung</Typography>
            <Typography sx={textStyles} color={'black'}>Kategorie</Typography>
            <Typography sx={textStyles} color={'black'}>Betrag</Typography>
        </Box>
        {Object.entries(sortiertesObjekt).map(([key, value]) => (
            data.einnahmen.hasOwnProperty(key) ? (
                <Box {...einnahmeBoxStyles} key={key}>
                    <Typography sx={textStyles}>{value.beschreibung}</Typography>
                    <Typography sx={textStyles}>{value.kategorie}</Typography>
                    <Typography sx={textStyles}>{value.betrag}€</Typography>
                    <IconButton onClick={() => deleteEntry(user, "einnahmen", key)} style={deleteButtonStylesEinnahme} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ): (
                <Box {...ausgabeBoxStyles} key={key}>
                    <Typography sx={textStyles}>{value.beschreibung}</Typography>
                    <Typography sx={textStyles}>{value.kategorie}</Typography>
                    <Typography sx={textStyles}>-{value.betrag}€</Typography>
                    <IconButton onClick={() => deleteEntry(user, "ausgaben", key)} style={deleteButtonStylesAusgabe} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        ))}   
    </Box>
  );
};

export default Uebersicht;