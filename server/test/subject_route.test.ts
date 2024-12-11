import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import express from 'express';
import Subject from '../models/subject_model';
import historyRoutes from '../routes/history_routes'; // Asegúrate de importar tus rutas
import studyMethodRoutes from '../routes/study_method_routes'; // Importa otras rutas si es necesario

const app = express();
app.use(express.json());
app.use('/subject', require('../routes/subject_route').default); // Asegúrate de que la ruta esté exportada correctamente

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Subject.deleteMany({});
});

describe('Rutas de Subject', () => {
    test('debe crear un nuevo subject', async () => {
        const newSubject = {
            name: 'Matemáticas',
            description: 'Descripción de matemáticas'
        };

        const response = await request(app)
            .post('/subject')
            .send(newSubject)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newSubject.name);
        expect(response.body.description).toBe(newSubject.description);
    });


    test('debe obtener todos los subjects', async () => {
        await Subject.create([
            { name: 'Ciencias', description: 'Descripción de ciencias' },
            { name: 'Historia', description: 'Descripción de historia' }
        ]);

        const response = await request(app)
            .get('/subject')
            .expect(200);

        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('description');
    });

    test('debe obtener un subject por ID', async () => {
        const subject = await Subject.create({
            name: 'Geografía',
            description: 'Descripción de geografía'
        });

        const response = await request(app)
            .get(`/subject/${subject._id}`)
            .expect(200);

        expect(response.body).toHaveProperty('_id', subject._id.toString());
        expect(response.body.name).toBe(subject.name);
    });


    test('debe actualizar un subject', async () => {
        const subject = await Subject.create({
            name: 'Física',
            description: 'Descripción de física'
        });

        const updatedSubject = {
            name: 'Física Avanzada',
            description: 'Descripción de física avanzada'
        };

        const response = await request(app)
            .put(`/subject/${subject._id}`)
            .send(updatedSubject)
            .expect(200);

        expect(response.body).toHaveProperty('_id', subject._id.toString());
        expect(response.body.name).toBe(updatedSubject.name);
    });

    test('debe eliminar un subject', async () => {
        
        const subject = await Subject.create({
            name: 'Química',
            description: 'Descripción de química'
        });

        const response = await request(app)
            .delete(`/subject/${subject._id}`)
            .expect(200);

        expect(response.body);
    });

});

jest.setTimeout(30000); // 30 segundos
