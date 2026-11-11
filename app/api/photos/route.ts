import { NextResponse } from 'next/server';
import { discoverPortfolioPhotos } from '@/lib/photo-discovery';
import { PHOTO_GALLERY_CATEGORIES } from '@/lib/photo-categories';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = discoverPortfolioPhotos();

  return NextResponse.json(
    {
      items: result.items,
      countsByCategory: result.countsByCategory,
      source: result.source,
      categories: PHOTO_GALLERY_CATEGORIES.map((cat) => ({
        id: cat.id,
        folderName: cat.folderName,
        label: cat.label,
      })),
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
