import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cadastro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Adress: "",
    Habits: "",
    Accompaniment: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    setFormData({
      Name: "",
      Adress: "",
      Habits: "",
      Accompaniment: ""
    });
    setIsLoading(false);
    
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id
      ? `http://localhost:5000/api/clientes/${id}`
      : "http://localhost:5000/api/clientes";
    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      toast.success(`${formData.Name} cadastrado com sucesso!`, {
        position: "top-center",
        autoClose: 2000,
      });

      navigate("/");
    }
  };

  if (isLoading) return <div className="p-4">Carregando...</div>;

  return (
    <form onSubmit={handleSubmit} className="cadastro-form">
      <div>
        <label className="block mb-1 font-semibold">Nome</label>

        <input
          type="text"
          name="Name"
          required
          placeholder="Nome"
          value={formData.Name}
          onChange={handleChange}
          className="w-full p-2 rounded input-field"
        />

      </div>
      <div>
        <label className="block mb-1 font-semibold">Endereço</label>
        <input
          type="text"
          name="Adress"
          required
          placeholder="Endereço"
          value={formData.Adress}
          onChange={handleChange}
          className="w-full p-2 rounded input-field"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Hábitos</label>
        <textarea
          name="Habits"
          placeholder="Descreva os hábitos"
          value={formData.Habits}
          onChange={handleChange}
          className="w-full p-2 rounded"
          rows={6}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Acompanhamento</label>
        <textarea
          name="Accompaniment"
          placeholder="Descreva o acompanhamento"
          value={formData.Accompaniment}
          onChange={handleChange}
          className="w-full p-2 rounded"
          rows={6}
        />
      </div>
      <button type="submit" className="register-button">
        {id ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
}
