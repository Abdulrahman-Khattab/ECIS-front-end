import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, TextField, Button, Modal, Typography } from '@mui/material';
import { useGlobalCreateProductContext } from './createProductContext';
import NavBar from '../general_component/Navbar';
import { Link } from 'react-router-dom';
import CartNav from '../cart_Page/cart';
import Footer_section from '../home_page/footer_section';
import SingleProductInformation from './SinglePrdouctInformation';
import { useRef, useState, useEffect } from 'react';

import Webcam from 'react-webcam';
import { BrowserBarcodeReader, Exception } from '@zxing/library';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const AllProductInformation = () => {
  const {
    columns,
    rows,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    setPrdouctID,
    productID,
    handleProductIDChange,
    modal,
    deleteID,
    setDeleteID,
    handleDeleteIdChange,
    handleOpenModal,
    handleCloseModal,
    deleteProductRequest,
    handleUpdateIDChange,
    updateID,
    setUpdateID,
    getSinglePrdouuctRequestUpdateInformation,
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
  } = useGlobalCreateProductContext();

  const {
    _id: productShowID,
    barcode: productShowbarcode,
    sellPrice: producShowtsellPrice,
    originalPrice: productShoworiginalPrice,

    category: productShowcategory,
    department: productShowdepartment,
    company: productShowcompany,
    color: productShowcolors,
    featured: productShowfeatured,
    freeShipping: productShowfreeShipping,
    inventory: productShowinventory,
    averageRating: productShowaverageRating,
    numOfReviews: productShownumOfReviews,
    user: producShowtuser,
    productDate: productShowDate,
    productDateEntery: productShowDateEntery,
    productExpirationDate: productShowExpirationDate,
    productUpdateDate: productShowUpdateDate,
  } = showSingleProductInfo;

  // BARCODE INFORMATION

  const webcamRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);

  const handleCloseModal3 = () => {
    setModal3(false);
  };

  const handleOpenModal3 = () => {
    setModal3(true);
  };

  useEffect(() => {
    let frameBuffer = [];
    const batchSize = 5; // Adjust the batch size as needed

    const captureFrame = () => {
      handleCapture();

      // Check if webcamRef.current is not null before attempting to call getScreenshot
      if (webcamRef.current) {
        frameBuffer.push(webcamRef.current.getScreenshot());
      }

      if (frameBuffer.length >= batchSize) {
        processFrames(frameBuffer);
        frameBuffer = [];
      }

      setTimeout(captureFrame, 20); // Adjust the delay as needed
    };

    const processFrames = async (frames) => {
      // Process frames concurrently
      const codeReader = new BrowserBarcodeReader();
      const results = await Promise.all(
        frames.map(async (frame) => {
          const imageElement = new Image();
          imageElement.src = frame;
          try {
            const codeResult = await codeReader.decodeFromImageElement(
              imageElement
            );
            return codeResult ? codeResult.getText() : null;
          } catch (error) {
            if (error instanceof Exception) {
              console.error('Error decoding barcode:', error.message);
            }
            return null;
          }
        })
      );

      const validResults = results.filter((result) => result !== null);
      if (validResults.length > 0) {
        setScannedCode(validResults[0]); // Use the first valid result
      }
    };

    captureFrame(); // Start capturing frames when the component mounts

    return () => {
      // Cleanup when the component unmounts
      setScannedCode(null);
    };
  }, []); // Run the effect only once when the component mounts

  const handleCapture = async () => {
    const video = webcamRef.current && webcamRef.current.video;

    // Check if the video element has loaded and has valid dimensions
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const resizeFactor = 0.5; // Adjust the resize factor as needed
      canvas.width = video.videoWidth * resizeFactor;
      canvas.height = video.videoHeight * resizeFactor;
      ctx.drawImage(
        video,
        0,
        0,
        video.videoWidth,
        video.videoHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      try {
        const codeReader = new BrowserBarcodeReader();
        const imageElement = new Image();
        imageElement.src = canvas.toDataURL(); // Convert canvas to data URL
        const codeResult = await codeReader.decodeFromImageElement(
          imageElement
        );

        if (codeResult) {
          setScannedCode(codeResult.getText());
        }
      } catch (error) {
        if (error instanceof Exception) {
          console.error('Error decoding barcode:', error.message);
        }
      }
    }
  };

  //CLOSE BARCODE READER WHEN IT'S  SCANNED
  useEffect(() => {
    // Add logic to close modal when scannedCode is updated
    if (scannedCode) {
      handleCloseModal3();
      setSingleProductBarcode(scannedCode);
    }
  }, [scannedCode]);

  // END OF BARCODE CODE

  return (
    <Box>
      <Box>
        <Modal open={modal} onClose={handleCloseModal}>
          <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
            <Typography textTransform='capitalize' fontSize='1.25rem'>
              هل انت متأكد من انك تريد حذف هذا المنتج
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                textAlign: 'center',
              }}
            >
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  deleteProductRequest();
                  handleCloseModal();
                  setDeleteID('');
                  window.location.reload();
                }}
              >
                نعم
              </Button>
              <Button
                onClick={() => {
                  handleCloseModal();
                }}
                variant='contained'
                color='success'
              >
                لا
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={modal3} onClose={handleCloseModal3}>
          <Box
            sx={{
              ...style,
              width: '300px',
              height: 300,
              textAlign: 'center',
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              videoConstraints={{ facingMode: 'environment' }}
              onUserMedia={() => console.log('Webcam is ready')}
              style={{ width: '300px', maxHeight: '300px' }}
            />
            <div>{scannedCode && <p> {scannedCode} : الباركود </p>}</div>
          </Box>
        </Modal>

        <Modal open={productModal} onClose={handleCloseProductModal}>
          <Box
            sx={{
              ...style2,
              width: '800px',
              height: '600px',
              textAlign: 'center',
              textTransform: 'capitalize',
              fontSize: '1rem',
              display: 'flex',
            }}
          >
            <Box textAlign='left' sx={{ width: '50%' }}>
              {' '}
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowID} : معرف المنتج
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(productShoworiginalPrice)}
                : سعر الشراء من الجهة الموردة{' '}
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(producShowtsellPrice)}
                : سعر البيع{' '}
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowExpirationDate} : تاريخ انتهاء الصلاحية
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowinventory} : المخزون
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowbarcode}: باركود
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowaverageRating} : معدل التقييمات
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShownumOfReviews} : عدد المقيمين
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {producShowtuser} : معرف الذي ادخل المنتج
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowcategory} : التصنيف
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowcompany} : الشركة
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowdepartment} : القسم
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowcolors} : اللون
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowExpirationDate} : تاريخ انتهاء الصلاحية
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowDateEntery} : تاريخ الادخال
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {productShowUpdateDate} : تاريخ التحديث
              </Typography>
            </Box>
            <Box sx={{ width: '50%' }}>
              <img
                style={{ width: '80%', height: '100%' }}
                src={showSingleProductInfo.image}
                alt=''
              />
            </Box>
          </Box>
        </Modal>

        <NavBar
          pages={['products', 'Pricing', 'Blog', 'potato']}
          settings={['Profile', 'Account', 'Dashboard', 'Logout']}
        ></NavBar>
        <CartNav />
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '5rem' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={row.code}
                        onClick={async () => {
                          await setShowSingleProductInfo(row);
                          setProductModal(true);
                        }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box>
          {/*see single Product  with barcode  */}
          <Box sx={{ marginTop: '2rem' }}>
            <TextField
              variant='outlined'
              size='small'
              label='معرف المنتج '
              sx={{ width: '25%' }}
              value={singleProductBarcode}
              onChange={(e) => {
                setSingleProductBarcode(e.target.value);
              }}
            />

            <Button
              variant='contained'
              onClick={() => {
                handleOpenModal3();
              }}
            >
              شغل ماسح الباركود{' '}
            </Button>
          </Box>
          {/*see single Product   */}
          <Box sx={{ marginTop: '2rem' }}>
            <TextField
              variant='outlined'
              size='small'
              value={deleteID}
              onChange={handleDeleteIdChange}
              label='معرف المنتج '
              sx={{ width: '25%' }}
            />{' '}
            <Button variant='contained' color='error' onClick={handleOpenModal}>
              حذف المنتج{' '}
            </Button>
          </Box>
          {/*see single Product   */}
          <Box sx={{ marginTop: '2rem' }}>
            <TextField
              variant='outlined'
              size='small'
              label='معرف المنتج '
              sx={{ width: '25%' }}
              value={updateID}
              onChange={handleUpdateIDChange}
            />
            <Link
              to={`/تعديل المنتج/${updateID}`}
              style={{ textDecoration: 'none ' }}
            >
              {' '}
              <Button
                color='warning'
                variant='contained'
                onClick={async () => {
                  await getSinglePrdouuctRequestUpdateInformation();
                }}
              >
                تعديل المنتج{' '}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default AllProductInformation;
