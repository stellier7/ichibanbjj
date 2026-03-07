import { NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { imageSize } from 'image-size';

export async function GET() {
  try {
    const imagesDir = join(process.cwd(), 'public', 'images', 'ichiban-daily');

    // Read all files from the directory
    const files = await readdir(imagesDir);

    // Filter for image files and sort alphabetically (so 01-, 02- prefixes control order)
    const imageFiles = files
      .filter((file) => {
        const ext = file.toLowerCase().split('.').pop();
        return ['jpg', 'jpeg', 'png', 'webp'].includes(ext || '');
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    // Create image URLs with dimensions and orientation
    const images = await Promise.all(
      imageFiles.map(async (filename, index) => {
        let width = 0;
        let height = 0;
        let orientation: 'portrait' | 'landscape' = 'landscape';

        try {
          const filePath = join(imagesDir, filename);
          const buffer = await readFile(filePath);
          const dimensions = imageSize(buffer);
          if (dimensions?.width && dimensions?.height) {
            width = dimensions.width;
            height = dimensions.height;
            orientation = height > width ? 'portrait' : 'landscape';
          }
        } catch {
          // Default to landscape if we can't read dimensions
        }

        return {
          id: `img-${index}`,
          filename,
          url: `/images/ichiban-daily/${encodeURIComponent(filename)}`,
          displayOrder: index,
          active: true,
          width,
          height,
          orientation,
        };
      })
    );

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading images:', error);
    // Return empty array if directory doesn't exist yet
    return NextResponse.json({ images: [] });
  }
}
