import { useCallback, useEffect, useRef, useState } from "react";
import ImageViewer from 'react-simple-image-viewer';
import { toast } from "react-toastify";

export default function FotoUploader({ clienteId }) {
  const [fotos, setFotos] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const inputRef = useRef();

  // Função para carregar as fotos
  const fetchFotos = useCallback(async () => {
    if (!clienteId) return;
    const res = await fetch(`http://localhost:5000/api/clientes/${clienteId}/fotos`);
    const data = await res.json();
    setFotos(data);
  }, [clienteId]);

  useEffect(() => {
    fetchFotos();
  }, [fetchFotos]);

  const imageUrls = fotos.map(foto => (
    `http://localhost:5000/api/clientes/fotos/${foto.Id}/imagem`
  ));

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (const file of inputRef.current.files) {
      formData.append("fotos", file);   
    }
    if(inputRef.current.files.length == 0)
      return;

    await fetch(`http://localhost:5000/api/clientes/${clienteId}/fotos`, {
      method: "POST",
      body: formData
    }).then(() => {
          toast.success("Upload feito com sucesso!", {
            position: "top-center",
            autoClose: 2000,
          })
        });

    // Atualiza a lista após upload
    await fetchFotos();
    inputRef.current.value = ""; // Limpa o input de arquivo
  };

  const handleDelete = async (fotoId) => {
    await fetch(`http://localhost:5000/api/clientes/fotos/${fotoId}`, {
      method: "DELETE"
    }).then(() => {
          toast.success("Foto deletada com sucesso!", {
            position: "top-center",
            autoClose: 2000,
          })
        });;
    
    // Atualiza a lista após deletar
    await fetchFotos();
    
    // Fecha o visualizador se estiver aberto
    if (isViewerOpen) closeImageViewer();
  };

  return (
    <div className="upload-file-container">
      <div className="upload-container">
        <label className="font-semibold block mb-1">Anexar Fotos</label>
        <input 
          type="file" 
          multiple 
          ref={inputRef} 
          accept="image/*"
        />
        <button 
          type="button" 
          onClick={handleUpload} 
          className="button-upload"
          //disabled={!inputRef.current?.files?.length} // Desabilita se não houver arquivos
        >
          Enviar
        </button>
      </div>
      
      <div className="photos-grid">
        {fotos.map((foto, index) => (
          <div key={foto.Id} className="image-card">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(foto.Id);
              }}
              className="button-delete-photo"
            >
              X
            </button>
            <img
              src={`http://localhost:5000/api/clientes/fotos/${foto.Id}/imagem`}
              alt={foto.FileName}
              onClick={() => openImageViewer(index)}
            />
            <div className="imagem-name-section">
              <span title={foto.FileName} className="image-name">{foto.FileName}</span>
            </div>
          </div>
        ))}
      </div>
      
      {isViewerOpen && (
        <ImageViewer
          src={imageUrls}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}