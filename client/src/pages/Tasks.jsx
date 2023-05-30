import Typography from "@mui/material/Typography";
//import AddTask from "../components/AddTask";
import Board from "../components/taskboard/Board";

const Tasks = () => {
    return (
        <div>
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    marginTop: 5,
                }}
            >
                Tasks
            </Typography>
            <div 
                style={{ 
                    display: "flex",
                    marginTop: 20, 
                    marginLeft: 20
                }}
            >
                <Board />
            </div>
        </div>
    );
};

export default Tasks;
