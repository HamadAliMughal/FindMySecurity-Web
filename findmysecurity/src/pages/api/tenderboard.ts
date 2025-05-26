import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = searchParams.get('page') || '1';

    const res = await fetch(
      `https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?q=${encodeURIComponent(query)}&page=${page}&pageSize=10`
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch external API' }, { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
