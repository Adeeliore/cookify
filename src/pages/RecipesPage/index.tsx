import React, { useState, useEffect } from 'react';
import styles from './index.module.sass';
import {fetchRecipes} from "../../services/recipes.ts";
import Header from "../../components/Header";
import RecipeContent from "../../components/RecipeContent";
import MenuContent from "../../components/MenuContent";
import {Filters} from "../../types/types.ts";
import RecipeFilter from "../../components/RecipeFilter";



const RecipePage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [filters, setFilters] = useState<Filters>({});

    const handleSearch = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const fetchedRecipes = await fetchRecipes(query, filters);
            setRecipes(fetchedRecipes);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
            setIsMenuOpen(false);
        }
    };

    const handleToggleMenuContent = () => {
        setIsMenuOpen(true);
    };

    useEffect(() => {
        if (query || Object.values(filters).some(value => value !== undefined && value !== '')) {
            handleSearch();
        }
    }, [filters, query]);

    const handleApplyFilters = (newFilters: Filters) => {
        setFilters(newFilters);
        setIsFilterOpen(false); // Close filter after applying
    };

    return (
        <div className={styles.container}>
            <Header
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                setIsFilterOpen={setIsFilterOpen}
                handleToggleMenuContent={handleToggleMenuContent}
            />
            {!isMenuOpen && (
                <RecipeContent
                    isLoading={isLoading}
                    error={error}
                    recipes={recipes}
                />
            )}
            {isMenuOpen && (
                <MenuContent
                    setQuery={setQuery}
                    setIsFilterOpen={setIsFilterOpen}
                    handleApplyFilters={handleApplyFilters}
                />
            )}
            {isFilterOpen && (
                <RecipeFilter
                    isOpen={isFilterOpen}
                    onApplyFilters={handleApplyFilters}
                    onClose={() => setIsFilterOpen(false)}
                />
            )}
        </div>
    );
};

export default RecipePage;




