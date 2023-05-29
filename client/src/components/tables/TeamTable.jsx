import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import TeamCard from "../cards/TeamCard";

const TeamTable = () => {
    const [value, setValue] = useState(0);
    const [teams, setTeams] = useState([]);

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
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
        console.log(teams);
    }, []);

    // const handleChangeIndex = (index) => {
    //     setValue(index);
    // };

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
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{
                    margin: "auto",
                    gridRowStart: 1,
                    gridRowEnd: 1,
                }}
            >
                {teams && teams.map((team) => <Tab label={team.name} />)}
            </Tabs>
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
