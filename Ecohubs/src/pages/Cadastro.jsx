import { useForm } from "react-hook-form";


function cadastro() {
  const { register,handleSubmit,setValue,getValues} = useForm();

  
    const enderecoCompleto = async () => {
    let cep = getValues('cep')

    if(!!cep){
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((resp) => resp.json())
      .then(dados =>{
        setValue("neighborhood",dados.bairro)
        setValue("city",dados.localidade)
        setValue("state",dados.uf)
      })
      .catch(error => console.log(error))
    }
}


  return (
    <>
      <form>
        <div>
          <h2>Dados pessoais:</h2>

            <label htmlFor= "name">Nome Completo: </label>
            <input type="text" name="name" 
            {...register("name", {
              required: true,
              maxLength: 50,
              minLength: 10,
            })}
          />
    
            <div>
                <label htmlFor="gender">Gênero:</label>
                <select name="gender">
                <option>Selecione uma opção</option>
                <option value='female'>Feminino</option>
                <option value='male'>Masculino</option>
                <option value='other'>Outro</option>
                </select>
            </div>
                <label htmlFor="cpf">CPF:</label>
                <input type="number" name="cpf"  
            {...register("cpf", {
              maxLength: 11,
              minLength: 11,
            })}
          />
        <label htmlFor="birth">Data de nascimento:</label>
        <input type="date" name="birth"  />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" 
            {...register("email", {
              required: true,
            })}
          />
          <label htmlFor="password">Senha:</label>
      <input type="password" name="password" 
        {...register("password", {})}
        />
        </div>
        <div>
          <h2>Endereço:</h2>

            <label htmlFor="cep">CEP:</label>
            <input type="number" name="cep" 
            {...register("cep", {
                required: true,
                maxLength: 8,
                minLength: 8,
                onBlur: () => enderecoCompleto()
            })}
          />
          <label htmlFor="neighborhood">Bairro:</label>
            <input type="text" name="neighborhood"  />
            <label htmlFor="city">Cidade:</label>
            <input type="text"  name="city" />
            <label htmlFor="state">Estado:</label>
            <input type="text" name="state" />

        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}

export default cadastro;
