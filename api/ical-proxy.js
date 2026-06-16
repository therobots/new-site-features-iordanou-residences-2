// api/ical-proxy.js  (Vercel Serverless Function)
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Επιτρέπουμε μόνο Airbnb & Booking.com URLs
  const allowedHosts = ['airbnb.gr', 'airbnb.com', 'booking.com'];
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const isAllowed = allowedHosts.some(host => parsedUrl.hostname.endsWith(host));
  if (!isAllowed) {
    return res.status(403).json({ error: 'URL not allowed' });
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'IordanouResidences/1.0' }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream error' });
    }

    const text = await response.text();
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Cache-Control', 's-maxage=1800'); // 30 λεπτά cache στο Vercel
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: 'Fetch failed', detail: err.message });
  }
}
