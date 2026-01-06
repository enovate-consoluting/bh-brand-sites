import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get the hostname from the request
  const hostname = request.headers.get('host') || '';
  // Remove port for local development
  const domain = hostname.split(':')[0];

  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return response;
  }

  // Create Supabase client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Check if domain exists in our database
  const { data: domainData } = await supabase
    .from('client_domains')
    .select('client_id')
    .eq('domain', domain)
    .single();

  if (!domainData) {
    // For development, allow localhost domains
    if (domain === 'localhost' || domain === '127.0.0.1') {
      // Check for a default/demo client or first available client
      const { data: firstClient } = await supabase
        .from('clients')
        .select('client_id')
        .limit(1)
        .single();

      if (firstClient) {
        response.headers.set('x-client-id', firstClient.client_id);
        return response;
      }
    }

    // Domain not found - could redirect to error page
    // For now, continue and let the page handle it
    return response;
  }

  // Set client ID in header for downstream use
  response.headers.set('x-client-id', domainData.client_id);

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
