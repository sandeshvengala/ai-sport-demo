
import React, { useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';

function VideoAnalysis() {
  const videoRef = useRef(null);
  const [result, setResult] = useState('');
  const [processing, setProcessing] = useState(false);
  const [testType, setTestType] = useState('situps');
  const [refHeightCm, setRefHeightCm] = useState(100); // default 100cm
  const [refHeightPx, setRefHeightPx] = useState(0);

  // Skill test selection
  const handleTestChange = (e) => {
    setTestType(e.target.value);
    setResult('');
  };

  // Reference object pixel height input
  const handleRefHeightPxChange = (e) => {
    setRefHeightPx(Number(e.target.value));
  };
  const handleRefHeightCmChange = (e) => {
    setRefHeightCm(Number(e.target.value));
  };

  // Basic pose estimation and rep counting for sit-ups, vertical jump, shuttle run (mock logic for jump/run)
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
      setResult('Analyzing video...');
      setProcessing(true);

      videoRef.current.onloadeddata = async () => {
        if (testType === 'situps') {
          // ...existing sit-up pose estimation logic...
          const pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
          });
          pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          });
          let repCount = 0;
          let lastHipY = null;
          let goingUp = false;
          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const ctx = canvas.getContext('2d');
          for (let t = 0; t < videoRef.current.duration; t += 0.2) {
            videoRef.current.currentTime = t;
            await new Promise(res => videoRef.current.onseeked = res);
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            await new Promise((resolve) => {
              function handleResults(results) {
                if (results.poseLandmarks) {
                  const hipY = results.poseLandmarks[23].y;
                  if (lastHipY !== null) {
                    if (!goingUp && hipY < lastHipY - 0.05) {
                      goingUp = true;
                    }
                    if (goingUp && hipY > lastHipY + 0.05) {
                      repCount++;
                      goingUp = false;
                    }
                  }
                  lastHipY = hipY;
                }
                resolve();
              }
              pose.onResults = handleResults;
              pose.send({image: canvas});
            });
          }
          setResult(`Detected: ${repCount} sit-ups`);
        } else if (testType === 'verticaljump') {
          // Refactored vertical jump analysis using ankle Y position
          const pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
          });
          pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          });
          let minAnkleY = null;
          let maxAnkleY = null;
          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const ctx = canvas.getContext('2d');
          const handleResults = (results, resolve) => {
            if (results.poseLandmarks) {
              // Use left ankle (landmark 27)
              const ankleY = results.poseLandmarks[27].y;
              if (minAnkleY === null || ankleY < minAnkleY) minAnkleY = ankleY;
              if (maxAnkleY === null || ankleY > maxAnkleY) maxAnkleY = ankleY;
            }
            resolve();
          };
          for (let t = 0; t < videoRef.current.duration; t += 0.2) {
            videoRef.current.currentTime = t;
            await new Promise(res => videoRef.current.onseeked = res);
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            await new Promise((resolve) => {
              pose.onResults = (results) => handleResults(results, resolve);
              pose.send({image: canvas});
            });
          }
          // Estimate jump height (difference in normalized Y, calibrated to cm)
          const jumpHeightPx = ((maxAnkleY - minAnkleY) * canvas.height);
          let jumpHeightCm = jumpHeightPx;
          if (refHeightPx > 0 && refHeightCm > 0) {
            const pxToCm = refHeightCm / refHeightPx;
            jumpHeightCm = (jumpHeightPx * pxToCm).toFixed(1);
          }
          setResult(`Estimated vertical jump: ${jumpHeightCm} cm (calibrated)`);
        } else if (testType === 'shuttlerun') {
          // Mock shuttle run analysis
          setTimeout(() => {
            setResult('Detected: 9.2 seconds shuttle run (mock result)');
          }, 2500);
        }
        setProcessing(false);
      };
    }
  };

  return (
    <div className="video-analysis-bg">
      <div className="video-analysis-gradient" />
      <div className="video-analysis-card">
        <h3 className="video-analysis-title">AI Video Analysis</h3>
        <select value={testType} onChange={handleTestChange} className="video-test-select">
          <option value="situps">Sit-Ups</option>
          <option value="verticaljump">Vertical Jump</option>
          <option value="shuttlerun">Shuttle Run</option>
        </select>
        {testType === 'verticaljump' && (
          <div style={{marginBottom:'10px'}}>
            <label style={{color:'#fff',fontSize:'0.95rem'}}>Reference object height (cm): </label>
            <input type="number" value={refHeightCm} onChange={handleRefHeightCmChange} min={1} max={300} style={{width:'70px',marginRight:'10px'}} />
            <label style={{color:'#fff',fontSize:'0.95rem'}}>Reference object height (pixels): </label>
            <input type="number" value={refHeightPx} onChange={handleRefHeightPxChange} min={1} max={2000} style={{width:'70px'}} />
            <div style={{color:'#eee',fontSize:'0.85rem',marginTop:'4px'}}>Measure pixel height using video frame (e.g., screenshot + image editor).</div>
          </div>
        )}
        <input type="file" accept="video/*" onChange={handleVideoUpload} disabled={processing} className="video-upload-input" />
        <video ref={videoRef} width="320" height="240" controls className="video-preview" />
        <div className="analysis-result">{result}</div>
      </div>
    </div>
  );
}

export default VideoAnalysis;
