const digitsOnly = (value = "") => value.replace(/\D/g, "");

export function formatPhone(value = "") {
  const digits = digitsOnly(value).slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function formatCPF(value = "") {
  const digits = digitsOnly(value).slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6)
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export function formatRG(value = "") {
  const digits = digitsOnly(value).slice(0, 9);

  if (digits.length <= 2) return digits;
  if (digits.length <= 5)
    return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;

  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}-${digits.slice(8)}`;
}

export function applyInputMask(fieldName, value) {
  const stringValue = value ?? "";

  switch (fieldName) {
    case "Phone":
      return formatPhone(stringValue);
    case "CPF":
      return formatCPF(stringValue);
    case "RG":
      return formatRG(stringValue);
    default:
      return stringValue;
  }
}

export function sanitizeMaskedValue(fieldName, value) {
  const stringValue = value ?? "";
  if (stringValue === "") return null;

  const digits = digitsOnly(stringValue);
  if (!digits) return null;

  switch (fieldName) {
    case "Phone":
    case "CPF":
    case "RG":
      return digits;
    default:
      return stringValue.trim();
  }
}
