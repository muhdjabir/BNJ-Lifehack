import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";

const EventForm = ({ open, handleClose, id }) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const { user } = useAuthContext();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log({
            description: description,
            time: time,
            date: date,
        });
        const response = await fetch("/api/event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: description,
                time: `${date} ${time}`,
                team_id: id,
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
                    <DialogTitle>Create a new Event</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a new Event, please enter in the date and
                            description of the event.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="description"
                            id="description"
                            label="Event Description"
                            type="text"
                            fullWidth
                            onChange={(e) => setDescription(e.target.value)}
                            variant="standard"
                        />
                        <div>
                            <label for="date">
                                Choose a date for your event
                            </label>
                            <input
                                type="date"
                                id="date"
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label for="time">
                                Choose a time for your event
                            </label>
                            <input
                                type="time"
                                id="time"
                                min="09:00"
                                max="18.00"
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                            disabled={
                                date && time && description ? false : true
                            }
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
};

export default EventForm;
