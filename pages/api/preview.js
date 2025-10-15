export default async function handler(req, res) {
  if (req.query?.secret !== process.env.AGILITY_API_KEY) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  res.setPreviewData({})
  res.redirect('/')
}
