import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";

const TeamForm = ({ open, handleClose }) => {
    const { user } = useAuthContext();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [request, setRequest] = useState({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NTM2MzUyMCwianRpIjoiY2E3YmNmNjYtZjZjYi00M2ViLTk1MjEtNjIzNmJjNDcwYTZmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImphY29iQGdtYWlsLmNvbSIsIm5iZiI6MTY4NTM2MzUyMCwiZXhwIjoxNjg1NjIyNzIwfQ.NxqkurU0ROjRIm93XYgdeqi2ilbirVusBud7b-0F4kQ",
        user: {
            email: "jacob@gmail.com",
            id: 1,
            name: "Jacob Sartorius",
            points: 0,
            role: "Manager",
            task_id: [],
            team_id: [1],
        },
    });
    const createTeam = async () => {
        const response = fetch("/api/team", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                manager_id: user["user"]["id"],
            }),
        });
        console.log("chicken");
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new team</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new team, please enter in the team name and
                        description of the team. After creation, you will be
                        granted the ability to create team events and add
                        members to your team.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Team Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Team Description"
                        type="text"
                        multiline
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createTeam}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TeamForm;
