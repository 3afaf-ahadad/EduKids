import Logo from "../Common/Logo";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F7F9FF] font-['Nunito',sans-serif] flex items-center justify-center p-6">
      {/* Bulles décoratives floutées (exactement comme sur la maquette) */}
      <div className="absolute left-[-5%] right-[65%] top-[-10%] bottom-[60%] bg-[#CEE5FF] mix-blend-multiply opacity-40 blur-[32px] rounded-full" />
      <div className="absolute left-[55%] right-[-5%] top-[47.5%] bottom-[-10%] bg-[#E8DDFF] mix-blend-multiply opacity-40 blur-[32px] rounded-full" />
      <div className="absolute left-[65%] right-[10%] top-[20%] bottom-[48.75%] bg-[#FFDDAF] mix-blend-multiply opacity-30 blur-[32px] rounded-full" />

      {/* Carte de connexion - dimensions et style exacts */}
      <div className="relative z-10 bg-white border border-[#E0E2E9] rounded-[48px] shadow-[0px_10px_30px_rgba(0,99,156,0.15)] w-full max-w-[512px] p-12">
        <div className="flex flex-col items-center pb-10">
          <Logo size="text-6xl" />
          <p className="text-[#404751] text-center mt-4">
            Reviens jouer et apprendre avec nous !
          </p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-[#FFDAD6] text-[#BA1A1A] p-3 rounded-full mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Champ Email */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 pl-4">
              <div className="w-4 h-4 bg-[#00639C] rounded-sm" />{" "}
              {/* Icône simplifiée */}
              <span className="text-[#181C21] font-medium">Adresse Email</span>
            </div>
            <input
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-[#F1F4FA] shadow-inner rounded-full focus:outline-none focus:ring-2 focus:ring-[#4DABF7] placeholder:text-[#6B7280] text-[#181C21]"
              required
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 pl-4">
              <div className="w-4 h-5 bg-[#6844C8] rounded-sm" />{" "}
              {/* Icône simplifiée */}
              <span className="text-[#181C21] font-medium">Mot de passe</span>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-[#F1F4FA] shadow-inner rounded-full focus:outline-none focus:ring-2 focus:ring-[#4DABF7] placeholder:text-[#6B7280] text-[#181C21]"
              required
            />
          </div>

          {/* Bloc des actions (bouton + lien mdp oublié) */}
          <div className="flex flex-col items-center gap-6 pt-4">
            {/* Bouton arc‑en‑ciel conforme à la spécification */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF9A9E] via-[#FECFEF] via-[#A1C4FD] via-[#C2E9FB] via-[#E0C3FC] to-[#8EC5FC] border-b-[6px] border-[#E0E2E9] shadow-[0px_10px_30px_rgba(0,99,156,0.15)] text-[#181C21] font-bold flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span className="text-lg">Se connecter</span>
            </button>
          </div>
        </form>

        {/* Séparateur + lien d'inscription */}
        <div className="mt-8 pt-6 border-t-2 border-[#E5E8EF]">
          <div className="flex justify-center items-center gap-6">
            <span className="text-[#404751]">Pas encore de compte ?</span>
            <Link
              to="/register"
              className="text-[#6844C8] font-semibold hover:underline"
            >
              Inscris-toi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
