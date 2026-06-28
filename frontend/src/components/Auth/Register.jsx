import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../Common/Logo";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      // 1. Inscription
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      // 2. Connexion automatique
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error("Erreur inscription/connexion :", err.response?.data);
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        "Inscription échouée. Vérifiez vos informations.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] to-[#E8F0F8] flex items-center justify-center p-4 font-['Quicksand','Comic_Neue',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8 transition-all duration-300">
        <div className="flex justify-center mb-5">
          <Logo size="text-5xl" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-[#00639C] tracking-tight mt-4">
          Inscription Parent
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6 text-base">
          Rejoignez l'aventure EduKids !
        </p>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-[#FFDAD6] text-[#BA1A1A] p-3 rounded-full mb-5 text-sm border border-[#FFB8B0] shadow-inner">
            ⚠️ {error}
          </div>
        )}

        {/* Message de succès (optionnel, si besoin) */}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-full mb-5 text-sm">
            ✅ {success}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom et Prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 bg-[#F1F4FA] border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4DABF7] focus:border-transparent transition placeholder:text-gray-400 text-gray-700"
            required
          />
          <input
            type="email"
            placeholder="Adresse Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 bg-[#F1F4FA] border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4DABF7] focus:border-transparent transition placeholder:text-gray-400 text-gray-700"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe (min. 8 caractères)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 bg-[#F1F4FA] border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4DABF7] focus:border-transparent transition placeholder:text-gray-400 text-gray-700"
            required
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full px-5 py-3 bg-[#F1F4FA] border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4DABF7] focus:border-transparent transition placeholder:text-gray-400 text-gray-700"
            required
          />

          {/* Bouton "Créer un compte" avec dégradé */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4DABF7] via-[#6844C8] to-[#DB980F] text-white font-bold py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg hover:shadow-xl"
          >
            Créer un compte
            <span className="text-xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          <p className="text-center text-gray-500 pt-2">
            Déjà inscrit ?{" "}
            <Link
              to="/login"
              className="text-[#00639C] font-semibold hover:text-[#4DABF7] hover:underline transition"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
