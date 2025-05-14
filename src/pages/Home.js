import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [clienteParaExcluir, setClienteParaExcluir] = useState(null);

  useEffect(() => {
    carregarClientes();
  }, []);

  function carregarClientes() {
    fetch("http://localhost:5000/api/clientes")
      .then((res) => {
        if (!res.ok) throw new Error("Erro na resposta da API");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setClientes(data);
        else if (Array.isArray(data.clientes)) setClientes(data.clientes);
        else setClientes([]);
      })
      .catch((err) => {
        console.error("Erro ao carregar clientes:", err);
        setClientes([]);
      });
  }

  function confirmarExclusao(cliente) {
    setClienteParaExcluir(cliente);
  }

  function cancelarExclusao() {
    setClienteParaExcluir(null);
  }

  function excluirCliente() {
    fetch(`http://localhost:5000/api/clientes/${clienteParaExcluir.Id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar cliente");
        carregarClientes();
        setClienteParaExcluir(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao excluir cliente");
      });
  }

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
                <div className="p-6 h-full flex flex-col justify-between">
                  <Link to={`/cliente/${cliente.Id}`} className="block mb-4">
                    <h3 className="text-lg font-semibold text-gray-900" title={cliente.Name}>
                      {cliente.Name || "Cliente sem nome"}
                    </h3>
                    {cliente.Surname && <p className="text-gray-600">{cliente.Surname}</p>}
                  </Link>
                  <button
                    onClick={() => confirmarExclusao(cliente)}
                    className="btn-confirm-delete w-20"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      {clienteParaExcluir && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Confirmar exclusão</h2>
            <p className="mb-6">
              Deseja realmente excluir o cliente <strong>{clienteParaExcluir.Name}</strong>?
            </p>
            <div className="modal-buttons">
              <button onClick={cancelarExclusao} className="btn-cancel">
                Cancelar
              </button>
              <button onClick={excluirCliente} className="btn-confirm-delete">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
