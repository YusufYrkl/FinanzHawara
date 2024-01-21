import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/Header/Header";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.mjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from 'react';
import { getKategorien } from './getKategorien';
import { Grid, IconButton } from '@mui/material';
import { Label } from '@mui/icons-material';

const Kategorien = () => {
    const [user] = useAuthState(auth);
    const userDocRef = doc(db, "users", user.uid);
    const [aktuelleKategorien, setAktuelleKategorien] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getKategorien(user, setAktuelleKategorien);
        };

        fetchData();
    }, [user]);

  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('');

  const handleAddCategoryClick = () => {
    setShowForm(true);
  };

  const textStyles = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginLeft: '10px',
  };

  const mainContainerStyles = {
    bgcolor: 'white',
    p: 1,
    marginTop: 2,
    border: 2,
    borderColor: 'lightblue',
    borderRadius: 1,
  };

  const deleteButtonStylesAusgabe = {
    color: 'black',
    '&:hover': {
        cursor: 'pointer',
      },
  };

  const handleSaveClick = () => {

    if (user) {


        updateDoc(userDocRef, {
          kategorien: [...aktuelleKategorien, category],
        })
        .then(() => {
          console.log('Document successfully updated with new entry in the map!');
        })
        .catch((error) => {
          console.error('Error updating document:', error);
        });
      }

    console.log('Kategorie gespeichert:', category);
    setShowForm(false);
    setCategory('');
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setCategory('');
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Kategorien" subtitle="Hier kannst du deine Kategorien bearbeiten" />
      </Box>
      <Button variant="contained" onClick={handleAddCategoryClick}>
        Kategorie hinzufügen
      </Button>

      {showForm && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <TextField
            label="Kategorie"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button variant="contained" onClick={handleSaveClick} style={{ marginRight: '10px', marginTop: '10px' }}>
            Speichern
          </Button>
          <Button variant="contained" onClick={handleCancelClick} style={{ marginTop: '10px' }}>
            Abbrechen
          </Button>
        </Paper>
      )}

        <Box {...mainContainerStyles} display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
            <Typography sx={textStyles} color={'black'} >kategorien</Typography>
        </Box>
        <Box {...mainContainerStyles} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography sx={textStyles} color={'black'}>HardCodedKategorie</Typography>
            <IconButton style={deleteButtonStylesAusgabe}>
              <DeleteIcon/>
            </IconButton>
        </Box>

    </Box>
  );
};

export default Kategorien;
