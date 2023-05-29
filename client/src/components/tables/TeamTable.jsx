import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";

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

    const handleChangeIndex = (index) => {
        setValue(index);
    };

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
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                {/* {teams} */}
                {teams &&
                    teams.map((team) => (
                        <p key={team.name}>{team.description}</p>
                    ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Three
            </TabPanel>
        </Box>
    );
};

export default TeamTable;
