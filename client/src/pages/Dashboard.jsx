import Typography from "@mui/material/Typography";
import Leaderboard from "../components/tables/Leaderboard";
import TeamDashboard from "../components/tables/TeamDashboard";

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
            <div style={{ display: "flex", margin: 3, align: "center" }}>
                <Leaderboard />
            </div>
            <div
                style={{
                    margin: 3,
                    align: "center",
                    textAlign: "center",
                }}
            >
                <TeamDashboard />
            </div>
        </div>
    );
};

export default Dashboard;
