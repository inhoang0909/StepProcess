export const getForms = () =>
  JSON.parse(localStorage.getItem("forms") || "[]");

export const saveForms = (forms) =>
  localStorage.setItem("forms", JSON.stringify(forms));

export const ensureForm = (id) => {
  const forms = getForms();
  let f = forms.find((x) => x.id === id);
  if (!f) {
    f = {
      id,
      currentStep: 1,
      updatedAt: new Date().toISOString(),
      steps: Array.from({ length: 7 }, () => ({})),
    };
    forms.push(f);
    saveForms(forms);
  }
  return f;
};

export const updateFormStep = (id, stepIndex, stepData) => {
  const forms = getForms();
  const idx = forms.findIndex((f) => f.id === id);
  if (idx === -1) return null;

  const form = { ...forms[idx] };
  form.steps[stepIndex] = { ...(form.steps[stepIndex] || {}), ...stepData };
  form.updatedAt = new Date().toISOString();
  forms[idx] = form;
  saveForms(forms);
  return form;
};

export const upsertForm = (form) => {
  const forms = getForms();
  const idx = forms.findIndex((f) => f.id === form.id);
  if (idx >= 0) forms[idx] = form;
  else forms.push(form);
  saveForms(forms);
};
