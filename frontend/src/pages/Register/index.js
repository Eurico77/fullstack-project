import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./style.css";

import logoImg from "../../assets/cadastro.svg";

export default function Register() {
  const [name, setName] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
    };
    try {
      const res = await api.post("companys", data);

      history.push("/");

      alert(`Cadastro efetuado com sucesso, sua ID é:${res.data.id}`);
    } catch (err) {
      alert(`Erro ao cadastrar. ${err}`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastre sua empresa</h1>
          <p>
            Faça seu cadastro, entre na plataforma e deixe sua empresa mais 
            tecnologica.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#000000" />
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder=" Nome da empresa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
