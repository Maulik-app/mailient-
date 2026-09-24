type Schema = Record<string, unknown>;

/** Server-rendered JSON-LD. Pass one entity or several; several are emitted as an @graph. */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  const doc = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(doc).replace(/</g, "\\u003c") }}
    />
  );
}
