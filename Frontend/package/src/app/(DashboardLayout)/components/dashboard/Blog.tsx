
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
} from "@mui/material";
import img1 from "public/images/products/comming.jpg";
import img2 from "public/images/products/comming.jpg";
import img3 from "public/images/products/comming.jpg";
import img4 from "public/images/products/comming.jpg";
import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import Image from "next/image";

const ecoCard = [
  {
    title: "Curso de Programación Web",
    subheader: "Inicio: Octubre 30, 2023",
    photo: img1,
    price: "Gratis",
    rating: 4,
  },
  {
    title: "Beca de Investigación",
    subheader: "Plazo de inscripción: Noviembre 15, 2023",
    photo: img2,
    price: "Gratis", // La beca no tiene costo
    rating: 5,
  },
  {
    title: "Oferta de Trabajo: Asistente Administrativo",
    subheader: "Fecha de publicación: Octubre 10, 2023",
    photo: img3,
    price: "Gratis", // No hay costo para postularse
    rating: 3,
  },
  {
    title: "Seminario: Innovaciones en Energías Renovables",
    subheader: "Fecha: Diciembre 5, 2023",
    photo: img4,
    price: "Gratis",
    rating: 4,
  },
];


const Blog = () => {
  return (
    <Grid container spacing={3}>
      {ecoCard.map((product, index) => (
        <Grid item xs={12} md={4} lg={3} key={index}>
          <BlankCard>
            <Typography component={Link} href="/">
              <Image
                src={product.photo}
                alt="img"
                style={{ width: "100%", height: "250px" }}
              />
            </Typography>
            <Tooltip title="Add To Cart">
              <Fab
                size="small"
                color="primary"
                sx={{ bottom: "75px", right: "15px", position: "absolute" }}
              >
                <IconBasket size="16" />
              </Fab>
            </Tooltip>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h6">{product.title}</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6">{product.price}</Typography>
                  <Typography
                    color="textSecondary"
                    ml={1}
                    sx={{ textDecoration: "line-through" }}
                  >
                    {/* ${product.salesPrice} */}
                  </Typography>
                </Stack>
                <Rating
                  name="read-only"
                  size="small"
                  value={product.rating}
                  readOnly
                />
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blog;
