import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Typography
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const tableStyle = {
    tableLayout: 'fixed',
    width: '100%'
  };

  const cellStyle = {
    padding: '8px 10px',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const imageStyle = {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    display: 'block'
  };

  return (
    <Container>
      <Typography variant="h5" style={{ margin: '20px 0' }}>
        Product List
      </Typography>
      <TableContainer component={Paper}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
            <TableCell style={{...cellStyle, width: '40px'}}>Image</TableCell>
              <TableCell style={{...cellStyle, width: '15%'}}>Name</TableCell>
              <TableCell style={{...cellStyle, width: '10%'}}>Type</TableCell>
              <TableCell style={{...cellStyle, width: '10%'}}>Price</TableCell>
              <TableCell style={{...cellStyle, width: '10%'}}>Quantity</TableCell>
              <TableCell style={{...cellStyle, width: '20%'}}>Description</TableCell>
              <TableCell style={{...cellStyle, width: '15%'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell style={{...cellStyle, width: '40px'}}>
                  <img src={product.image} alt={product.name} style={imageStyle} />
                </TableCell>
                <TableCell style={cellStyle}>{product.name}</TableCell>
                <TableCell style={cellStyle}>{product.type}</TableCell>
                <TableCell style={cellStyle}>₹ {product.price.toFixed(2)}</TableCell>
                <TableCell style={cellStyle}>{product.quantity}</TableCell>
                <TableCell style={cellStyle}>{product.description}</TableCell>
                <TableCell style={cellStyle}>
                  <Button 
                    component={Link} 
                    to={`/edit/${product._id}`} 
                    startIcon={<Edit />}
                    size="small"
                    style={{marginRight: '5px', padding: '2px 5px', fontSize: '0.7rem'}}
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDelete(product._id)} 
                    startIcon={<Delete />} 
                    color="secondary"
                    size="small"
                    style={{padding: '2px 5px', fontSize: '0.7rem'}}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ProductList;