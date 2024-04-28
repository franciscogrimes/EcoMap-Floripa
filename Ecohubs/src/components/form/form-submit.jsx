import style from "./form-submit.module.css";

function FormSubmit({ text, type }) {
  <button type={type} className={style.btn}>
    {text}
  </button>;
}

export default FormSubmit;
