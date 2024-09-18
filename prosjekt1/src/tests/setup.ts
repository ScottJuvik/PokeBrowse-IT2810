import { handlers } from '@mocks/handlers';
import '@testing-library/jest-dom/vitest';
import { setupServer } from 'msw/node';

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
