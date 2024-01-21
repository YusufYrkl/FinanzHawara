import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, TextField, } from "@mui/material";
import Header from "../../components/Header/Header";


const Sparplan = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [newCategory, setNewCategory] = useState("");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="SPARPLAN" subtitle="Erstelle einen Sparplan!" />
            </Box>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Sparplan hinzufügen
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <TextField
                        label="Neuer Sparplan"
                        variant="outlined"
                    //onChange={(e) => setNewCategory(e.target.value)}
                    />
                </MenuItem>
                <MenuItem>
                    <TextField
                        label="Betrag in €"
                        variant="outlined"
                    //onChange={(e) => setNewCategory(e.target.value)}
                    />
                </MenuItem>
                <MenuItem>
                    <Button variant="contained" color="primary">
                        Speichern
                    </Button>
                </MenuItem>
                <MenuItem>

                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Sparplan;
