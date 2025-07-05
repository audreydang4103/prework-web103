import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaArrowLeft, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { supabase } from '../client';

function ViewCreator() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);

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
                console.error('Error fetching creator:', error);
                navigate('/');
            } else {
                setCreator(data);
            }
        } catch (error) {
            console.error('Error:', error);
            navigate('/');
        } finally {
            setLoading(false);
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
                    console.error('Error deleting creator:', error);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading creator...</div>;
    }

    if (!creator) {
        return <div className="error">Creator not found</div>;
    }

    // Card size and overlay
    const cardStyle = {
        maxWidth: 700,
        minHeight: 700,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 36,
        boxShadow: '0 12px 48px rgba(102, 126, 234, 0.18)',
        background: creator.imageURL
            ? `url(${creator.imageURL}) center center/cover no-repeat`
            : '#f3f3fa',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(35,41,70,0.55) 0%, rgba(35,41,70,0.85) 100%)',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const contentStyle = {
        position: 'relative',
        zIndex: 2,
        padding: '3.5rem 2.5rem 2.5rem 2.5rem',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
        height: '100%',
    };

    return (
        <div className="view-creator-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            <div className="card-imgbg" style={cardStyle}>
                <div style={overlayStyle}>
                    <div style={contentStyle}>
                        <div className="card-imgbg-name" style={{ fontSize: '2.7rem', fontWeight: 900, color: '#fff', marginBottom: 24, marginTop: 0, textShadow: '0 2px 16px #232946', letterSpacing: 1 }}>{creator.name}</div>
                        <div className="card-imgbg-socials" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', margin: '0.5rem 0 1.5rem 0' }}>
                            {creator.instagram && (
                                <a href={creator.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" style={{ color: '#fff', fontSize: '2.2rem', opacity: 0.93 }}><FaInstagram /></a>
                            )}
                            {creator.youtube && (
                                <a href={creator.youtube} target="_blank" rel="noopener noreferrer" title="YouTube" style={{ color: '#fff', fontSize: '2.2rem', opacity: 0.93 }}><FaYoutube /></a>
                            )}
                            {creator.tiktok && (
                                <a href={creator.tiktok} target="_blank" rel="noopener noreferrer" title="TikTok" style={{ color: '#fff', fontSize: '2.2rem', opacity: 0.93 }}><FaTiktok /></a>
                            )}
                        </div>
                        <div className="card-imgbg-description" style={{ fontSize: '1.35rem', color: '#fff', margin: '0 0 2.5rem 0', lineHeight: 1.7, textShadow: '0 2px 12px #232946', maxWidth: 600, width: '100%', fontWeight: 500, whiteSpace: 'pre-line' }}>{creator.description}</div>
                        <div className="card-imgbg-actions" style={{ display: 'flex', gap: 24, margin: '0 auto', justifyContent: 'center' }}>
                            <Link to={`/edit/${creator.id}`} className="card-imgbg-icon-btn" title="Edit" style={{ fontSize: '2rem', padding: 16 }}><FaEdit size={28} /></Link>
                            <button onClick={handleDelete} className="card-imgbg-icon-btn" title="Delete" style={{ fontSize: '2rem', padding: 16 }}><FaTrash size={28} /></button>
                            <Link to="/" className="card-imgbg-icon-btn" title="Back to Home" style={{ fontSize: '2rem', padding: 16 }}><FaArrowLeft size={28} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCreator; 