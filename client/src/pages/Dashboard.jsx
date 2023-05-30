import Typography from "@mui/material/Typography";
import Leaderboard from "../components/tables/Leaderboard";
import TeamDashboard from "../components/tables/TeamDashboard";
import TaskDashboard from "../components/tables/TaskDashboard";

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
                    paddingTop: 5,
                }}
            >
                <TeamDashboard />
            </div>
            <div
                style={{
                    margin: "auto",
                    align: "center",
                    alignItems: "center",
                    paddingTop: 5,
                }}
            >
                <TaskDashboard />
            </div>
        </div>
    );
};

export default Dashboard;
