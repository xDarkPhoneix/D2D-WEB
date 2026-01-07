export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 bg-gray-50"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function TableRow({ children, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-gray-100 ${
        onClick ? "hover:bg-gray-50 cursor-pointer" : ""
      } transition-colors`}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className = "" }) {
  return (
    <td className={`py-3 px-4 text-sm text-gray-900 ${className}`}>
      {children}
    </td>
  );
}
