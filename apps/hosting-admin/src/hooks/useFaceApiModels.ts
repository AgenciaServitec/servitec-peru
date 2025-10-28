import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

export const useFaceApiModels = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models/tiny_face_detector'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models/face_landmark_68'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models/face_recognition'),
        ]);
        if (isMounted) setLoading(false);
      } catch (err) {
        console.error('Error cargando modelos:', err);
        if (isMounted) setError('Error al cargar modelos');
      }
    };

    loadModels();

    return () => {
      isMounted = false;
    };
  }, []);

  const ready = !loading && !error;

  return { loading, error, ready };
};