import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
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
    const { data } = await axios.get("http://localhost:5700/users", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        name: query,
      },
    });
    setSearchResults(data.users);
  };

  return (
    <form onSubmit={handleSearch}>
      <Box
        component="form"
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
        component="form"
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
          onClick={handleClick}
          disabled={query.trim().length === 0}
        >
          Search
        </Button>
      </Box>
      {searchResults.length > 0 && (
        <>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Registered Patients History
              </ListSubheader>
            }
          >
            {searchResults.map((user) => (
              <>
                <ListItemButton
                  key={user.id}
                  onClick={() => handleClick(user.id)}
                >
                  <StarBorder />
                  <ListItemText primary={user.name}>
                    <Link to={`/users/${user.id}`} />
                  </ListItemText>
                  {expandedUserId === user.id ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={expandedUserId === user.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={user.phone} />
                    </ListItemButton>
                  </List>
                </Collapse>
              </>
            ))}
          </List>
        </>
      )}
    </form>
  );
};

export default SearchComponent;
