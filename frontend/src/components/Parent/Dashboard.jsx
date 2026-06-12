import { useState, useEffect } from "react";
import {
  getChildren,
  getDashboardStats,
  createChild,
  deleteChild,
} from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [children, setChildren] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildAge, setNewChildAge] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getDashboardStats();
      const stats = res.data; // array of { id, name, age, progress: { alphabet, numbers, colors } }
      const mapped = stats.map((child) => ({
        ...child,
        // Convert the backend progress shape to what the UI expects
        prog: {
          alphabet_completed: child.progress.alphabet.completed,
          alphabet_total: child.progress.alphabet.total,
          alphabet_percentage: Math.round(
            (child.progress.alphabet.completed /
              child.progress.alphabet.total) *
              100,
          ),
          numbers_completed: child.progress.numbers.completed,
          numbers_total: child.progress.numbers.total,
          numbers_percentage: Math.round(
            (child.progress.numbers.completed / child.progress.numbers.total) *
              100,
          ),
          colors_completed: child.progress.colors.completed,
          colors_total: child.progress.colors.total,
          colors_percentage: Math.round(
            (child.progress.colors.completed / child.progress.colors.total) *
              100,
          ),
        },
      }));
      setChildren(mapped);
    } catch (err) {
      console.error("Erreur chargement :", err);
      setError("Impossible de charger le tableau de bord.");
    }
  };

  const addChild = async (e) => {
    e.preventDefault();
    setError("");
    if (!newChildName.trim()) return;

    try {
      await createChild({
        name: newChildName,
        age: newChildAge || null,
      });
      setNewChildName("");
      setNewChildAge("");
      setShowAddModal(false);
      fetchData(); // refresh list
    } catch (err) {
      console.error("Erreur création enfant :", err);
      if (err.response?.status === 422) {
        setError(
          err.response.data.message || "Limite atteinte ou données invalides.",
        );
      } else {
        setError("Impossible de créer l'enfant.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Supprimer cet enfant ? Toute sa progression sera perdue.",
      )
    )
      return;
    try {
      await deleteChild(id);
      fetchData();
    } catch (err) {
      setError("Impossible de supprimer l'enfant.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FF] to-[#E8F0F8] font-['Nunito',sans-serif]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#E0E2E9] px-6 py-4 flex flex-wrap justify-between items-center">
        <div>
          <p className="text-sm text-[#404751]">Bon retour</p>
          <h1 className="text-2xl font-bold text-[#00639C]">
            Bonjour {user?.name || "Sophie"}
          </h1>
        </div>
        <button
          onClick={logout}
          className="bg-white border border-[#E0E2E9] text-[#404751] px-5 py-2 rounded-full hover:bg-gray-50 transition shadow-sm"
        >
          Se déconnecter
        </button>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#181C21] tracking-tight">
            Mes Enfants
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-[#4DABF7] to-[#9C7AFF] text-white font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2"
          >
            + Ajouter un enfant
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            ⚠️ {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {children.map((child) => {
            const prog = child.prog || {};
            return (
              <div
                key={child.id}
                className="bg-white rounded-3xl shadow-card border border-[#E0E2E9] p-6 transition hover:shadow-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#181C21]">
                      {child.name}
                    </h3>
                    {child.age && (
                      <span className="text-[#6B7280] text-sm">
                        {child.age} ans
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/enfant/${child.id}`}
                    className="bg-[#F1F4FA] text-[#00639C] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#E5E8EF] transition shadow-sm flex items-center gap-1"
                  >
                    Modifier
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(child.id)}
                    className="bg-red-100 text-red-600 px-3 py-2 rounded-full text-sm font-semibold hover:bg-red-200 transition"
                  >
                    Supprimer
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-[#CEE5FF] bg-opacity-40 rounded-xl p-3 text-center">
                    <div className="text-sm font-semibold text-[#00639C]">
                      A-Z Alphabet
                    </div>
                    <div className="text-2xl font-bold text-[#00639C] my-1">
                      {prog.alphabet_completed || 0}/{prog.alphabet_total || 26}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#00639C] h-2 rounded-full"
                        style={{ width: `${prog.alphabet_percentage || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-[#E8DDFF] bg-opacity-40 rounded-xl p-3 text-center">
                    <div className="text-sm font-semibold text-[#6844C8]">
                      Numbers
                    </div>
                    <div className="text-2xl font-bold text-[#6844C8] my-1">
                      {prog.numbers_completed || 0}/{prog.numbers_total || 10}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#6844C8] h-2 rounded-full"
                        style={{ width: `${prog.numbers_percentage || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-[#FFDDAF] bg-opacity-40 rounded-xl p-3 text-center">
                    <div className="text-sm font-semibold text-[#DB980F]">
                      Colors
                    </div>
                    <div className="text-2xl font-bold text-[#DB980F] my-1">
                      {prog.colors_completed || 0}/{prog.colors_total || 8}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#DB980F] h-2 rounded-full"
                        style={{ width: `${prog.colors_percentage || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {children.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-[#E0E2E9] mt-4">
            <p className="text-[#404751]">Aucun enfant pour le moment.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 text-[#00639C] font-semibold underline"
            >
              Ajouter un premier enfant
            </button>
          </div>
        )}
      </div>

      {/* Modal d'ajout d'enfant */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-[#E0E2E9]">
            <h3 className="text-2xl font-bold text-[#00639C] mb-2">
              Ajouter un enfant
            </h3>
            <p className="text-[#404751] mb-6">
              Créez un nouveau profil pour commencer l'aventure !
            </p>
            <form onSubmit={addChild}>
              <div className="mb-5">
                <label className="block text-[#181C21] font-semibold mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  placeholder="Ex: Léo"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F1F4FA] border border-[#E0E2E9] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4DABF7]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-[#181C21] font-semibold mb-1">
                  Âge
                </label>
                <select
                  value={newChildAge}
                  onChange={(e) => setNewChildAge(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F1F4FA] border border-[#E0E2E9] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4DABF7] text-[#404751]"
                >
                  <option value="">Sélectionner un âge</option>
                  {[...Array(12).keys()].map((i) => (
                    <option key={i} value={i + 2}>
                      {i + 2} ans
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 border border-[#E0E2E9] rounded-full text-[#404751] hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#4DABF7] to-[#9C7AFF] text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  Créer le compte enfant 🎁
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
