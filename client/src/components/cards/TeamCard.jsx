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

    return (
        <Card
            sx={{
                textAlign: "left",
            }}
        >
            <CardContent>
                <Typography variant="h5">Manager ID</Typography>
                <Typography variant="p">{team.manager_id}</Typography>
                <Typography variant="h5">Description</Typography>
                <Typography variant="p">{team.description}</Typography>
                <Typography variant="h5">Events</Typography>
                <Typography variant="p">{team.events_id}</Typography>
                <Typography variant="h5">Members</Typography>
                {members &&
                    members.map((member, index) => (
                        <Typography variant="p" key={index}>
                            {member.id} {member.name} {member.role}
                        </Typography>
                    ))}
            </CardContent>
        </Card>
    );
};

export default TeamCard;
