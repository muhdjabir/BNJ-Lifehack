import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const TeamCard = ({ team }) => {
    const [manager, setManager] = useState({});
    const [events, setEvents] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await fetch(`/api/user/items`, {
                method: "POST",
                body: JSON.stringify({ user: team.members_id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();

            if (response.ok) {
                // dispatch({ type: "SET_Members", payload: json });
                setMembers(json["users"]);
            }
        };

        fetchMembers();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch(`/api/event/team/${team.id}`);
            const json = await response.json();

            if (response.ok) {
                // dispatch({ type: "SET_Events", payload: json });
                setEvents(json["events"]);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchManager = async () => {
            const response = await fetch(`/api/user/${team.manager_id}`);
            const json = await response.json();

            if (response.ok) {
                // dispatch({ type: "SET_Manager", payload: json });
                setManager(json["user"]);
            }
        };

        fetchManager();
    }, []);

    return (
        <Card
            sx={{
                textAlign: "left",
            }}
        >
            <CardContent>
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <Typography variant="h5">Manager</Typography>
                    <Typography variant="subtitle1">{manager.name}</Typography>
                </div>
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <Typography variant="h5">Description</Typography>
                    <Typography variant="subtitle1">
                        {team.description}
                    </Typography>
                </div>
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <Typography variant="h5">Events</Typography>
                    <Typography variant="subtitle1">
                        {events &&
                            events.map((event, index) => (
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" key={index}>
                                            {event.time}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            key={index}
                                        >
                                            {event.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                    </Typography>
                </div>
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <Typography variant="h5">Members</Typography>
                    <List>
                        {members &&
                            members.map((member, index) => (
                                <ListItem>
                                    <ListItemText
                                        primary={member.name}
                                        secondary={`${member.role} Points:${member.points}`}
                                    />
                                </ListItem>
                                // <Typography variant="subtitle1" key={index}>
                                //     {member.id} {member.name} {member.role}
                                // </Typography>
                            ))}
                    </List>
                </div>
            </CardContent>
        </Card>
    );
};

export default TeamCard;
