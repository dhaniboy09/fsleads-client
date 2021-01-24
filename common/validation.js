import Validator from 'validatorjs';

const rules = {
  first_name: 'required|string',
  last_name: 'required|string',
  email: 'required|email',
};

const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email',
  string: 'Please enter a valid value',
};

export const validateNewLeadForm = (lead) => {
  const validator = new Validator(lead, rules, errorMessages);
  if (validator.passes()) {
    return null;
  }
  return validator.errors;
};
