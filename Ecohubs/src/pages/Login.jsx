function login() {
  return (
    <>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" required />
        <label htmlFor="password">Senha:</label>
        <input type="password" />
      </form>
    </>
  );
}

export default login;
