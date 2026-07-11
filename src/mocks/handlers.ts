import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/example', () => {
    return HttpResponse.json({ message: 'mocked response' });
  }),
];
