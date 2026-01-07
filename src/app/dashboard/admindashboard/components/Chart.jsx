const colorClasses = {
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
};

export default function Chart({
  data,
  type,
  color,
  label,
}) {
  const maxValue = Math.max(
    ...data.map((d) => d.users || d.requests || 0)
  );

  const getValue = (item) => item.users || item.requests || 0;

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        {label}
      </h3>

      <div className="flex items-end justify-between gap-2 h-64">
        {data.map((item, index) => {
          const value = getValue(item);
          const height = maxValue ? (value / maxValue) * 100 : 0;

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="relative w-full flex items-end justify-center h-48">
                <div
                  className={`w-full ${
                    colorClasses[color] || colorClasses.blue
                  } rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer group relative`}
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {value}
                  </div>
                </div>
              </div>

              <span className="text-xs font-medium text-gray-600">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
