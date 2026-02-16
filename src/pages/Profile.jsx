import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext.jsx';
// import Navbar from '../src/components/ProtectedRoute.jsx'
import Navbar from '../components/Navbar';
import { updateUserProfile } from '../utils/auth';
import { validateName, validateEmail, validatePassword } from '../utils/validation';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateName(name)) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (password && !validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const updateData = { name, email };
    if (password) {
      updateData.password = password;
    }
    const result = updateUserProfile(user.id, updateData);
    if (result.success) {
      toast.success('Profile updated!');
      updateUser(result.user);
      setIsEditing(false);
      setPassword('');
      setErrors({});
    } else {
      toast.error(result.message);
    }
  };
  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPassword('');
    setErrors({});
    setIsEditing(false);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
        <p className="text-gray-600 mb-8">Manage your account</p>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 font-medium">Full Name</label>
                <p className="text-xl text-gray-800 font-semibold">{user?.name}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 font-medium">Email</label>
                <p className="text-xl text-gray-800 font-semibold">{user?.email}</p>
              </div>
              
              <button 
                onClick={() => setIsEditing(true)} 
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-4 py-3 border rounded-lg"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-4 py-3 border rounded-lg"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Leave blank to keep current"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              
              <div className="flex gap-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel} 
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;