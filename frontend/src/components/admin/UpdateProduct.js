import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import Sidebar from "./Sidebar";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { BorderFlowBySpan, Spans } from "../styledComponents/AnimationComponent";
import { FormContainer } from "../styledComponents/Form";
import { ClearAll } from "@mui/icons-material";

export default function UpdateProduct() {
  const [details, setDetails] = useState({
    name: "",
    price: 0,
    MRP: 1,
    description: "",
    aboutThisItem: "",
    category: "",
    stock: "",
    seller: "",
    imagesUrl: "",
    imagesCleared: false,
  });

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const {
    loading,
    isProductUpdated,
    product = {},
    error,
  } = useSelector((state) => state.productState);

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", details.name);
    formData.append("price", details.price);
    formData.append("MRP", details.MRP);
    formData.append("stock", details.stock);
    formData.append("description", details.description);
    formData.append("aboutThisItem", details.aboutThisItem);
    formData.append("seller", details.seller);
    formData.append("category", details.category);
    formData.append("imagesUrl", details.imagesUrl);
    formData.append("imagesCleared", details.imagesCleared);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(productId, formData));
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setDetails((prev) => {
      return { ...prev, imagesCleared: true };
    });
  };

  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductUpdated()),
      });
      setImages([]);
      navigate("/admin/products");

      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch]);

  useEffect(() => {
    if (product._id) {
      setDetails((pre) => {
        return {
          ...pre,
          name: product.name,
          price: product.price,
          MRP: product.MRP,
          description: product.description,
          aboutThisItem: product.aboutThisItem || "",
          category: product.category,
          stock: product.stock,
          seller: product.seller,
        };
      });

      let images = [];
      product.images.forEach((image) => {
        images.push(image.image);
      });

      setImagesPreview(images);
    }
  }, [product]);

  const options = [
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Mobile Phones",
      label: "Mobile Phones",
    },
    {
      value: "Laptops",
      label: "Laptops",
    },
    {
      value: "Accessories",
      label: "Accessories",
    },
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Headphones",
      label: "Headphones",
    },
    {
      value: "Food",
      label: "Food",
    },
    {
      value: "Books",
      label: "Books",
    },
    {
      value: "Clothes/Shoes",
      label: "Clothes/Shoes",
    },
    {
      value: "Beauty/Health",
      label: "Beauty/Health",
    },
    {
      value: "Sports",
      label: "Sports",
    },
    {
      value: "Outdoor",
      label: "Outdoor",
    },
    {
      value: "Home",
      label: "Home",
    },
  ];

  function handleChange(e) {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="">
      <Box className="">
        <Sidebar />
      </Box>
      <FlexCenter width="100%">
        <BorderFlowBySpan mt="20px">
        <Spans />
          <FormContainer
            onSubmit={sumbitHandler}
            className="input__form"
            encType="multipart/form-data"
            component="form"
            p="15px"
            m="4px"
          >
            <h1>Update Product</h1>
            <div className="">
              <TextField
                sx={{ width: "100%" }}
                name="name"
                label="Name"
                variant="standard"
                value={details.name}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <TextField
                sx={{ width: "100%" }}
                type="number"
                name="price"
                label="Price"
                variant="standard"
                value={details.price}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <TextField
                sx={{ width: "100%" }}
                type="number"
                name="MRP"
                label="MRP"
                variant="standard"
                value={details.MRP}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <TextField
                sx={{ width: "100%" }}
                label="Description"
                name="description"
                multiline
                rows={2}
                variant="standard"
                value={details.description}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <TextField
                sx={{ width: "100%" }}
                label="About This Item"
                name="aboutThisItem"
                multiline
                rows={5}
                variant="standard"
                value={details.aboutThisItem}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <TextField
                sx={{ width: "100%" }}
                select
                label="Category"
                name="category"
                helperText="Please select Product Category"
                variant="standard"
                onChange={handleChange}
                value={details.category}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                type="number"
                name="stock"
                label="Stock"
                variant="standard"
                value={details.stock}
                onChange={handleChange}
              />
            </div>

            <div>
              <TextField
                sx={{ width: "100%" }}
                name="seller"
                label="Seller Name"
                variant="standard"
                value={details.seller}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                name="imagesUrl"
                label="images Url use ',' to seperate"
                variant="standard"
                value={details.imagesUrl}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Images</label>

              <div className="custom-file">
                <input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  multiple
                  onChange={onImagesChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>
              {imagesPreview.length > 0 && (
                <span
                  onClick={clearImagesHandler}
                  className="mr-2 "
                  style={{ cursor: "pointer" }}
                >
                  <ClearAll />
                </span>
              )}
              {imagesPreview.map((image, i) => (
                <img
                  src={image}
                  width="55"
                  height="52"
                  alt="Image Priview"
                  className="mt-3 mr-2"
                  key={i}
                />
              ))}
            </div>

            <Button
              id="login_button"
              disabled={loading}
              type="submit"
              variant="contained"
              className="mt-3"
            >
              UPDATE
            </Button>
          </FormContainer>
        </BorderFlowBySpan>
      </FlexCenter>
    </div>
  );
}
