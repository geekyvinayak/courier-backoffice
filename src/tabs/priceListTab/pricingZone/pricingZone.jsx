import React, { useEffect, useState } from "react";
import SubTabNavigator from "../../../components/subTabNavigator";
import LinkBtn from "../../../components/linkBtn";
import Uploadpricezone from "./uploadPriceZone/uploadpricezone";
import {
  Box,
  Paper,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { getRequest } from "../../../consts/apiCalls";

const PricingZone = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [zones, setZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRequest("/priceZone/includedZones");
      setZones(response);
      setFilteredZones(response); // Initialize filtered zones with all zones
    } catch (err) {
      setError("Failed to fetch zones");
      console.error("Error fetching zones:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredZones(zones);
    } else {
      const filtered = zones.filter((zone) =>
        zone.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredZones(filtered);
    }
  };

  return (
    <div className="ml-2 pb-2">
      <SubTabNavigator
        data={[
          { lable: "Zone", url: "/pricelist/pricingzones" },
          // { lable: "Zone Layout", url: "/pricelist/pricingzoneslayout" },
        ]}
      />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Zone Layout
        </Typography>
        <Select
          fullWidth
          value={"value1"}
          sx={{
            maxWidth: 600,
            height: 40,
          }}
        >
          <MenuItem value="value1">Default</MenuItem>
        </Select>
      </Box>
      <Uploadpricezone fetchData={fetchData} />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Included Zones
        </Typography>
      </Box>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          marginLeft: "20px",
          // padding: "20px",
          height: "auto",
          maxHeight: 500,
        }}
      >
        <Box sx={{ p: 2 }}>
          <div className="flex justify-end p-2 gap-11 items-center border-b border-gray-500 mb-2">
            <TextField
              size="small"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              sx={{ mb: 2, flex: 1 ,maxWidth:"45%",justifySelf:"end" }}
            />
          </div>
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: 350,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f5f5f5",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "4px",
              },
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress size={40} />
              </Box>
            ) : error ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  color: "error.main",
                }}
              >
                {error}
              </Box>
            ) : filteredZones.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  color: "text.secondary",
                }}
              >
                No zones found
              </Box>
            ) : (
              <List sx={{ p: 0, width: "100%" }}>
                {filteredZones.map((zone, index) => (
                  <React.Fragment key={zone}>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemText
                        primary={zone}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontSize: "0.9rem",
                          },
                        }}
                      />
                    </ListItem>
                    {index < filteredZones.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default PricingZone;
