import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

const MemberForm = ({ open, handleClose, id }) => {
    const { user } = useAuthContext();
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            const response = await fetch(`/api/user`);
            const json = await response.json();

            if (response.ok) {
                setPeople(json["users"]);
            }
        };

        if (user) {
            fetchPeople();
        }
    }, []);

    const addMember = async (member_id) => {
        const response = await fetch(`/api/team/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                members_id: member_id,
            }),
        });
        if (response.ok) {
            handleClose();
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new members</DialogTitle>
                <DialogContent>
                    {people &&
                        people.map((person) => (
                            <Grid item xs={12} md={6}>
                                <List dense={true}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <IconButton
                                                onClick={() =>
                                                    addMember(person.id)
                                                }
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={person.name}
                                            secondary={person.role}
                                        />
                                    </ListItem>
                                    ,
                                </List>
                            </Grid>
                        ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MemberForm;
