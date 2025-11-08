import { applyInputMask, sanitizeMaskedValue } from "./inputMasks";

const booleanSelectFields = [
  "HasSomeoneCareNails",
  "HasSomeoneCareCuticles",
  "BitesNails",
  "HasPainSensitivity",
  "HasDiabetes",
  "HasAllergy",
  "HasHypertension",
  "HadSurgery",
  "HasInfectiousDisease",
  "HasVascularDisease",
  "UsesAnticoagulant",
  "HasThyroidCondition",
  "IsPregnant",
  "UnderMedicalTreatment",
  "HasCramps",
  "HasVarices"
];

const pathologyCheckboxFields = [
  "HasOnychomycosis",
  "HasDermatophytosis",
  "HasParonychia",
  "HasDystrophy",
  "HasTorque"
];

export const initialClientForm = {
  Name: "",
  BirthDate: "",
  Occupation: "",
  Phone: "",
  Adress: "",
  RG: "",
  CPF: "",
  Habits: "",
  Accompaniment: "",
  ShoeType: "",
  SockType: "",
  BladeType: "",
  HasSomeoneCareNails: null,
  HasSomeoneCareCuticles: null,
  BitesNails: null,
  Medication: "",
  HasPainSensitivity: null,
  HasDiabetes: null,
  DiabetesType: "",
  HasAllergy: null,
  AllergyDetails: "",
  HasHypertension: null,
  HadSurgery: null,
  SurgeryDetails: "",
  HasInfectiousDisease: null,
  InfectiousDiseaseDetails: "",
  HasVascularDisease: null,
  VascularDiseaseDetails: "",
  UsesAnticoagulant: null,
  HasThyroidCondition: null,
  IsPregnant: null,
  PregnancyWeeks: "",
  UnderMedicalTreatment: null,
  MedicalSpecialty: "",
  HasCramps: null,
  HasVarices: null,
  OtherSymptoms: "",
  ObservationsLeftFoot: "",
  ObservationsRightFoot: "",
  ProfessionalNotes: "",
  HasOnychomycosis: false,
  HasDermatophytosis: false,
  HasParonychia: false,
  HasDystrophy: false,
  HasTorque: false
};

const stringFields = [
  "Name",
  "BirthDate",
  "Occupation",
  "Phone",
  "Adress",
  "RG",
  "CPF",
  "Habits",
  "Accompaniment",
  "ShoeType",
  "SockType",
  "BladeType",
  "Medication",
  "DiabetesType",
  "AllergyDetails",
  "SurgeryDetails",
  "InfectiousDiseaseDetails",
  "VascularDiseaseDetails",
  "MedicalSpecialty",
  "OtherSymptoms",
  "ObservationsLeftFoot",
  "ObservationsRightFoot",
  "ProfessionalNotes"
];

const numberFields = ["PregnancyWeeks"];

const maskedStringFields = new Set(["Phone", "RG", "CPF"]);

const cleanString = (value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};

export function mapApiDataToForm(data = {}) {
  const form = { ...initialClientForm };

  stringFields.forEach((field) => {
    if (field === "BirthDate") {
      if (!data[field]) {
        form[field] = "";
      } else {
        const date = new Date(data[field]);
        form[field] = Number.isNaN(date.getTime())
          ? ""
          : date.toISOString().split("T")[0];
      }
    } else {
      const rawValue = data[field] ? String(data[field]) : "";
      form[field] = maskedStringFields.has(field)
        ? applyInputMask(field, rawValue)
        : rawValue;
    }
  });

  numberFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      form[field] = "";
    } else {
      form[field] = String(data[field]);
    }
  });

  booleanSelectFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      form[field] = null;
    } else {
      form[field] = Boolean(data[field]);
    }
  });

  pathologyCheckboxFields.forEach((field) => {
    form[field] = Boolean(data[field]);
  });

  return form;
}

export function formatFormDataForSubmission(form) {
  const payload = { ...form };

  stringFields.forEach((field) => {
    if (field === "BirthDate") {
      payload[field] = form[field] ? form[field] : null;
    } else if (maskedStringFields.has(field)) {
      payload[field] = sanitizeMaskedValue(field, form[field]);
    } else {
      payload[field] = cleanString(form[field]);
    }
  });

  numberFields.forEach((field) => {
    payload[field] = form[field] !== "" && form[field] !== null
      ? Number(form[field])
      : null;
  });

  booleanSelectFields.forEach((field) => {
    payload[field] = form[field] === null ? null : Boolean(form[field]);
  });

  pathologyCheckboxFields.forEach((field) => {
    payload[field] = Boolean(form[field]);
  });

  return payload;
}

export function getBooleanSelectValue(value) {
  if (value === null || value === undefined) return "";
  return value ? "true" : "false";
}

export function parseBooleanSelect(value) {
  if (value === "") return null;
  return value === "true";
}

export const booleanSelectFieldLabels = {
  HasSomeoneCareNails: "Alguém cuida das unhas?",
  HasSomeoneCareCuticles: "Alguém cuida das cutículas?",
  BitesNails: "Roe as unhas?",
  HasPainSensitivity: "Sensibilidade à dor?",
  HasDiabetes: "Diabetes?",
  HasAllergy: "Possui alergia?",
  HasHypertension: "Hipertensão?",
  HadSurgery: "Já realizou cirurgia?",
  HasInfectiousDisease: "Doença infectocontagiosa?",
  HasVascularDisease: "Doença vascular?",
  UsesAnticoagulant: "Usa anticoagulante?",
  HasThyroidCondition: "Hipo/Hipertireóide?",
  IsPregnant: "Gestante?",
  UnderMedicalTreatment: "Faz tratamento médico?",
  HasCramps: "Tem câimbras?",
  HasVarices: "Varizes?"
};

export const pathologyLabels = {
  HasOnychomycosis: "Onicomicose",
  HasDermatophytosis: "Dermatofitose",
  HasParonychia: "Paroníquia",
  HasDystrophy: "Distrofia",
  HasTorque: "Torque"
};

export const selectOptionMap = [
  "HasSomeoneCareNails",
  "HasSomeoneCareCuticles",
  "BitesNails",
  "HasPainSensitivity",
  "HasDiabetes",
  "HasAllergy",
  "HasHypertension",
  "HadSurgery",
  "HasInfectiousDisease",
  "HasVascularDisease",
  "UsesAnticoagulant",
  "HasThyroidCondition",
  "IsPregnant",
  "UnderMedicalTreatment",
  "HasCramps",
  "HasVarices"
];

export const pathologyFields = [...pathologyCheckboxFields];
export const booleanFields = [...booleanSelectFields];
