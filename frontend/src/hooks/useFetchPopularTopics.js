import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchPopularTopics() {

    return useQuery({
        queryKey: ['popularTags'],
        queryFn: async () => {

            // Fetch every post from the database
            const response = await axios.get('http://localhost:8000/posts');
            const posts = response.data;

            // Create a dictionary to tally the votes
            const tagTally = {};

            posts.forEach(post => {
                if (post.tags && Array.isArray(post.tags)) {
                    post.tags.forEach(tag => {
                        // If the tag exists, add 1. If not, start it at 1.
                        tagTally[tag] = (tagTally[tag] || 0) + 1;
                    });
                }
            });

            // Convert the dictionary into a sorted array
            const sortedTags = Object.entries(tagTally)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count) // Sort highest to lowest
                .slice(0, 5); // Keep the Top 5 most popular

            return sortedTags;
        }
    });
}