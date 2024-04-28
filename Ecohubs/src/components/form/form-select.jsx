import style from "./form-select.module.css";

function FormSelect({ name, text, value }) {
  return (
    <div className={style.form_select}>
      <label htmlFor={name}>{text}</label>
      <select name={name}>
        <option>Selecione uma opção</option>
        <option value={value}>Feminino</option>
        <option value={value}>Masculino</option>
        <option value={value}>Outro</option>
      </select>
    </div>
  );
}

export default FormSelect;
