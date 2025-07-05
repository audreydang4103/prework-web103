import { FaInstagram, FaYoutube, FaTiktok, FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CreatorCard({ creator, onDelete }) {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this creator?')) {
            onDelete(creator.id);
        }
    };

    const socials = creator.socials || {};
    return (
        <div className="card-imgbg">
            {creator.imageURL ? (
                <img src={creator.imageURL} alt={creator.name} className="card-imgbg-img" />
            ) : (
                <div className="card-imgbg-img placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222', fontSize: '2.5rem', color: '#fff', width: '100%', height: '100%' }}>🌌</div>
            )}
            <div className="card-imgbg-overlay">
                <div className="card-imgbg-info">
                    <div className="card-imgbg-name">{creator.name}</div>
                    <div className="card-imgbg-description">{creator.description}</div>
                    <div className="card-imgbg-socials">
                        <a href={socials.instagram || '#'} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href={socials.youtube || '#'} target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        <a href={socials.tiktok || '#'} target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
                    </div>
                </div>
                <div className="card-imgbg-actions">
                    <Link to={`/creator/${creator.id}`} className="card-imgbg-icon-btn" title="View"><FaInfoCircle size={14} /></Link>
                    <Link to={`/edit/${creator.id}`} className="card-imgbg-icon-btn" title="Edit"><FaEdit size={14} /></Link>
                    <button onClick={handleDelete} className="card-imgbg-icon-btn" title="Delete"><FaTrash size={14} /></button>
                </div>
            </div>
        </div>
    );
}

export default CreatorCard; 