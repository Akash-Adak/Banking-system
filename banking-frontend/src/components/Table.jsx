export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-4 py-3 text-left font-semibold text-gray-600"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}

          {data.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-3">
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
