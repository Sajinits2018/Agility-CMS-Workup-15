import agility from '@agility/content-fetch'

export function getAgilityClient() {
  const guid = process.env.AGILITY_GUID
  const apiKey = process.env.AGILITY_API_KEY
  const isPreview = (process.env.AGILITY_IS_PREVIEW || 'false') === 'true'
  if (!guid || !apiKey) throw new Error('Missing AGILITY_GUID or AGILITY_API_KEY')
  return agility.getApi({ guid, apiKey, isPreview })
}
