import axios from 'axios';

const base = axios.create({
    baseURL: 'http://localhost:4000/api'
});

const api = {

    async getNotes() {
        const res = await base.get('/notes');
        return res.data;
    },

    async addNote(title: string, body: string) {
        const res = await base.post('/notes', {title, body});
        return res.data;
    },

    async getNote(id: number) {
        const res = await base.get(`/notes/${id}`);
        return res.data;
    },

    async updateNote(id: number, title: string, body: string) {
        const res = await base.patch(`/notes/${id}`, {title, body});
        return res.data;
    },

    async deleteNote(id: number) {
        const res = await base.delete(`/notes/${id}`);
        return res.data;
    }

}

export default api;
