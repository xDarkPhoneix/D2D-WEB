export default function SectionHeading({
    title,
    subtitle,
    accent = 'yellow',
    align = 'left',
    className = ''
}) {
    const alignClass = {
        left: 'text-left',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto'
    }[align];

    return (
        <div className={`max-w-3xl ${alignClass} mb-12 md:mb-16 ${className}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight animate-fade-in-up">
                {title}
                {accent === 'yellow' && (
                    <span className="block h-1 w-20 bg-[#F8D200] mt-4"></span>
                )}
            </h2>
            {subtitle && (
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed animate-fade-in-up delay-200">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
