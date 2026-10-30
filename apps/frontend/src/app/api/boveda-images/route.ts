import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const bovedaPath = path.join(process.cwd(), 'public', 'images', 'boveda');
    const files = fs.readdirSync(bovedaPath);
    
    // Filtrar solo imágenes (excluir archivos .txt, .md, .zip, etc.)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.HEIC'];
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading boveda images:', error);
    return NextResponse.json({ images: [] });
  }
}
