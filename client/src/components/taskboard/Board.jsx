import { useState } from "react";
import { Tabs, Tab } from "@mui/material";

const Board = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const handleChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };
    return (
        <>
            <Tabs
                value={currentTabIndex}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                orientation="vertical"
            >
                <Tab label="Ongoing" />
                <Tab label="Pending" />
                <Tab label="Completed"/>
                <Tab label="Open Tasks"/>
            </Tabs>
        </>
    )
}

export default Board