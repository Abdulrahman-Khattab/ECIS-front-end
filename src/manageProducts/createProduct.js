import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, Grid, Typography, Input, Modal } from '@mui/material';
import { useGlobalCreateProductContext } from './createProductContext';
import { useGlobalPrdouctContext } from '../product_page/productContext';
import NavBar from '../general_component/Navbar';
import CartNav from '../cart_Page/cart';
import Footer_section from '../home_page/footer_section';
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

const CreateProduct = () => {
  const {
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
    clearInputs,
    postData,

    setImage,
    modal2,
    modalText,
    handleOpenModal2,
    handleCloseModal2,
    barcode,
    setBarcode,
  } = useGlobalCreateProductContext();

  const {
    uniqueCategory,
    uniqueDepartment,
    uniqueCompany,
    uniqueColors,
    uniqueNames,
    uniqueSellPrices,
    uniqueOriginalPrice,
    uniqueinventory,
    uniqueaverageRating,
    uniqueNumOfReviews,
  } = useGlobalPrdouctContext();

  // BARCODE INFORMATION

  const webcamRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [modal3, setModal3] = useState(false);

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
      setBarcode(scannedCode);
    }
  }, [scannedCode]);

  // END OF BARCODE CODE

  return (
    <Box>
      <Box>
        <Modal open={modal2} onClose={handleCloseModal2}>
          <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
            <Typography textTransform='capitalize' fontSize='1.25rem'>
              {modalText}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                marginTop: '1rem',
              }}
            >
              <Button
                onClick={() => {
                  handleCloseModal2();
                  window.location.reload();
                }}
                variant='contained'
                color='info'
              >
                نعم
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
            <div>{scannedCode && <p> {scannedCode} : باركود </p>}</div>
          </Box>
        </Modal>
        <NavBar
          pages={['products', 'Pricing', 'Blog', 'potato']}
          settings={['Profile', 'Account', 'Dashboard', 'Logout']}
        ></NavBar>
        <CartNav />

        <Box paddingTop='8rem' color='primary.main'>
          <Typography sx={{ textTransform: 'capitalize', fontSize: '1.25rem' }}>
            هذه الصفحة مخصصة فقط للمدير، المشرف، المشغل، والمالك
          </Typography>
          <Typography
            color='warning.main'
            sx={{
              textTransform: 'capitalize',
              fontSize: '1.25rem',
              marginTop: '1rem',
            }}
          >
            all يرجئ عدم اختيار
          </Typography>
        </Box>

        <Grid
          marginTop='2rem'
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={name}
              freeSolo
              options={uniqueNames}
              onChange={(event, newValue) => {
                setName(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='اسم المنتج'
                  required
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setName(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={sellPrice}
              options={uniqueSellPrices}
              freeSolo
              onChange={(event, newValue) => {
                setSellPrice(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='سعر البيع'
                  variant='outlined'
                  required
                  type='number'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setSellPrice(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={originalPrice}
              options={uniqueOriginalPrice}
              freeSolo
              onChange={(event, newValue) => {
                setOriginalPrice(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='سعر الشراء من الشركة المورده'
                  required
                  type='number'
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setOriginalPrice(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={description}
              options={['N/A', 'No description']}
              freeSolo
              onChange={(event, newValue) => {
                setDescription(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='التفاصيل'
                  multiline
                  type='text'
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setDescription(event.target.value);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={category}
              options={uniqueCategory}
              freeSolo
              onChange={(event, newValue) => {
                setCategory(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={category}
                  label='التصنيف'
                  required
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setCategory(event.target.value);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={department}
              options={uniqueDepartment}
              freeSolo
              onChange={(event, newValue) => {
                setDepartment(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='القسم'
                  required
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setDepartment(event.target.value);
                  }}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            width='20%'
            padding='2rem'
          >
            <Autocomplete
              value={company}
              options={uniqueCompany}
              freeSolo
              onChange={(event, newValue) => {
                setCompnay(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='الشركة'
                  required
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setCompnay(event.target.value);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={color}
              options={uniqueColors}
              freeSolo
              onChange={(event, newValue) => {
                setColor(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='اللون'
                  variant='outlined'
                  required
                  margin='dense'
                  onChange={(event, newValue) => {
                    setColor(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={inventory}
              options={uniqueinventory}
              freeSolo
              onChange={(event, newValue) => {
                setInventory(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='عدد القطع'
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setInventory(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={averageRating}
              options={uniqueaverageRating}
              freeSolo
              onChange={(event, newValue) => {
                setAverageRating(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='معدل التقييم'
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setAverageRating(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              value={numOfReviews}
              options={uniqueNumOfReviews}
              freeSolo
              onChange={(event, newValue) => {
                setNumOfReviews(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='عدد المقيمين'
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setNumOfReviews(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Input
              type='file'
              onChange={(event) => {
                const file = event.target.files[0];
                setImage(file);
              }}
              inputProps={{
                accept: 'image/*',
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <TextField
              sx={{ width: '100%' }}
              value={barcode}
              label='باركود '
              variant='outlined'
              margin='dense'
              onChange={(e) => {
                setBarcode(e.target.value);
              }}
            />
            <Button onClick={handleOpenModal3}>شغل ماسح الباركود</Button>
          </Grid>
        </Grid>
        <Button
          sx={{
            display: 'flex',
            margin: 'auto',
            padding: '1rem',
            fontSize: '1rem',
          }}
          variant='contained'
          onClick={() => {
            postData();
          }}
        >
          ادخل المنتج
        </Button>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default CreateProduct;
