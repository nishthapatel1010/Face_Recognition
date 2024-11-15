// src/pages/Attendance.js
import React, { useRef, useState } from 'react';
import { Button, Typography, message, Card } from 'antd';
import Webcam from 'react-webcam'; // Ensure this package is installed

const { Title } = Typography;

const Attendance = () => {
  const webcamRef = useRef(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      recognizeFace(imageSrc);
    }
  }, [webcamRef]);

  const recognizeFace = (image) => {
    setIsRecognizing(true);
    
    // Simulating face recognition logic
    setTimeout(() => {
      const success = Math.random() > 0.5; // Simulate success or failure randomly
      if (success) {
        message.success("Attendance marked successfully!");
        setAttendanceStatus("You are marked present.");
      } else {
        message.error("Face recognition failed, please try again.");
        setAttendanceStatus("Attendance not marked. Please try again.");
      }
      setIsRecognizing(false);
    }, 2000); // Simulating network request delay
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Card style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        <Title level={3}>Mark Your Attendance</Title>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
        />
        <div style={{ marginTop: '20px' }}>
          <Button 
            type="primary" 
            onClick={capture} 
            loading={isRecognizing}
            disabled={isRecognizing}
          >
            {isRecognizing ? 'Recognizing...' : 'Capture Face'}
          </Button>
        </div>
        {attendanceStatus && (
          <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
            {attendanceStatus}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Attendance;
