import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./style.css";
import logoimg from "../../assets/logo.svg";

export default function Profile() {
  const [products, setProducts] = useState([]);

  const history = useHistory();

  const companyId = localStorage.getItem("companyId");
  const companyName = localStorage.getItem("companyName");

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: companyId,
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, [companyId]);

  async function handleDeleteProduct(id) {
    try {
      await api.delete(`products/${id}`, {
        headers: {
          Authorization: companyId,
        },
      });

      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      alert("Erro ao deletar, tente novamente");
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoimg} alt=" Be The Hero " />
        <span>Bem vindo (a), {companyName} </span>

        <div className="buttons">
          <Link className="button" to="/products/new">
            Cadastrar um novo produto
          </Link>
          <Link id="button-store" to="/profile">
            Cadastrar uma nova loja
          </Link>
        </div>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Produtos cadastrados</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>NOME:</strong>
            <p>{product.name}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{product.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.value)}
            </p>

            <button
              onClick={() => handleDeleteProduct(product.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
