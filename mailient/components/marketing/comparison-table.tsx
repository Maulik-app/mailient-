import Link from "next/link";
import { COMPARISON_ROWS, type ComparisonCell, type ComparisonRows } from "@/content/types";

type Column = { name: string; rows: ComparisonRows };

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

function SourceLine({ cell }: { cell: ComparisonCell }) {
  const internal = cell.source.startsWith("/");
  const label = internal ? "Mailient facts" : new URL(cell.source).hostname.replace(/^www\./, "");
  const className = "underline decoration-white/20 underline-offset-2 hover:decoration-white";
  return (
    <span className="mt-1 block text-xs text-neutral-500">
      {internal ? (
        <Link href={cell.source} className={className}>
          {label}
        </Link>
      ) : (
        <a href={cell.source} rel="nofollow noopener" className={className}>
          {label}
        </a>
      )}
      {" · checked "}
      <time dateTime={cell.lastVerified}>{shortDate(cell.lastVerified)}</time>
    </span>
  );
}

export function ComparisonTable({ columns, caption }: { columns: Column[]; caption: string }) {
  return (
    <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <caption className="px-4 pt-4 text-left text-xs text-neutral-500">{caption}</caption>
        <thead>
          <tr className="border-b border-white/10">
            <th scope="col" className="w-1/4 px-4 py-3 font-medium text-neutral-500">
              <span className="sr-only">Question</span>
            </th>
            {columns.map((c) => (
              <th key={c.name} scope="col" className="px-4 py-3 font-semibold text-white">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row) => (
            <tr key={row.key} className="border-b border-white/5 last:border-0 align-top">
              <th scope="row" className="px-4 py-3 font-medium text-neutral-300">
                {row.label}
              </th>
              {columns.map((c) => (
                <td key={c.name} className="px-4 py-3 leading-relaxed text-neutral-300">
                  {c.rows[row.key].value}
                  <SourceLine cell={c.rows[row.key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
