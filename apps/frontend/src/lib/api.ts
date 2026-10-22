// Configuración de la API del backend
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Cliente simple para hacer requests al backend
export async function fetchFromBackend(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from backend:', error);
    throw error;
  }
}

// Ejemplo: Verificar salud del backend
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    return await response.json();
  } catch (error) {
    console.error('Backend health check failed:', error);
    return { status: 'DOWN', error: String(error) };
  }
}
