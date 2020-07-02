import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./style.css";
import logoImg from "../../assets/logo.svg";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const companyId = localStorage.getItem("companyId");
  const companyName = localStorage.getItem("companyName");

  async function handleNewProduct(e) {
    e.preventDefault();

    const data = {
      name,
      description,
      value,
    };

    try {
      await api.post("products", data, {
        headers: {
          Authorization: companyId,
        },
      });

      history.push("/profile");
    } catch (err) {
      alert("erro ao cadasatrar o caso, tente novamente ");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo produto</h1>
          <p>Olá, {companyName}</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewProduct}>
          <input
            placeholder=" Título do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder=" Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder=" Valor em R$:"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className=" button " type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
