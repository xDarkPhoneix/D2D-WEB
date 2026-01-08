'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({
    end,
    duration = 2000,
    prefix = '',
    suffix = '',
    decimals = 0
}) {
    const [count, setCount] = useState(0);
    const counterRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        animateCounter();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, [hasAnimated]);

    const animateCounter = () => {
        const startTime = Date.now();
        const startValue = 0;
        const endValue = end;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = startValue + (endValue - startValue) * easeOut;

            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(endValue);
            }
        };

        requestAnimationFrame(animate);
    };

    const formatNumber = (num) => {
        return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <span ref={counterRef}>
            {prefix}{formatNumber(count)}{suffix}
        </span>
    );
}
