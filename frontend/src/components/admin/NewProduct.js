import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import Sidebar from "./Sidebar";
import { FormContainer } from "../styledComponents/Form";
import { FlexCenter } from "../styledComponents/FlexBetween";
import {
  BorderFlowBySpan,
  Spans,
} from "../styledComponents/AnimationComponent";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [MRP, setMRP] = useState("");
  const [description, setDescription] = useState("");
  const [aboutThisItem, setAboutThisItem] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [imagesUrl, setImagesUrl] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isProductCreated, error } = useSelector(
    (state) => state.productState
  );

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
    formData.append("name", name);
    formData.append("price", price);
    formData.append("MRP", MRP);

    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("aboutThisItem", aboutThisItem);
    formData.append("seller", seller);
    formData.append("category", category);
    formData.append("imagesUrl", imagesUrl);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createNewProduct(formData));
  };
  useEffect(() => {
    if (isProductCreated) {
      toast("Product Created Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductCreated()),
      });
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
  }, [isProductCreated, error, dispatch]);

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

  return (
    <div>
      <Box>
        <Sidebar />
      </Box>
      <FlexCenter width="100%">
        <BorderFlowBySpan mt="20px">
          <Spans />
          <FormContainer
            onSubmit={sumbitHandler}
            encType="multipart/form-data"
            component="form"
            p="15px"
            m="4px"
          >
            <h1 className="mb-4">New Product</h1>

            <div>
              <TextField
                sx={{ width: "100%" }}
                label="Name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <TextField
                required
                sx={{ width: "100%" }}
                type="number"
                label="Price"
                variant="standard"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="">
              <TextField
                required
                sx={{ width: "100%" }}
                type="number"
                label="MRP"
                variant="standard"
                value={MRP}
                onChange={(e) => setMRP(e.target.value)}
              />
            </div>

            <div>
              <TextField
                required
                sx={{ width: "100%" }}
                label="Description"
                multiline
                variant="standard"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="">
              <TextField
                required
                sx={{ width: "100%" }}
                label="About This Item"
                multiline
                rows={5}
                variant="standard"
                value={aboutThisItem}
                onChange={(e) => setAboutThisItem(e.target.value)}
              />
            </div>

            <div>
              <TextField
                required
                sx={{ width: "100%" }}
                select
                label="Category"
                defaultValue="Accessories"
                helperText="Please select Product Category"
                variant="standard"
                onChange={(e) => setCategory(e.target.value)}
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
                required
                sx={{ width: "100%" }}
                type="number"
                label="Stock"
                variant="standard"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <TextField
                required
                sx={{ width: "100%" }}
                label="Seller Name"
                variant="standard"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                label="images Url use ',' to seperate"
                variant="standard"
                value={imagesUrl}
                onChange={(e) => setImagesUrl(e.target.value)}
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
              variant="contained"
              id="login_button"
              disabled={loading}
              type="submit"
              className="pt-5"
            >
              CREATE
            </Button>
          </FormContainer>
        </BorderFlowBySpan>
      </FlexCenter>
    </div>
  );
}
