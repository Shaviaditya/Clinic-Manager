import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

  const handleClick = (userId) => {
    setExpandedUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(query);
    try {
      const { data } = await axios.get("http://localhost:5700/users", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name: query,
        },
      });
      setSearchResults(data.users);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Box
        sx={{
          "& > :not(style)": { width: "70ch", marginLeft: "35%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Enter your search query"
          variant="outlined"
          value={query}
          type="text"
          onChange={handleInputChange}
        />
      </Box>
      <Box
        sx={{
          "& > :not(style)": {
            width: "15ch",
            marginLeft: "47%",
            marginTop: "25px",
          },
        }}
      >
        <Button
          type="submit"
          variant="contained"
          disabled={query.trim().length === 0}
        >
          Search
        </Button>
      </Box>
      {searchResults.length > 0 && (
        <Box sx={{ margin: "20px" }}>
          <ListSubheader component="div" id="nested-list-subheader">
            Registered Patients History
          </ListSubheader>
          {searchResults.map((user) => (
            <Card key={user.id} sx={{ marginBottom: "20px" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {user.name}
                </Typography>
                <CardActions>
                  <IconButton onClick={() => handleClick(user.id)}>
                    {expandedUserId === user.id ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </CardActions>
                <Collapse in={expandedUserId === user.id} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="body2">
                      User ID: {user.id}
                    </Typography>
                    <Typography variant="body2">
                      Phone: {user.phone}
                    </Typography>
                    <Typography variant="body2">
                    Address: {user.address}
                    </Typography>
                    <Button type="button" variant="contained" href={`/users/${user.id}`}>
                        Other Details and Generate Receipt
                    </Button>
                  </CardContent>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </form>
  );
};

export default SearchComponent;
