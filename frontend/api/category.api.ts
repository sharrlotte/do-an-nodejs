import axiosInstance from './api';

export interface Category {
  id: number;
  name: string;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}

export const categoryApi = {
  getAll: async () => {
    const response = await axiosInstance.get<Category[]>('/categories');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get<Category>(`/categories/${id}`);
    return response.data;
  },

  create: async (data: CreateCategoryDto) => {
    const response = await axiosInstance.post<Category>('/categories', data);
    return response.data;
  },

  update: async (id: number, data: UpdateCategoryDto) => {
    const response = await axiosInstance.patch<Category>(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axiosInstance.delete<void>(`/categories/${id}`);
    return response.data;
  },
};
