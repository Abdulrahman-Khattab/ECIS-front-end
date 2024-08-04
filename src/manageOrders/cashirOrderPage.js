import React from 'react';
import NavBar from '../general_component/Navbar';
//import CartItemTable from './cartItemTable';
//import CartTotalTable from './cartTotalTable';
//import CartTable from './cartTable';
import { Divider, Modal, Typography, Button, Box } from '@mui/material';
//import { useGlobalCartContext } from './cart_context';
import { Link } from 'react-router-dom';
import Footer_section from '../home_page/footer_section';
import { useGlobalUserManagment } from '../userManagment/userManagmentContext';
import CashirTotalPage from './cashirTotalTable';
import CashirTable from './cashirTable';
import CartNav from '../cart_Page/cart';
import { useGlobalCashirContext } from './cashirContext';
import { useState, useEffect, useRef } from 'react';
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

const CashirOrderPage = () => {
  /*const {
    handleCloseModal,
    handleOpenModal,
    modal,
    setModal,
    createOrderRequest,
    paymentURL,
  } = useGlobalCartContext(); */

  const {
    handleOpenModal3,
    handleCloseModal3,
    modal3,
    setBarcode,
    handleCloseModal,
    handleOpenModal,
    modal,
    postCashirOrder,
    modalText,
  } = useGlobalCashirContext();

  const { currentUserInfo } = useGlobalUserManagment();

  const { _id: id, name, role, email } = currentUserInfo;
  // BARCODE INFORMATION

  const webcamRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);

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
      setBarcode(scannedCode);
    }
  }, [scannedCode]);

  // END OF BARCODE CODE

  return (
    <>
      <Modal open={modal} onClose={handleCloseModal}>
        <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
          <Typography textTransform='capitalize' fontSize='1.25rem'>
            {modalText}
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
              color='success'
              onClick={() => {
                handleCloseModal();
              }}
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
          <div>{scannedCode && <p> {scannedCode} : الباركود </p>}</div>
        </Box>
      </Modal>
      <NavBar
        pages={['products', 'Pricing', 'Blog', 'potato']}
        settings={['Profile', 'Account', 'Dashboard', 'Logout']}
      ></NavBar>
      <CartNav />
      <CashirTable />{' '}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          sx={{ textAlign: 'center', alignSelf: 'center' }}
          onClick={() => {
            handleOpenModal3();
          }}
        >
          افتح قارئ الباركود
        </Button>
      </Box>
      <Divider sx={{ marginTop: '4rem', marginBottom: '4rem' }} />
      <CashirTotalPage />
      {/*<Modal open={modal} onClose={handleCloseModal}>
        <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
          {id === undefined ? (
            <Box>
              {' '}
              <Typography textTransform='capitalize' fontSize='1.25rem'>
                قم بتسجيل الدخول لاكمال عملية التسوق
              </Typography>
              <Box
                sx={{
                  marginTop: '1rem',
                }}
              >
                <Link to='/تسجيل الدخول' style={{ textDecoration: 'none' }}>
                  <Button
                    variant='contained'
                    color='info'
                    onClick={() => {
                      //  handleCloseModal();
                    }}
                  >
                    تسجيل الدخول
                  </Button>
                </Link>
              </Box>{' '}
            </Box>
          ) : (
            <Box>
              {' '}
              <Typography textTransform='capitalize' fontSize='1.25rem'>
                قم بأكمال عملية الدفع
              </Typography>
              <Box
                sx={{
                  marginTop: '1rem',
                }}
              >
                <Link to={'homepage'} style={{ textDecoration: 'none' }}>
                  <Button
                    variant='contained'
                    color='info'
                    onClick={() => {
                      //  handleCloseModal();
                    }}
                  >
                    نعم
                  </Button>
                </Link>
              </Box>{' '}
            </Box>
          )}
        </Box>
                  </Modal> */}
      <Footer_section />
    </>
  );
};

export default CashirOrderPage;
