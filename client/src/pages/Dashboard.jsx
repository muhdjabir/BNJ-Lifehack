import Typography from "@mui/material/Typography";
import Leaderboard from "../components/tables/Leaderboard";

const Dashboard = () => {
    return (
        <div>
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    marginTop: 5,
                }}
            >
                Dashboard
            </Typography>
            <div style={{ display: "flex" }}>
                <Leaderboard />
            </div>
        </div>
    );
};

export default Dashboard;
