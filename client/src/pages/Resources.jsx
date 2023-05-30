import Typography from "@mui/material/Typography";
import TabBar from "../components/TabBar";
const Resources = () => {
    return (
        <div>
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    marginTop: 5,
                }}
            >
                Resources
            <TabBar />
            </Typography>
        </div>
    );
};

export default Resources;
