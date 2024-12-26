import React, { useState, useEffect } from 'react';

export default function SlideshowCreator({ images }) {
  const [ffmpeg, setFfmpeg] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadFFmpeg = async () => {
      if (typeof window !== 'undefined') {
        const ffmpegModule = await import('@ffmpeg/ffmpeg');
        const ffmpegInstance = ffmpegModule.default.createFFmpeg({ log: true });
        await ffmpegInstance.load();
        setFfmpeg(ffmpegInstance);
      }
    };
    loadFFmpeg();
  }, []); 

  
  useEffect(() => {
    // Cleanup: revoke object URLs to prevent memory leaks
    return () => images.forEach(image => URL.revokeObjectURL(image.preview));
  }, [images]);

  useEffect(() => {
    // Only initialize ffmpeg on the client side
    const loadFFmpeg = async () => {
      if (typeof window !== 'undefined') { // Check for client-side
        const { createFFmpeg, fetchFile } = await import('@ffmpeg/ffmpeg');
        const ffmpegInstance = createFFmpeg({ log: true });
        await ffmpegInstance.load();
        setFfmpeg(ffmpegInstance);
      }
    };
    loadFFmpeg();
  }, []);

  const createSlideshow = async () => {
    if (!ffmpeg || images.length === 0) return;

    setLoading(true);

    try {
      // Load images into ffmpeg
      for (let i = 0; i < images.length; i++) {
        ffmpeg.FS('writeFile', `img${i}.jpg`, await fetchFile(images[i]));
      }

      // Run ffmpeg command to create a slideshow from images
      await ffmpeg.run(
        '-framerate', '1', // 1 frame per second for slideshow speed
        '-i', 'img%d.jpg', // Use all images sequentially
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-vf', 'scale=640:480', // Set video resolution
        'output.mp4'
      );

      // Read the output video file
      const data = ffmpeg.FS('readFile', 'output.mp4');
      const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);

    } catch (error) {
      console.error('Error creating video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Slideshow Creator</h2>
      <button onClick={createSlideshow} disabled={!ffmpeg || loading}>
        {loading ? 'Creating...' : 'Create Slideshow'}
      </button>

      {videoUrl && (
        <div>
          <h3>Generated Video</h3>
          <video controls src={videoUrl} width="640" height="480"></video>
          <a href={videoUrl} download="slideshow.mp4">Download Video</a>
        </div>
      )}
    </div>
  );
}
