import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import Box from "@mui/material/Box";

const TeamForm = ({ open, handleClose }) => {
    const { user } = useAuthContext();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get("name");
        const description = data.get("description");
        const response = await fetch("/api/team", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
                manager_id: user["user"]["id"],
            }),
        });
        if (response.ok) {
            handleClose();
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <DialogTitle>Create a new team</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a new team, please enter in the team name
                            and description of the team. After creation, you
                            will be granted the ability to create team events
                            and add members to your team.
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            id="name"
                            label="Team Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="description"
                            id="description"
                            label="Team Description"
                            type="text"
                            multiline
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
};

export default TeamForm;
