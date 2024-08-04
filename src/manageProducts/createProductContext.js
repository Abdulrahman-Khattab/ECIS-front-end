import React, { createContext } from 'react';
import { useState, useEffect, useContext } from 'react';

const CreateProductContext = createContext();
const url = 'http://localhost:5000/shop/v1/api/products';

const CreateProductContextProvider = ({ children }) => {
  const columns = [
    { id: '_id', label: 'معرف المنتج', minWidth: 170 },
    { id: 'name', label: 'اسم المنتج', minWidth: 100 },
    {
      id: 'barcode',
      label: 'الباركود',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'sellPrice',
      label: 'سعر البيع',
      minWidth: 170,
      align: 'right',
      format: (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      },
    },
    {
      id: 'originalPrice',
      label: 'سعر الشراء من الجهة المورده',
      minWidth: 170,
      align: 'right',
      format: (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      },
    },
    {
      id: 'category',
      label: 'التصنيف',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'department',
      label: 'القسم',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'company',
      label: 'الشركة',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'color',
      label: 'اللون',
      minWidth: 120,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'featured',
      label: 'مميز',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'freeShipping',
      label: 'توصيل مجاني',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'inventory',
      label: 'المخزون',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'averageRating',
      label: 'معدل التقييمات',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'numOfReviews',
      label: 'عدد المقيمين',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },

    {
      id: 'user',
      label: 'معرف الذي ادخل المنتج',
      minWidth: 240,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },

    {
      id: 'productExpirationDate',
      label: 'تاريخ انتهاء الصلاحية',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'productDateEntery',
      label: 'تاريخ الادخال',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'productUpdateDate',
      label: 'تاريخ التعديل',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  // MODAL States and functions
  const [modal2, setModal2] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleOpenModal2 = () => {
    setModal2(true);
  };
  const handleCloseModal2 = () => {
    setModal2(false);
  };

  // Get ALL products States .
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // SingleProducts States
  const [productID, setProductID] = useState('');
  const [productInfo, setProductInfo] = useState({});

  // Delete product

  const [modal, setModal] = useState(false);
  const [deleteID, setDeleteID] = useState('');

  // Create product states

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [company, setCompnay] = useState('');
  const [sellPrice, setSellPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');
  const [inventory, setInventory] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [numOfReviews, setNumOfReviews] = useState(0);
  const [image, setImage] = useState(null);
  const [barcode, setBarcode] = useState(0);

  // Update products States
  const [updateID, setUpdateID] = useState('');
  const [nameUpdate, setNameUpdate] = useState('');
  const [colorUpdate, setColorUpdate] = useState('');
  const [companyUpdate, setCompnayUpdate] = useState('');
  const [sellPriceUpdate, setSellPriceUpdate] = useState(0);
  const [originalPriceUpdate, setOriginalPriceUpdate] = useState(0);

  const [descriptionUpdate, setDescriptionUpdate] = useState('');
  const [categoryUpdate, setCategoryUpdate] = useState('');
  const [departmentUpdate, setDepartmentUpdate] = useState('');
  const [inventoryUpdate, setInventoryUpdate] = useState(0);
  const [averageRatingUpdate, setAverageRatingUpdate] = useState(0);
  const [numOfReviewsUpdate, setNumOfReviewsUpdate] = useState(0);
  const [imageUpdate, setImageUpdate] = useState(null);
  const [barcodeUpdate, setBarcodeUpdate] = useState(0);

  // End of Create product states

  // get single product modal states
  const [productModal, setProductModal] = useState(false);
  const [singleProductBarcode, setSingleProductBarcode] = useState('');
  // Special modal for barcode reader in product Information page
  const [modal3, setModal3] = useState(false);

  const [showSingleProductInfo, setShowSingleProductInfo] = useState({
    _id: 'N/A',
    barcode: 'N/A',
    sellPrice: 'N/A',
    originalPrice: 'N/A',
    description: 'N/A',
    category: 'N/A',
    department: 'N/A',
    company: 'N/A',
    colors: 'N/A',
    featured: 'N/A',
    freeShipping: 'N/A',
    inventory: 'N/A',
    averageRating: 'N/A',
    numOfReviews: 'N/A',
    user: 'N/A',
    productDate: 'N/A',
    productDateEntery: 'N/A',
    productExpirationDate: 'N/A',
    productUpdateDate: 'N/A',
  });

  const product = {
    name,
    color,
    company,
    sellPrice,
    originalPrice,
    description,
    category,
    department,
    inventory,
    averageRating,
    numOfReviews,
    barcode,
  };

  const updateProduct = {
    name: nameUpdate,
    color: colorUpdate,
    company: companyUpdate,
    sellPrice: sellPriceUpdate,
    originalPrice: originalPriceUpdate,
    description: descriptionUpdate,
    category: categoryUpdate,
    department: departmentUpdate,
    inventory: inventoryUpdate,
    averageRating: averageRatingUpdate,
    numOfReviews: numOfReviewsUpdate,
    image: imageUpdate,
    barcode: barcodeUpdate,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleProductIDChange = (e) => {
    setProductID(e.target.value);
  };

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleDeleteIdChange = (e) => {
    setDeleteID(e.target.value);
  };

  const handleUpdateIDChange = (e) => {
    setUpdateID(e.target.value);
  };

  const handleCloseProductModal = () => {
    setProductModal(false);
  };
  const handleOpenProductModal = () => {
    setProductModal(true);
  };

  // Create product request
  const postData = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      for (const key in product) {
        formData.append(key, product[key]);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          // No 'Content-Type' header needed when using FormData
        },
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setModalText('Product has been created successfully');
        setModal2(true);
      } else {
        console.error('Error:', response.statusText);
        setModalText(`Error:${response.statusText}`);
        setModal2(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // GET PRODUCTS
  const getAllProductRequest = async () => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setRows(data);
      } else {
        console.log(response.statusText);
        setModalText(`Error:${response.statusText}`);
        setModal2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Get single Product

  const getSinglePrdouctRequest = async () => {
    const singleProductURL = `http://localhost:5000/shop/v1/api/products/${productID}`;
    try {
      const response = await fetch(singleProductURL);

      if (response.ok) {
        const data = await response.json();
        setProductInfo(data);
      } else {
        console.log(response.statusText);
        setModalText(`Error:${response.statusText}`);
        setModal2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //  // Get single Product while updating information

  const getSinglePrdouuctRequestUpdateInformation = async () => {
    const singleProdctURL = `http://localhost:5000/shop/v1/api/products/${updateID}`;
    try {
      const response = await fetch(singleProdctURL);

      if (response.ok) {
        const data = await response.json();
        setNameUpdate(data.name);
        setCompnayUpdate(data.company);
        setDescriptionUpdate(data.description);
        setDepartmentUpdate(data.department);
        setColorUpdate(data.color);

        setInventoryUpdate(data.inventory);
        setAverageRatingUpdate(data.averageRating);
        setNumOfReviewsUpdate(data.numOfReviews);
        setSellPriceUpdate(data.sellPrice);
        setOriginalPriceUpdate(data.originalPrice);
        setCategoryUpdate(data.category);
        setBarcodeUpdate(data.barcode);
      } else {
        console.log(response.statusText);
        setModalText(`Error:${response.statusText}`);
        setModal2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE PRODUCT

  const deleteProductRequest = async () => {
    const deleteProductURL = `http://localhost:5000/shop/v1/api/products/${deleteID}`;
    try {
      const response = await fetch(deleteProductURL, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // UPDATE PRODUCTS

  // update product request
  const updateProductRequest = async () => {
    const updateProductURL = `http://localhost:5000/shop/v1/api/products/${updateID}`;

    try {
      const formData = new FormData();
      if (imageUpdate !== null) {
        formData.append('image', imageUpdate);
      }

      for (const key in updateProduct) {
        const value = updateProduct[key];

        if (
          value !== '' &&
          value !== null &&
          value !== 0 &&
          !Array.isArray(value) &&
          typeof value !== 'object'
        ) {
          formData.append(key, value);
        }
      }

      const response = await fetch(updateProductURL, {
        method: 'PATCH',
        headers: {
          // No 'Content-Type' header needed when using FormData
        },
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setModalText(`Product has been updated`);
        setModal2(true);
      } else {
        console.error('Error:', response.statusText);
        setModalText(`Error:${response.statusText}`);
        setModal2(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // GET SINGLE PRODUCT REQUEST USING BARCODE

  const getSinglePrdouctRequestUsingBarcode = async () => {
    const singleProductURL = `http://localhost:5000/shop/v1/api/products/barcode/${singleProductBarcode}`;
    try {
      const response = await fetch(singleProductURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setShowSingleProductInfo(data);
        setProductModal(true);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearInputs = () => {
    setName('');
    setColor('');
    setCompnay('');
    setSellPrice(0);
    setOriginalPrice(0);
    setDescription('');
    setCategory('');
    setDepartment('');
    setInventory(0);
    setAverageRating(0);
    setNumOfReviews(0);
  };

  useEffect(() => {
    getAllProductRequest();
  }, []);

  useEffect(() => {
    getSinglePrdouctRequest();
  }, [productID]);

  useEffect(() => {
    getSinglePrdouctRequestUsingBarcode();
  }, [singleProductBarcode]);

  return (
    <CreateProductContext.Provider
      value={{
        name,
        setName,
        color,
        setColor,
        company,
        setCompnay,
        sellPrice,
        setSellPrice,
        originalPrice,
        setOriginalPrice,
        description,
        setDescription,
        category,
        setCategory,
        department,
        setDepartment,
        inventory,
        setInventory,
        averageRating,
        setAverageRating,
        numOfReviews,
        setNumOfReviews,
        image,
        setImage,
        postData,
        clearInputs,
        columns,
        rows,
        setRows,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        productID,
        setProductID,
        handleProductIDChange,
        productInfo,
        modal,

        deleteID,
        setDeleteID,
        handleDeleteIdChange,
        handleOpenModal,
        handleCloseModal,
        deleteProductRequest,
        nameUpdate,
        colorUpdate,
        companyUpdate,
        sellPriceUpdate,
        originalPriceUpdate,
        descriptionUpdate,
        categoryUpdate,
        departmentUpdate,
        inventoryUpdate,
        averageRatingUpdate,
        numOfReviewsUpdate,
        imageUpdate,
        setNameUpdate,
        setColorUpdate,
        setCompnayUpdate,
        setSellPriceUpdate,
        setOriginalPriceUpdate,
        setDescriptionUpdate,
        setCategoryUpdate,
        setDepartmentUpdate,
        setInventoryUpdate,
        setAverageRatingUpdate,
        setNumOfReviewsUpdate,
        setImageUpdate,
        handleUpdateIDChange,
        updateID,
        setUpdateID,
        updateProductRequest,

        modal2,
        modalText,
        handleOpenModal2,
        handleCloseModal2,
        getSinglePrdouuctRequestUpdateInformation,
        barcode,
        setBarcode,
        barcodeUpdate,
        setBarcodeUpdate,
        handleCloseProductModal,
        handleOpenProductModal,
        productModal,
        setProductModal,
        showSingleProductInfo,
        setShowSingleProductInfo,
        singleProductBarcode,
        setSingleProductBarcode,
        modal3,
        setModal3,
      }}
    >
      {children}
    </CreateProductContext.Provider>
  );
};

const useGlobalCreateProductContext = () => {
  return useContext(CreateProductContext);
};

export {
  useGlobalCreateProductContext,
  CreateProductContext,
  CreateProductContextProvider,
};
