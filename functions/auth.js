// Cloudflare Pages Function for GitHub OAuth
// Handles the OAuth callback for Decap CMS

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Get OAuth code from callback
  const code = url.searchParams.get('code');
  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.OAUTH_CLIENT_ID,
        client_secret: env.OAUTH_CLIENT_SECRET,
        code: code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      console.error('OAuth error:', data);
      return new Response(`OAuth error: ${data.error_description}`, { status: 400 });
    }

    // Redirect back to CMS with the access token
    const redirectUrl = `${url.origin}/admin/#access_token=${data.access_token}&token_type=bearer`;
    return Response.redirect(redirectUrl, 301);

  } catch (error) {
    console.error('OAuth exchange failed:', error);
    return new Response('Authentication failed', { status: 500 });
  }
}
