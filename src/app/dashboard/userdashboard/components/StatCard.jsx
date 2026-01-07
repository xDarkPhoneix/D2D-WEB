const colorClasses = {
    yellow: "from-yellow-400 to-yellow-500",
    blue: "from-blue-400 to-blue-500",
    green: "from-green-400 to-green-500",
    purple: "from-purple-400 to-purple-500",
};

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    color,
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">
                        {title}
                    </p>

                    <h3 className="text-3xl font-bold text-gray-900">
                        {value}
                    </h3>

                    {trend && (
                        <p
                            className={`text-sm mt-2 ${trend.isPositive
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                        >
                            {trend.isPositive ? "↑" : "↓"} {trend.value}
                        </p>
                    )}
                </div>

                <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color] || colorClasses.yellow
                        } flex items-center justify-center`}
                >
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
}
