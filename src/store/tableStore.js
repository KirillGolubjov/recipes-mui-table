import { create } from 'zustand';
import { apiService } from '../api/api-service';
import { columns } from '../common/consts';
import { getRandomDate } from '../utils/helpers';

export const useTableStore = create((set) => ({
  rows: [],
  columns,
  loading: true,
  fetchRows: async () => {
    set({ loading: true });
    try {
      const storedRows = localStorage.getItem('tableRows');
      if (storedRows) {
        set({ rows: JSON.parse(storedRows), loading: false });
        return;
      }

      const response = await apiService.getRecipes();
      const formattedRows = response.data.recipes.map((recipe, index) => ({
        id: index,
        image: recipe.image,
        name: recipe.name,
        instructions: recipe.instructions.join('\n'),
        date: getRandomDate(new Date(2023, 0, 1), new Date()),
        prepTimeMinutes: recipe.prepTimeMinutes,
      }));

      set({ rows: formattedRows, loading: false });
      localStorage.setItem('tableRows', JSON.stringify(formattedRows));
    } catch (error) {
      console.error('Error fetching rows:', error);
      set({ loading: false });
    }
  },
}));
