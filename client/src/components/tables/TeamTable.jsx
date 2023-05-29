import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import TeamCard from "../cards/TeamCard";
import TeamForm from "../forms/TeamForm";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import { useAuthContext } from "../../hooks/useAuthContext";

const TeamTable = () => {
    const [value, setValue] = useState(0);
    const [teams, setTeams] = useState([]);
    const [teamOpen, setTeamOpen] = useState(false);
    const [teamArray, setTeamArray] = useState([]);
    const { user } = useAuthContext();

    const handleTeamClickOpen = () => {
        setTeamOpen(true);
    };

    const handleTeamClose = () => {
        setTeamOpen(false);
    };

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
        }
    }, [teamArray]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                maxWidth: { xs: 320, sm: 480, md: "80%" },
                bgcolor: "background.paper",
                align: "center",
                margin: "auto",
                display: "grid",
            }}
        >
            <TeamForm open={teamOpen} handleClose={handleTeamClose} />
            <div
                style={{
                    margin: "auto",
                    gridRowStart: 1,
                    gridRowEnd: 1,
                    display: "flex",
                }}
            >
                {teams && (
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {teams &&
                            teams.map((team) => <Tab label={team.name} />)}
                    </Tabs>
                )}
                {user && user["user"]["role"] === "Manager" && (
                    <IconButton onClick={handleTeamClickOpen}>
                        <AddBoxIcon />
                    </IconButton>
                )}
            </div>
            {teams &&
                teams.map((team, index) => (
                    <TabPanel value={value} index={index}>
                        <TeamCard team={team} />
                    </TabPanel>
                ))}
        </Box>
    );
};

export default TeamTable;
