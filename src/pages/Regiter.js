import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  initialClientForm,
  formatFormDataForSubmission,
  getBooleanSelectValue,
  parseBooleanSelect,
  booleanSelectFieldLabels,
  pathologyLabels,
  pathologyFields
} from "../utils/clientForm";
import { applyInputMask } from "../utils/inputMasks";

export default function Cadastro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialClientForm });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFormData({ ...initialClientForm });
    setIsLoading(false);
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: applyInputMask(name, value) }));
  };

  const handleBooleanSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: parseBooleanSelect(value) }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = id
      ? `http://localhost:5000/api/clientes/${id}`
      : "http://localhost:5000/api/clientes";
    const method = id ? "PUT" : "POST";
    const payload = formatFormDataForSubmission(formData);

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      toast.success(`${formData.Name} cadastrado com sucesso!`, {
        position: "top-center",
        autoClose: 2000
      });
      navigate("/");
    }
  };

  if (isLoading) return <div className="p-4">Carregando...</div>;

  return (
    <form onSubmit={handleSubmit} className="cadastro-form">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Dados pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Nome</label>
            <input
              type="text"
              name="Name"
              required
              placeholder="Nome"
              value={formData.Name}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Data de nascimento</label>
            <input
              type="date"
              name="BirthDate"
              value={formData.BirthDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Ocupação</label>
            <input
              type="text"
              name="Occupation"
              placeholder="Ocupação"
              value={formData.Occupation}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Telefone</label>
            <input
              type="tel"
              name="Phone"
              placeholder="Telefone"
              value={formData.Phone}
              onChange={handleChange}
              className="input-field"
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
              className="input-field"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">RG</label>
            <input
              type="text"
              name="RG"
              placeholder="RG"
              value={formData.RG}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">CPF</label>
            <input
              type="text"
              name="CPF"
              placeholder="CPF"
              value={formData.CPF}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Hábitos e acompanhamento</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Hábitos</label>
            <textarea
              name="Habits"
              placeholder="Descreva os hábitos"
              value={formData.Habits}
              onChange={handleChange}
              className="textarea-field"
              rows={4}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Acompanhamento</label>
            <textarea
              name="Accompaniment"
              placeholder="Descreva o acompanhamento"
              value={formData.Accompaniment}
              onChange={handleChange}
              className="textarea-field"
              rows={4}
            />
          </div>
        </div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Avaliação</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Tipo de calçado mais utilizado</label>
            <select
              name="ShoeType"
              value={formData.ShoeType}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Selecione</option>
              <option value="Aberto">Aberto</option>
              <option value="Fechado">Fechado</option>
              <option value="Ambos">Ambos</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Tipo de meia usada</label>
            <select
              name="SockType"
              value={formData.SockType}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Selecione</option>
              <option value="Social">Social</option>
              <option value="Esportiva">Esportiva</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Tipo de lâmina utilizada</label>
            <select
              name="BladeType"
              value={formData.BladeType}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Selecione</option>
              <option value="Aço inox">Aço inox</option>
              <option value="Plástica">Plástica</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Medicação em uso</label>
            <input
              type="text"
              name="Medication"
              placeholder="Medicamentos em uso"
              value={formData.Medication}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {Object.keys(booleanSelectFieldLabels).map((fieldKey) => (
            <div key={fieldKey}>
              <label className="block mb-1 font-semibold">
                {booleanSelectFieldLabels[fieldKey]}
              </label>
              <select
                value={getBooleanSelectValue(formData[fieldKey])}
                onChange={(event) =>
                  handleBooleanSelectChange(fieldKey, event.target.value)
                }
                className="input-field"
              >
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {formData.HasDiabetes === true && (
            <div>
              <label className="block mb-1 font-semibold">Tipo de diabetes</label>
              <input
                type="text"
                name="DiabetesType"
                placeholder="Tipo"
                value={formData.DiabetesType}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          )}
          {formData.HasAllergy === true && (
            <div>
              <label className="block mb-1 font-semibold">Quais alergias?</label>
              <input
                type="text"
                name="AllergyDetails"
                placeholder="Detalhes"
                value={formData.AllergyDetails}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          )}
          {formData.HadSurgery === true && (
            <div>
              <label className="block mb-1 font-semibold">Cirurgias realizadas</label>
              <input
                type="text"
                name="SurgeryDetails"
                placeholder="Detalhes"
                value={formData.SurgeryDetails}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          )}
          {formData.HasInfectiousDisease === true && (
            <div>
              <label className="block mb-1 font-semibold">Qual doença infectocontagiosa?</label>
              <input
                type="text"
                name="InfectiousDiseaseDetails"
                placeholder="Detalhes"
                value={formData.InfectiousDiseaseDetails}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          )}
          {formData.HasVascularDisease === true && (
            <div>
              <label className="block mb-1 font-semibold">Qual doença vascular?</label>
              <input
                type="text"
                name="VascularDiseaseDetails"
                placeholder="Detalhes"
                value={formData.VascularDiseaseDetails}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          )}
          {formData.IsPregnant === true && (
            <div>
              <label className="block mb-1 font-semibold">Semanas de gestação</label>
              <input
                type="number"
                name="PregnancyWeeks"
                min="0"
                value={formData.PregnancyWeeks}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          )}
          {formData.UnderMedicalTreatment === true && (
            <div>
              <label className="block mb-1 font-semibold">Especialidade médica</label>
              <input
                type="text"
                name="MedicalSpecialty"
                placeholder="Especialidade"
                value={formData.MedicalSpecialty}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-semibold">Outros sintomas</label>
          <textarea
            name="OtherSymptoms"
            placeholder="Descreva outros sintomas"
            value={formData.OtherSymptoms}
            onChange={handleChange}
            className="textarea-field"
            rows={4}
          />
        </div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Observações profissionais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">P.E.</label>
            <textarea
              name="ObservationsLeftFoot"
              value={formData.ObservationsLeftFoot}
              onChange={handleChange}
              className="textarea-field"
              rows={4}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">P.D.</label>
            <textarea
              name="ObservationsRightFoot"
              value={formData.ObservationsRightFoot}
              onChange={handleChange}
              className="textarea-field"
              rows={4}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block mb-1 font-semibold">Observações gerais</label>
          <textarea
            name="ProfessionalNotes"
            value={formData.ProfessionalNotes}
            onChange={handleChange}
            className="textarea-field"
            rows={4}
          />
        </div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Patologias dermatológicas presentes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {pathologyFields.map((fieldKey) => (
            <label key={fieldKey} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                name={fieldKey}
                checked={formData[fieldKey]}
                onChange={handleCheckboxChange}
              />
              <span>{pathologyLabels[fieldKey]}</span>
            </label>
          ))}
        </div>
      </section>

      <button type="submit" className="register-button self-end">
        {id ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
}
