import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Kenneth Osorio Blog';
    const description = searchParams.get('description') || 'Technical insights and thoughts.';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            backgroundColor: '#0b0f0c',
            color: 'white',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: '20px' }}>{title}</div>
          <div style={{ fontSize: 24, color: '#89938b', maxWidth: '800px' }}>{description}</div>
          <div style={{ fontSize: 20, color: '#0070f3', marginTop: '40px' }}>blog.kennethosorio.dev</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
