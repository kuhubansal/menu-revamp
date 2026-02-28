import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export const fetchMenus = (page=1, limit=10, search="") => {
   const q = search? `&q=${encodeURIComponent(search)}` : "";
   return api.get(`/menus/paginated?page=${page}&limit=${limit}${q}`);
}

export const searchMenus = (query: string)=>{
    return api.get(`/menus/search?query=${query}`);
}

export const createMenu = (data: any)=>{
   return api.post("/menus", data);
}

export const updateMenu = (id: string, data: any)=>{
    return api.put(`/menus/${id}`, data);
}