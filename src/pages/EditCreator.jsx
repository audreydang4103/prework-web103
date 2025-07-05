import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { supabase } from '../client';

function EditCreator() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageURL: '',
        tiktok: '',
        instagram: '',
        youtube: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCreator();
    }, [id]);

    const fetchCreator = async () => {
        try {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                navigate('/');
            } else {
                setFormData({
                    ...data,
                    tiktok: data.tiktok || '',
                    instagram: data.instagram || '',
                    youtube: data.youtube || ''
                });
            }
        } catch (error) {
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        if (!formData.name || !formData.description) {
            setError('Please fill in all required fields.');
            setSaving(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('creators')
                .update(formData)
                .eq('id', id);

            if (error) {
                setError('Error updating creator. Please try again.');
            } else {
                navigate(`/creator/${id}`);
            }
        } catch (error) {
            setError('Error updating creator. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this creator?')) {
            try {
                const { error } = await supabase
                    .from('creators')
                    .delete()
                    .eq('id', id);

                if (error) {
                    setError('Error deleting creator. Please try again.');
                } else {
                    navigate('/');
                }
            } catch (error) {
                setError('Error deleting creator. Please try again.');
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading creator...</div>;
    }

    return (
        <div className="add-edit-page">
            <div className="add-edit-card">
                <h2 className="add-edit-title">Edit Creator</h2>
                <form onSubmit={handleSubmit} className="creator-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter creator name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Describe what this creator does..."
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageURL">Image URL</label>
                        <input
                            type="url"
                            id="imageURL"
                            name="imageURL"
                            value={formData.imageURL}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="instagram">Instagram URL</label>
                        <input
                            type="url"
                            id="instagram"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="https://instagram.com/username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="youtube">YouTube URL</label>
                        <input
                            type="url"
                            id="youtube"
                            name="youtube"
                            value={formData.youtube}
                            onChange={handleChange}
                            placeholder="https://youtube.com/@username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tiktok">TikTok URL</label>
                        <input
                            type="url"
                            id="tiktok"
                            name="tiktok"
                            value={formData.tiktok}
                            onChange={handleChange}
                            placeholder="https://tiktok.com/@username"
                        />
                    </div>

                    {error && <div className="form-error">{error}</div>}

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={saving}
                            title={saving ? 'Saving...' : 'Save Changes'}
                        >
                            <FaPlus />
                        </button>
                        <Link to="/" className="cancel-btn" title="Cancel">
                            <FaArrowLeft />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCreator; 