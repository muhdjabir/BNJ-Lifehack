import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuthContext } from "../../hooks/useAuthContext";

const EventForm = ({ open, handleClose }) => {
    const { user } = useAuthContext();

    const createEvent = async () => {
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
                        label="Event Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Event Description"
                        type="text"
                        multiline
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createEvent}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EventForm;
