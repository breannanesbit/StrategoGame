import { ChangeEvent, useState } from "react";

export const LocalStorageImage: React.FC = () => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setSelectedFile(file || null);
    };
  
    const handleUpload = () => {
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          localStorage.setItem('uploadedImage', dataUrl);
          setUploadedImage(dataUrl);
        };
        reader.readAsDataURL(selectedFile);
      }
    };
  
    return (
      <div>
        <h3>Upload Logo</h3>
        <div>
          <input className="form-control"type="file" onChange={handleFileChange} key={uploadedImage} />
          <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
        </div>
      </div>
    );
  };
  
  export default LocalStorageImage;