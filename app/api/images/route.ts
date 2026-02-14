import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const imagesDir = join(process.cwd(), 'public', 'images', 'ichiban-daily');
    
    // Read all files from the directory
    const files = await readdir(imagesDir);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = file.toLowerCase().split('.').pop();
      return ['jpg', 'jpeg', 'png', 'webp'].includes(ext || '');
    });
    
    // Create image URLs
    const images = imageFiles.map((filename, index) => ({
      id: `img-${index}`,
      filename,
      url: `/images/ichiban-daily/${filename}`,
      displayOrder: index,
      active: true,
    }));
    
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading images:', error);
    // Return empty array if directory doesn't exist yet
    return NextResponse.json({ images: [] });
  }
}
