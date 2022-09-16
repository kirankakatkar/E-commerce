import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import UploadIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import Product from "../../../shared/models/ProductModel";

import { endpoints } from "../../../api";

interface IProductImagesProps {
  onSubmit: (e: React.SyntheticEvent) => void;
  previous: (e: React.SyntheticEvent) => void;
  setProduct: (state: Product) => void;
  product: Product;
}

const ProductImages: React.FunctionComponent<IProductImagesProps> = ({
  setProduct,
  product,
  previous,
  onSubmit,
}) => {
  const [images, setImages] = React.useState<File[]>([]);
  const [strImages, setStrImages] = React.useState<any[]>([]);

  // set the images received from server to the strimages
  React.useEffect(() => {
    const arr =
      Array.isArray(product.images) &&
      typeof product.images[0] == "string" &&
      product.images?.map(
        (image: string | any) => `${endpoints.serverBaseURL}/${image}`
      );

    if (arr) setStrImages(arr);
  }, [product]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    console.log("FileList: ", files);

    if ((files?.length as number) + images?.length > 5) {
      alert("only 5 files are allowed, remove existing to select new");
    }

    let arr = [];
    if (files) for (const file of files) arr.push(file);

    const totalFiles =
      arr.length > 5 ? arr.slice(0, 5 - strImages.length) : arr;

    if (totalFiles)
      setImages((images) => {
        return [...images, ...totalFiles];
      });
  }; //handleFileChange

  const convertToBase64 = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener(
        "load",
        () => {
          resolve(reader.result as any);
        },
        false
      );
      reader.onerror = (err) => reject(err);
    });
  }; //convertToBase64

  React.useEffect(() => {
    if (images.length > 0) {
      const allFilePromises: Promise<File>[] = [];

      images.forEach((file) => {
        allFilePromises.push(convertToBase64(file));
      });

      Promise.allSettled(allFilePromises).then((files) => {
        // if (files.length > 0) setStrImages(files?.map((file) => file.value));
        if (files.length > 0) {
          const arr = [...strImages];
          files?.forEach((file) => {
            console.log("FIle:-- ", file);

            // if (!arr.includes((file as any).value))
            arr.unshift((file as any).value);
          });
          console.log("Arr:-- ", arr);
          setStrImages(arr);
        }
      });
    }
  }, [images]); //useEffect

  // const handleDeleteImage = (index: number) => {
  //   if (images.length > 0)
  //     setImages((images) => {
  //       return images.filter((image, i) => i != index);
  //     });
  //   setStrImages((images) => {
  //     return images.filter((image, i) => i != index);
  //   });
  //   if (images.length > 0) setProduct({ ...product, images: images });
  // }; //handleDeleteImage

  const updateImagesToState = (e: React.SyntheticEvent) => {
    setProduct({ ...product, images: images });
    onSubmit(e);
  };

  const Image = ({ index }: { index: number }) => {
    return (
      <Box
        key={index}
        sx={{
          width: 150,
          height: 150,
          border: "1px solid #999",
          margin: 2,
          position: "relative",
        }}
      >
        <img src={strImages[index]} style={{ width: "100%", height: "100%" }} />
        {/* <IconButton
          sx={{
            position: "absolute",
            right: 2,
            bottom: 2,
            padding: 0.5,
            backgroundColor: "#9998",
          }}
          onClick={() => handleDeleteImage(index)}
        >
          <DeleteIcon /> 
        </IconButton>*/}
      </Box>
    );
  };

  return (
    <Container>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              sx={{ margin: "auto" }}
            >
              <label htmlFor="imageupload">Upload</label>
            </Button>
            <input
              multiple
              accept=".png,.jpg,.jpeg,.gif,.webp"
              type="file"
              id="imageupload"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Grid>

          <Grid item xs={12} container>
            {Array.isArray(strImages) &&
              strImages.map((image, index) => (
                <Image key={index} index={index} />
              ))}
          </Grid>

          <Grid container marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={previous}
              sx={{ marginRight: "auto" }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={updateImagesToState}
              sx={{ marginLeft: "auto" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductImages;
