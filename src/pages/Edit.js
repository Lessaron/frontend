import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FotoUploader from "../components/FotoUploader";
import { toast, ToastContainer } from "react-toastify";

export default function Edit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Name: "",
    Adress: "",
    Habits: "",
    Accompaniment: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/clientes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            Name: data.Name || "",
            Adress: data.Adress || "",
            Habits: data.Habits || "",
            Accompaniment: data.Accompaniment || ""
          });
          setIsLoading(false);
        })
        .catch((err) => console.error("Erro ao carregar cliente:", err));
    } else {
      setFormData({
        Name: "",
        Adress: "",
        Habits: "",
        Accompaniment: ""
      });
      setIsLoading(false);
    }
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
      toast.success("Cliente atualizado com sucesso!", {
        position: "top-center",
        autoClose: 2000,
      });
      console.log(id ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!");
    }
  };

  if (isLoading) return <div className="p-4">Carregando...</div>;

  return (
    <form onSubmit={handleSubmit} className="cadastro-form space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Nome</label>
        <input
          type="text"
          name="Name"
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

      {id && <FotoUploader clienteId={id} />}
    </form>
  );
}
