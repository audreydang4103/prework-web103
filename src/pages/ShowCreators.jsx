import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

function ShowCreators() {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCreators();
    }, []);

    const fetchCreators = async () => {
        try {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .order('name');

            if (error) {
                console.error('Error fetching creators:', error);
            } else {
                setCreators(data || []);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting creator:', error);
            } else {
                setCreators(creators.filter(creator => creator.id !== id));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading creators...</div>;
    }

    return (
        <div className="show-creators">
            <section className="headline-section">
                <h2 className="main-headline">My Favorite Creators</h2>
            </section>
            <main>
                {creators.length === 0 ? (
                    <div className="no-creators">
                        <h2>No creators yet!</h2>
                        <p>Start building your Creatorverse by adding your first content creator.</p>
                        <Link to="/add" className="add-creator-btn">
                            Add Your First Creator
                        </Link>
                    </div>
                ) : (
                    <div className="creators-grid">
                        {creators.map(creator => (
                            <CreatorCard
                                key={creator.id}
                                creator={creator}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default ShowCreators; 