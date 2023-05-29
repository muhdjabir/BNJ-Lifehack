import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`/api/user`);
            const json = await response.json();

            if (response.ok) {
                // dispatch({ type: "SET_Users", payload: json });
                const userArray = json["users"];
                userArray.sort((a, b) =>
                    a.points > b.points ? -1 : b.points > a.points ? 1 : 0
                );
                setUsers(userArray);
            }
        };

        fetchUsers();
        console.log(users);
    }, []);

    return (
        <TableContainer
            component={Paper}
            sx={{
                width: { xs: "100%", md: "75%", lg: "45%" },
                margin: { md: "auto", lg: 3 },
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ranking</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users &&
                        users.map((user, index) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell sx={{ width: "10%" }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="right">{user.role}</TableCell>
                                <TableCell align="right">
                                    {user.points}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Leaderboard;
