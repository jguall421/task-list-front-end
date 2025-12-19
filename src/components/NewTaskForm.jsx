import { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaults = {
  title: '',
  description: ''
};

const NewTaskForm = ({ onHandleSubmit }) => {
  const[formData, setFormData] = useState(kDefaults);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    setFormData(formData => {
      return {
        ...formData,
        [inputName]: inputValue
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onHandleSubmit(formData);
    setFormData(kDefaults);
  };

  const makeControlledInput = (inputName) => {
    return (
      <div key={`input-${inputName}`}>
        <label htmlFor={`input-${inputName}`}>Task {inputName.charAt(0).toUpperCase() + inputName.slice(1)}: </label>
        <input
          type='text'
          id={`input-${inputName}`}
          name={inputName}
          value={formData[inputName]}
          onChange={handleChange}
        />
      </div>
    );
  };

  const makeAllInputs = (formData) => {
    const inputs = [];
    for (const key of Object.keys(formData)) {
      inputs.push(makeControlledInput(key));
    } return inputs;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {makeControlledInput('title')}
      {makeControlledInput('description')} */}

      { makeAllInputs(formData) }
      <div>
        <input type="submit" value="Add Task"/>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;