import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await API.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ color: "#111827" }}>Products</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          backgroundColor: "white"
        }}
      >

        <thead>

          <tr>
            <th>SKU</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>MRP</th>
            <th>Availability</th>
          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td>{product.sku_id}</td>
              <td>{product.title}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.mrp}</td>
              <td>{product.availability}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Products;