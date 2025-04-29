import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';
export default function Home() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clientes")
      .then((res) => {
        if (!res.ok) throw new Error("Erro na resposta da API");
        return res.json();
      })
      .then((data) => {
        console.log("Resposta da API:", data);
        if (Array.isArray(data)) {
          setClientes(data);
        } else if (Array.isArray(data.clientes)) {
          setClientes(data.clientes);
        } else {
          console.warn("Formato inesperado:", data);
          setClientes([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar clientes:", err);
        setClientes([]);
      });
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Clientes Cadastrados</h2>
          <Link 
            to="/cliente" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Adicionar Cliente
          </Link>
        </div>

        {clientes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum cliente cadastrado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clientes.map((cliente) => (
              <div 
                key={cliente.Id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link to={`/cliente/${cliente.Id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {cliente.Name || "Cliente sem nome"}
                        </h3>
                        {cliente.Surname && (
                          <p className="text-gray-600">{cliente.Surname}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>ID:</span>
                        <span className="text-gray-700">{cliente.Id}</span>
                      </div>
                      {/* Adicione mais campos aqui conforme necessário */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}