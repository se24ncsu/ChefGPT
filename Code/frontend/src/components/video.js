/* istanbul ignore file */
import React, { useState, useEffect } from 'react';

const RecipeVideo = (props) => {
  const [videoLink, setVideoLink] = useState(null);

  useEffect(() => {
    if (props.videoQuery) {
      // Convert the YouTube URL to the embed URL format
      const videoId = props.videoQuery.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setVideoLink(embedUrl);
    }
  }, [props.videoQuery]);

  return (
    <div style={styles.videoContainer}>
      {videoLink ? (
        <div style={styles.videoWrapper}>
          <h3 style={styles.videoTitle}>Recipe Video</h3>
          <iframe
            style={styles.videoIframe}
            width="640"
            height="360"
            src={videoLink}  // Use the video embed URL
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p style={styles.loadingMessage}>Loading video...</p>  // Display a loading message while fetching the video
      )}
    </div>
  );
};

const styles = {
  videoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '2px 0',
    padding: '2px',
    backgroundColor: '#f9f9f9',
    borderRadius: '100px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  videoWrapper: {
    textAlign: 'center',
  },
  videoTitle: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
  },
  videoIframe: {
    width: '100%',
    maxWidth: '1080px',
    height: '360px',
    border: 'none',
    borderRadius: '10px',
  },
  loadingMessage: {
    fontSize: '18px',
    color: '#666',
  },
};

export default RecipeVideo;