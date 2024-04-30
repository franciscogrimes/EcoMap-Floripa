import style from "./form-input.module.css";

function FormInput({ type, name, text, value }) {
  return (
    <div className={style.form_input}>
      <label htmlFor={name}>{text}</label>
      <input type={type} name={name} value={value} />
    </div>
  );
}

export default FormInput;
