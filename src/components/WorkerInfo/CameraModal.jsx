import { useRef, useEffect } from "react";
import { Modal, message } from "antd";
import axios from "axios";

const CameraModal = ({
  open,
  onClose,
  onSuccess,
  onMaxAttempts,
  captureInterval = 1000,
  maxAttempts = 3,
  t,
}) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const attemptsRef = useRef(0);

  const isTablet = window.innerWidth < 1024;

  const handleCapture = async () => {
    if (attemptsRef.current >= maxAttempts) return;
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `capture_${Date.now()}.jpg`, { type: "image/jpeg" });

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
          "http://10.13.32.51:8080/api/v1/getEmployee",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const data = res.data;
        if (data?.score > 0.5 && data?.id_string && data?.name) {
          onSuccess(data);
          onClose();
        } else {
          message.error(data?.error || t("msg.recognitionFailed") || "Recognition failed");
          attemptsRef.current += 1;
          if (attemptsRef.current >= maxAttempts) {
            onMaxAttempts();
            onClose();
          }
        }
      } catch (err) {
        console.error(err);
        message.error(t("msg.apiError") || "API call failed!");
        attemptsRef.current += 1;
        if (attemptsRef.current >= maxAttempts) {
          onMaxAttempts();
          onClose();
        }
      }
    }, "image/jpeg");
  };

  useEffect(() => {
   async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" } 
    });
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
  } catch (err) {
    console.error("Camera error:", err);
    message.error("Không truy cập được camera!");
  }
}


    if (open) {
      attemptsRef.current = 0;
      startCamera();

      if (isTablet) {
        intervalRef.current = setInterval(() => {
          handleCapture();
        }, captureInterval);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [open, captureInterval, isTablet]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
      destroyOnClose
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ fontSize: 18, marginBottom: 12, color: "#555" }}>
          {t ? t("msg.cameraInstruction") : "Align your face to the camera"}
        </div>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "360px",
            height: "270px",
            borderRadius: 12,
            background: "#222",
            marginBottom: 16,
          }}
        />
      </div>
    </Modal>
  );
};

export default CameraModal;
