import Typography from "@mui/material/Typography";
import TeamTable from "../components/tables/TeamTable";

const Teams = () => {
    return (
        <div>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    marginTop: 5,
                }}
            >
                Teams
            </Typography>
            <TeamTable />
        </div>
    );
};

export default Teams;
