export default function RichText({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html || '' }} />
}
