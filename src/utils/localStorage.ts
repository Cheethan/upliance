// src/utils/localStorage.ts
export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: any[];
}

const STORAGE_KEY = "savedForms";

export function loadForms(): FormSchema[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function saveForm(form: FormSchema) {
  const forms = loadForms();
  forms.push(form);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}

export function updateForm(updatedForm: FormSchema) {
  const forms = loadForms();
  const index = forms.findIndex((f) => f.id === updatedForm.id);
  if (index !== -1) {
    forms[index] = updatedForm;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  }
}

export function deleteForm(id: string) {
  const forms = loadForms().filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}


export function saveForms(forms: FormSchema[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}