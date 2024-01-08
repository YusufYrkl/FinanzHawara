import { Box } from "@mui/material";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Übersicht über deine Finanzen" />
      </Box>
    </Box>
  );
};

export default Dashboard;
