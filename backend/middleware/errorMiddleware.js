import multer from 'multer';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        error: 'File too large', 
        message: 'The uploaded file exceeds the size limit. Maximum file size is 25MB.' 
      });
    }
    return res.status(400).json({ error: err.message });
  }
  
  // Handle other errors
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};