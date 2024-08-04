/*import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { BarcodeFormat, BrowserBarcodeReader, Exception } from '@zxing/library';

const BarcodeScanner = () => {
  const webcamRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);

  const handleCapture = async () => {
    const video = webcamRef.current.video;

    // Check if the video element has loaded and has valid dimensions
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      try {
        const codeReader = new BrowserBarcodeReader();
        const imageElement = document.createElement('img');
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

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        videoConstraints={{ facingMode: 'environment' }} // Use 'user' for front camera
      />
      <button onClick={handleCapture}>Capture</button>
      {scannedCode && <p>Scanned Code: {scannedCode}</p>}
    </div>
  );
};

export default BarcodeScanner; */

/*import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BrowserBarcodeReader, Exception } from '@zxing/library';
import { Button, Modal, Box, Typography } from '@mui/material';
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

const BarcodeScanner = () => {
  const webcamRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [modal, setModal] = useState(false);
  const handleCloseModal = () => {
    setModal(false);
  };
  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCapture = async () => {
    const video = webcamRef.current && webcamRef.current.video;

    // Check if the video element has loaded and has valid dimensions
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      try {
        const codeReader = new BrowserBarcodeReader();
        const imageElement = document.createElement('img');
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

  useEffect(() => {
    const captureFrame = () => {
      handleCapture();
      requestAnimationFrame(captureFrame);
    };

    captureFrame(); // Start capturing frames when the component mounts

    return () => {
      // Cleanup when the component unmounts
      setScannedCode(null);
    };
  }, []); // Run the effect only once when the component mounts

  return (
    <div>
      <Modal open={modal} onClose={handleCloseModal}>
        <Box
          sx={{ ...style, width: '300px', height: 300, textAlign: 'center' }}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            videoConstraints={{ facingMode: 'environment' }} // Use 'user' for front camera
            onUserMedia={() => console.log('Webcam is ready')}
            style={{ width: '300px', maxHeight: '300px' }} // Set the width here
          />
          <div>{scannedCode && <p>Scanned Code: {scannedCode}</p>}</div>
        </Box>
      </Modal>
      <Button onClick={handleOpenModal}>open Modal</Button>
    </div>
  );
};

export default BarcodeScanner; */

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BrowserBarcodeReader, Exception } from '@zxing/library';
import { Button, Modal, Box } from '@mui/material';

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

const BarcodeScanner = () => {
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

      setTimeout(captureFrame, 100); // Adjust the delay as needed
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

  return (
    <Box>
      <Button onClick={handleOpenModal3}>Open Modal</Button>
    </Box>
  );
};

export default BarcodeScanner;
