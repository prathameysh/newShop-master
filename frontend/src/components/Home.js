import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsCat,
  getProductsOff,
} from "../actions/productActions";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

const ProductStructure = ({ products, title }) => {
  return (
    <>
      <h3 className="mt-3 mb-1">{title}</h3>
      <div className="products">
        {products.map((product, i) => (
          <Product key={i} product={product} />
        ))}
      </div>
    </>
  );
};

export default function Home() {
  const dispatch = useDispatch();
  const { products, productsOff, productsCat, loading, error } = useSelector(
    (state) => state.productsState
  );
  const [currentPage] = useState(1);
  const [resPerPage] = useState(6);
  const [currentPageOff] = useState(1);
  const [resPerPageOff] = useState(6);
  const [off] = useState(17);

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(null, null, null, null, currentPage, resPerPage));
    dispatch(
      getProductsOff(null, null, null, null, currentPageOff, resPerPageOff, off)
    );
    dispatch(
      getProductsCat(null, null, "Electronics", null, currentPage, resPerPage)
    );
  }, [
    error,
    dispatch,
    currentPage,
    resPerPage,
    currentPageOff,
    resPerPageOff,
    off,
  ]);

  return (
    <Box width="100%">
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Buy Best Products"} />
          {products && (
            <ProductStructure products={products} title="Latest Products" />
          )}
          {productsOff && (
            <ProductStructure
              products={productsOff}
              title={`More than ${off}% off`}
            />
          )}
          {productsCat && (
            <ProductStructure
              products={productsCat}
              title="New Electronic Gadgets"
            />
          )}
        </>
      )}
    </Box>
  );
}
