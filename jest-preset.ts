module.exports = {
    preset: 'next/jest',
    testEnvironment: 'jsdom', // Asegúrate de que el entorno de pruebas sea jsdom
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mapea los archivos CSS a un objeto vacío
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma los archivos TS/TSX con ts-jest
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Configura jest-dom para las aserciones
  };
  