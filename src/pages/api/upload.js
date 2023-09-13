
// import type { NextApiRequest, NextApiResponse } from 'next'
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
});

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '20mb',
      },
    },
  };

  export default async function handler(
    req,
     res
     ) {
    let uploaded_url = '';
    let fileStr = req.body.data;
  debugger
    if (req.method === 'POST') {
      
      try {
        // let fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload_large(fileStr, {
          resource_type: 'video',
          chunk_size: 6000000,
      });
        // console.log('uploaded_url', uploadedResponse.secure_url);
        uploaded_url:UploadApiResponse = uploadedResponse.secure_url;
        
      } catch (error) {
       
        res.status(500).json({ error: 'Something wrong' });
      }
      // console.log('objects', uploaded_url);
      // res.writeHead(200, { 'Content-Type': 'text/event-stream' });
  
      // res.status(200).json("backend complete");
      res.status(200).json({data: uploaded_url});
      // res.status(200).json({ data: uploaded_url });
    }
  }
