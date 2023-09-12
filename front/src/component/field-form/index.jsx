import "./index.css";

import { useState } from "react";

function FieldForm({ placeholder, button, onSubmit }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    console.log(value);
  };

  const handleSubmit = () => {
    if (value.length === 0) return null;

    if (onSubmit) {
      onSubmit(value);
    } else {
      throw new Error("onSubmit is undefined");
    }

    setValue("");
  };

  const isDisabled = value.length === 0;

  return (
    <div className="field-form">
      <textarea
        className="field-form__field"
        rows={2}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      ></textarea>
      <button
        onClick={handleSubmit}
        className="field-form__button"
        disabled={isDisabled}
      >
        {button}
      </button>
    </div>
  );
}

export default FieldForm;
