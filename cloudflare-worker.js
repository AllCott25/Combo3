export default {
  async fetch(request, env, ctx) {
    // Get the original response
    const response = await fetch(request);
    
    // Only modify HTML responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
      return response;
    }
    
    // Get the HTML content
    let html = await response.text();
    
    // Inject the Supabase credentials
    const injection = `
    <script>
      window.SUPABASE_URL = '${env.SUPABASE_URL}';
      window.SUPABASE_ANON_KEY = '${env.SUPABASE_ANON_KEY}';
    </script>`;
    
    // Replace the config.js script tag with our injection
    html = html.replace(
      '<script src="js/config.js"></script>',
      injection
    );
    
    // Return modified response
    return new Response(html, {
      headers: response.headers
    });
  }
};