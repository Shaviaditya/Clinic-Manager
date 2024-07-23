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
import Container from "@mui/material/Container";

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
    try {
      const { data } = await axios.get("http://localhost:5700/users", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name: query.toLowerCase(),
        },
      });
      setSearchResults(data.users);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "50%",
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Clinic System
        </Typography>
        <Typography variant="subtitle1" mt={2}>
          Empowering healthcare with advanced technology.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSearch} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Enter your search query"
              variant="outlined"
              value={query}
              type="text"
              onChange={handleInputChange}
              sx={{ width: "60%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={query.trim().length === 0}
              sx={{ width: "20%" }}
            >
              Search
            </Button>
          </Box>
          {searchResults.length > 0 && (
            <Box sx={{ margin: "20px", width: "100%" }}>
              <ListSubheader component="div" id="nested-list-subheader">
                Registered Patients History
              </ListSubheader>
              {searchResults.map((user) => (
                <Card
                  key={user.id}
                  sx={{
                    marginBottom: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography variant="h5" component="div">
                      {user.name}
                    </Typography>
                    <CardActions>
                      <IconButton onClick={() => handleClick(user.id)}>
                        {expandedUserId === user.id ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </IconButton>
                    </CardActions>
                    <Collapse
                      in={expandedUserId === user.id}
                      timeout="auto"
                      unmountOnExit
                    >
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
                        <Button
                          type="button"
                          variant="contained"
                          href={`/users/${user.id}`}
                        >
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
      </Box>
    </Container>
  );
};

export default SearchComponent;
