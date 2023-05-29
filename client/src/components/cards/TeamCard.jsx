import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const TeamCard = ({ team }) => {
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

    return (
        <Card
            sx={{
                textAlign: "left",
            }}
        >
            <CardContent>
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <Typography variant="h5">Manager ID</Typography>
                    <Typography variant="subtitle1">
                        {team.manager_id}
                    </Typography>
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
                                <Typography variant="subtitle1" key={index}>
                                    {event.id} {event.description} {event.time}
                                </Typography>
                            ))}
                    </Typography>
                </div>
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <Typography variant="h5">Members</Typography>
                    {members &&
                        members.map((member, index) => (
                            <Typography variant="subtitle1" key={index}>
                                {member.id} {member.name} {member.role}
                            </Typography>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default TeamCard;
