import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Usa ts-jest como preset
  testEnvironment: 'node', // Entorno para pruebas en Node.js
  verbose: true, // Muestra resultados detallados
  moduleFileExtensions: ['ts', 'js'], // Archivos soportados
  testMatch: ['**/*.test.ts'], // Busca archivos .test.ts
  collectCoverage: true, // Habilita la recolección de cobertura
  coverageDirectory: 'coverage', // Directorio donde se guardan los reportes
  coverageReporters: ['lcov', 'text'], // Genera cobertura en formato lcov y texto
  collectCoverageFrom: [ // Archivos a incluir en el análisis de cobertura
    'src/**/*.ts', // Incluye todos los archivos .ts en la carpeta src
    '!src/**/*.d.ts', // Excluye definiciones de tipo
    '!src/**/__tests__/**', // Excluye archivos de pruebas si están en una carpeta __tests__
    '!src/main.ts', // Excluye archivos específicos si es necesario
  ],
};

export default config;
