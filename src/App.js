import React, { useEffect, useState } from 'react';
import sampleData from './assets/images/sample_image.jpg';
import socketIOClient from "socket.io-client";
import SpeedGauge from './components/speedgauge/SpeedGauge';
import ss from "socket.io-stream";
import { encodeImage } from './utilities/utilities';
import './App.css';
import './tailwind.output.css';

function App() {
  const connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
  };
  const socketio_url = "https://blissful-volhard-022c26.netlify.app/";
  const socket = socketIOClient(socketio_url, connectionOptions);
  const [speed, setSpeed] = useState(undefined);
  const [loading, setLoading] = useState(false);
  var stream = ss.createStream();
  var fileLength = 0;

  useEffect(() => {
    ss(socket).on('dataUpload', function (size, timestamp) {
      //time in seconds
      var time = (Date.now() - timestamp) * 0.001;
      console.log(` ${size} Mb downloaded in ${time} seconds `);
      var uploadSpeed = ((size) / time).toFixed(2);
      setLoading(false);
      setSpeed(uploadSpeed);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initSpeedTest = () => {
    setLoading(true);
    encodeImage(
      sampleData,
      function (img) {
        let data = {
          name: "sample_data",
          content: img,
          timestamp: Date.now()
        }
        ss(socket).emit('file', stream, data, function (res, err) {
          if (err) {
            console.log("Error: " + err);
          } else {

            fileLength = res.size;
            // Received data
            stream.on('data', function (chunk) {
              //Adding chunks in megabits size;
              fileLength += ((chunk.length / (1024 * 1024)) * 8);
              let fileMbSize = fileLength.toFixed(2);
              let time = (Date.now() - res.timestamp) * 0.001;
              let downloadSpeed = ((fileMbSize) / time).toFixed(2);
              setSpeed(downloadSpeed);
            });

            // No more data
            stream.on('end', function () {
              console.log("End of stream.")
              setLoading(false);
            });
          }
        });
      }
    );
  }

  return (
    <div className="App h-screen w-screen bg-gray-700 pt-16">
      <h1 className="text-white text-xl font-bold">Internet Speed Checker</h1>
      <div className="h-screen/2 w-full flex flex-col justify-center align-center">
        <SpeedGauge speed={speed} />
        {
          speed !== undefined ?
            !loading ?
              <p className="text-red-700 font-bold p-2">{`${speed} Mbps`}</p>
              :
              <p className="text-red-700 font-bold p-2">-- Mbps</p>
            :
            <p className="text-red-700 font-bold p-2">Click below to test your speed</p>
        }
      </div>
      {
        !loading ?
          <button
            className="z-10 bg-transparent hover:bg-red-700 text-white font-semibold hover:text-white mt-8 mb-40 py-2 px-4 border border-white hover:border-transparent rounded"
            onClick={initSpeedTest}
          >
            Test speed
          </button>
          :
          <div className="w-full flex justify-center items-center mt-8 mb-40 py-2 px-4">
            <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-10 w-10"></div>
          </div>
      }
    </div>
  );
}

export default App;
