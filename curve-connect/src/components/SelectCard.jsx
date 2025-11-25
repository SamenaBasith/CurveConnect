import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";

export default function SelectCard ({ card, selected, onSelect }) {
    return (
          <Card
                onClick={() => onSelect(card.id)}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s",
                  border: selected ? "2px solid #2563EB" : "null",
                  borderRadius: 0,
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={card.src}
                    alt={card.alt}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ textAlign: "center", p: 1 }}>
                    <Typography variant="body2">{card.alt}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
    );
}