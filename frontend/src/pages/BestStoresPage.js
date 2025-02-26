import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, Button, Grid, Rating } from "@mui/material";

const BestStoresPage = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch top 3 stores from the backend
    axios
      .get("http://localhost:5000/api/stores/best")
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🏪 Top 3 Best Stores
      </Typography>
      <Grid container spacing={3}>
        {stores.length > 0 ? (
          stores.map((store, index) => (
            <Grid item xs={12} md={4} key={store._id}>
              <Card sx={{ minHeight: 200 }}>
                <CardContent>
                  <Typography variant="h6">#{index + 1} {store.name}</Typography>
                  <Typography variant="body2">📍 {store.location}</Typography>
                  <Typography variant="body2">📞 {store.contact}</Typography>
                  <Typography variant="body2">💰 Best Price: ₹{store.price}</Typography>
                  <Rating value={store.rating} readOnly precision={0.5} />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 1 }} 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${store.location}`, "_blank")}
                  >
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2">No stores available at the moment.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default BestStoresPage;
