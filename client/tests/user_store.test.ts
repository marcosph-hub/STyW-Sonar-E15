import { setActivePinia, createPinia } from 'pinia';
import { useUsersStore } from '../src/stores/users_store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Users Store', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        setActivePinia(createPinia());
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('debería obtener usuarios', async () => {
        const store = useUsersStore();
        mock.onGet('/user').reply(200, [{ name: 'John', email: 'john@example.com', password: '1234', role: 'user' }]);

        await store.getUsers();
        expect(store.user.length).toBe(1);
        expect(store.user[0].name).toBe('John');
    });

    it('debería registrar un usuario', async () => {
        const store = useUsersStore();
        const newUser = { name: 'Jane', email: 'jane@example.com', password: '1234', role: 'user' };
        mock.onPost('/user/register').reply(200, newUser);

        await store.registerUser(newUser);
        expect(store.user.length).toBe(1);
        expect(store.user[0].name).toBe('Jane');
    });
});