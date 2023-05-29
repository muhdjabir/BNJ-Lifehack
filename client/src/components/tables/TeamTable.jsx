import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import TeamCard from "../cards/TeamCard";
import TeamForm from "../forms/TeamForm";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";

const TeamTable = () => {
    const [value, setValue] = useState(0);
    const [teams, setTeams] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch(
                `/api/team`
                // {
                // method: "POST",
                // body: [1],
                // headers: {
                //     "Content-Type": "application/json",
                // },
                // }
            );
            const json = await response.json();

            if (response.ok) {
                // dispatch({ type: "SET_Teams", payload: json });
                setTeams(json["teams"]);
            }
        };

        fetchTeams();
    }, []);

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
            <TeamForm open={open} handleClose={handleClose} />
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
                <IconButton onClick={handleClickOpen}>
                    <AddBoxIcon />
                </IconButton>
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
