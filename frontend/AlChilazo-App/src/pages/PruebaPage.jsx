import { React, useState } from 'react'

export const PruebaPage = () => {
  const [pdfUrl, setPdfUrl] = useState('')
  const [pdfName, setPdfName] = useState('')
  const url = 'http://localhost:4000/prueba';

  async function mandarPDF(ids, file) {
    const Datos = {
      id: ids,
      fileContent: file
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Datos)
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data.Location);
    return data.Location;
  }

  const handleUploadPDF = async (event) => {
    const file = event.target.files[0]
    console.log(file)
    console.log(file.name)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      const fileContent = reader.result.split(',')[1];
      console.log(fileContent);
      const response = await mandarPDF(file.name, fileContent);
      console.log(response);
      setPdfUrl(response.Location);
      setPdfName(file.name);
    };
  }

  return (
    <>
      <div>
        <input type="file" onChange={handleUploadPDF} />
        <p>Nombre del archivo: {pdfName}</p>
        <p>Ruta del archivo: {pdfUrl}</p>
      </div>
    </>
  )
}
