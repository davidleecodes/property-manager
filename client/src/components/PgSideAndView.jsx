import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

export default function PgSideAndView({ side, view }) {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid
        container
        sx={{ flexDirection: { xs: "column", md: "row" } }}
        spacing={3}
      >
        <Grid item xs={12} md={3}>
          {side}
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {view}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
