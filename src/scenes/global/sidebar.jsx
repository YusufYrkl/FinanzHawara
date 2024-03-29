import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import profilePic from "../../assets/profile_pic.jpg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import BalanceIcon from '@mui/icons-material/Balance';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import IsoIcon from '@mui/icons-material/Iso';
import SavingsIcon from '@mui/icons-material/Savings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CategoryIcon from '@mui/icons-material/Category';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        setSelected(title);
        navigate(to); // Use navigate to change the route
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const CustomSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed} style={{ height: "125vh" }}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  src={profilePic}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    objectFit: "cover", // This ensures the aspect ratio is maintained
                  }}
                />
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard" // Update the path
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Kontostand"
              to="/kontostand" // Update the path
              icon={<BalanceIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Einnahmen/Ausgaben"
              to="/einnahmen_ausgaben"
              icon={<IsoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Sparpläne"
              to="/sparplan"
              icon={<SavingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Kategorien"
              to="/Kategorien"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Support"
              to="/support"
              icon={<SupportAgentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default CustomSidebar;
