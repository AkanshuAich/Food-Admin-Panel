// // client/src/pages/ProductForm.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

// function ProductForm() {
//   const [product, setProduct] = useState({
//     name: '',
//     type: '',
//     price: '',
//     image: '',
//     description: '',
//     nutritionalInfo: {},
//   });

//   const { id } = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     if (id) {
//       fetchProduct();
//     }
//   }, [id]);

//   const fetchProduct = async () => {
//     const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//     setProduct(response.data);
//   };

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (id) {
//       await axios.patch(`http://localhost:5000/api/products/${id}`, product);
//     } else {
//       await axios.post('http://localhost:5000/api/products', product);
//     }
//     history.push('/');
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" style={{ margin: '20px 0' }}>
//         {id ? 'Edit Product' : 'Add Product'}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           margin="normal"
//           name="name"
//           label="Name"
//           value={product.name}
//           onChange={handleChange}
//           required
//         />
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Type</InputLabel>
//           <Select name="type" value={product.type} onChange={handleChange} required>
//             <MenuItem value="fruit">Fruit</MenuItem>
//             <MenuItem value="vegetable">Vegetable</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           fullWidth
//           margin="normal"
//           name="price"
//           label="Price"
//           type="number"
//           value={product.price}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="image"
//           label="Image URL"
//           value={product.image}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="description"
//           label="Description"
//           multiline
//           rows={4}
//           value={product.description}
//           onChange={handleChange}
//         />
//         <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
//           {id ? 'Update' : 'Add'} Product
//         </Button>
//       </form>
//     </Container>
//   );
// }

// export default ProductForm;
// client/src/pages/ProductForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    price: '',
    quantity: '',
    image: '',
    description: '',
    nutritionalInfo: {},
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.patch(`http://localhost:5000/api/products/${id}`, product);
      } else {
        await axios.post(`http://localhost:5000/api/products`, product);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

    return (
    <Container maxWidth="sm">
      <Typography variant="h4" style={{ margin: '20px 0' }}>
        {id ? 'Edit Product' : 'Add Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select name="type" value={product.type} onChange={handleChange} required>
            <MenuItem value="fruit">Fruit</MenuItem>
            <MenuItem value="vegetable">Vegetable</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          name="price"
          label="Price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="quantity"
          label="Quantity"
          type="number"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="image"
          label="Image URL"
          value={product.image}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={product.description}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          {id ? 'Update' : 'Add'} Product
        </Button>
      </form>
    </Container>
  );

}

export default ProductForm;