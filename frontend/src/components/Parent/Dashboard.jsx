import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [children, setChildren] = useState([]);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    const res = await api.get('/parent/children');
    setChildren(res.data);
  };

  const addChild = async (e) => {
    e.preventDefault();
    if (!newChildName) return;
    await api.post('/parent/children', { name: newChildName, age: newChildAge || null });
    setNewChildName('');
    setNewChildAge('');
    fetchChildren();
  };

  const deleteChild = async (id) => {
    if (window.confirm('Delete this child? All progress will be lost.')) {
      await api.delete(`/parent/children/${id}`);
      fetchChildren();
      if (selectedChild?.id === id) setSelectedChild(null);
    }
  };

  const viewProgress = async (child) => {
    setSelectedChild(child);
    const res = await api.get(`/parent/dashboard/${child.id}`);
    setProgress(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">EduKids - Parent Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Children List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">My Children</h2>
            <form onSubmit={addChild} className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Child's name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                className="flex-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Age (optional)"
                value={newChildAge}
                onChange={(e) => setNewChildAge(e.target.value)}
                className="w-20 p-2 border rounded"
              />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
            </form>
            {children.length === 0 ? (
              <p className="text-gray-500">No children yet. Add one above.</p>
            ) : (
              <ul className="space-y-2">
                {children.map((child) => (
                  <li key={child.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <span className="font-semibold">{child.name}</span>
                      {child.age && <span className="text-sm text-gray-500 ml-2">({child.age} years)</span>}
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => viewProgress(child)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Progress
                      </button>
                      <button
                        onClick={() => deleteChild(child.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/enfant/${child.id}`}
                        className="bg-purple-500 text-white px-3 py-1 rounded text-sm inline-block"
                      >
                        Play
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Progress Display */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Progress</h2>
            {!selectedChild ? (
              <p className="text-gray-500">Select a child to see their progress.</p>
            ) : !progress ? (
              <p>Loading...</p>
            ) : (
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedChild.name}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Alphabet</span>
                      <span>{progress.alphabet_percentage || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress.alphabet_percentage || 0}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Numbers</span>
                      <span>{progress.numbers_percentage || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress.numbers_percentage || 0}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Colors</span>
                      <span>{progress.colors_percentage || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${progress.colors_percentage || 0}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p><strong>Badges earned:</strong> {progress.badges || 0}</p>
                  <p><strong>Game scores:</strong></p>
                  <ul className="list-disc ml-5">
                    {progress.game_scores?.map((score, idx) => (
                      <li key={idx}>{score.game_type}: {score.score} points</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}