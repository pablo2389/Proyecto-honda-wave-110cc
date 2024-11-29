import React, { useState } from 'react';
import axios from 'axios'; // Necesitarás axios para hacer la solicitud HTTP

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null); // Estado para la imagen seleccionada
  const [uploading, setUploading] = useState(false); // Estado de carga
  const [imageUrl, setImageUrl] = useState<string | null>(null); // URL de la imagen subida

  // Manejar la selección de la imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  // Subir la imagen a Cloudinary
  const handleImageUpload = async () => {
    if (!image) return; // Si no hay imagen seleccionada, no hacemos nada

    setUploading(true);

    const formData = new FormData();
    formData.append('file', image); // Añadimos la imagen al formulario
    formData.append('upload_preset', 'tu_upload_preset'); // Aquí va tu upload_preset de Cloudinary

    try {
      // Hacemos la solicitud POST a Cloudinary
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload',
        formData
      );

      // Si la subida es exitosa, obtenemos la URL de la imagen subida
      setImageUrl(response.data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Subir una imagen de tu moto 110cc</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        disabled={uploading} // Deshabilitar mientras se está subiendo
      />
      <button onClick={handleImageUpload} disabled={uploading || !image}>
        {uploading ? "Subiendo..." : "Subir Imagen"}
      </button>

      {/* Mostrar la URL de la imagen subida o la imagen */}
      {imageUrl && (
        <div>
          <h3>Imagen subida:</h3>
          <img src={imageUrl} alt="Imagen subida" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
