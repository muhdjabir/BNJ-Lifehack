import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

const TeamDashboard = () => {
    const { user } = useAuthContext();
    const [teamArray, setTeamArray] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchArray = async () => {
            const response = await fetch(`/api/user/${user["user"]["id"]}`);
            const json = await response.json();

            if (response.ok) {
                setTeamArray(json["user"]["team_id"]);
            }
        };
        if (user) {
            fetchArray();
        }
    }, [user]);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch(`/api/team/items`, {
                method: "POST",
                body: JSON.stringify({ team: teamArray }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();

            if (response.ok) {
                setTeams(json["teams"]);
            }
        };
        if (teamArray) {
            fetchTeams();
            console.log(teams);
        }
    }, [teamArray]);

    return (
        <div>
            <Typography variant="h5">Your Teams</Typography>
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
            >
                {teams &&
                    teams.map((team) => (
                        <ListItem>
                            <ListItemText primary={team.description} />
                            <Divider variant="inset" component="li" />
                        </ListItem>
                    ))}
            </List>
        </div>
    );
};

export default TeamDashboard;
