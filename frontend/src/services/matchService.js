import { api } from './api';

export const matchService = {
  async getMatches() {
    return api.get('/matches');
  },

  async getMatchById(id) {
    return api.get(`/matches/${id}`);
  },

  async createMatch(matchData, token) {
    return api.post('/matches', matchData, token);
  },

  async updateMatch(id, matchData, token) {
    return api.put(`/matches/${id}`, matchData, token);
  },

  async deleteMatch(id, token) {
    return api.delete(`/matches/${id}`, token);
  },
};
