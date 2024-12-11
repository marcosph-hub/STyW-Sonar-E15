import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Usa ts-jest como preset
  testEnvironment: 'node', // Entorno para pruebas en Node.js
  verbose: true, // Muestra resultados detallados
  moduleFileExtensions: ['ts', 'js'], // Archivos soportados
  testMatch: ['**/*.test.ts'], // Busca archivos de prueba en /server/test
  collectCoverage: true, // Habilita la recolección de cobertura
  coverageDirectory: '<rootDir>/coverage', // Directorio donde se guardan los reportes
  coverageReporters: ["json", "lcov", "text", "clover"], // Genera cobertura en formato lcov y texto

};

export default config;
