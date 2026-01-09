'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';

export default function ImageLightbox({
    images = [],
    initialIndex = 0,
    isOpen,
    onClose
}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    handlePrevious();
                    break;
                case 'ArrowRight':
                    handleNext();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsZoomed(false);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsZoomed(false);
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center animate-fade-in">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close lightbox"
            >
                <X className="w-6 h-6 text-white" />
            </button>

            {/* Zoom Toggle */}
            <button
                onClick={toggleZoom}
                className="absolute top-4 right-20 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Toggle zoom"
            >
                {isZoomed ? (
                    <ZoomOut className="w-6 h-6 text-white" />
                ) : (
                    <ZoomIn className="w-6 h-6 text-white" />
                )}
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
                <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </button>
            )}

            {/* Image Container */}
            <div
                className={`relative max-w-7xl max-h-[90vh] overflow-hidden transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                    }`}
                onClick={toggleZoom}
            >
                {currentImage.src ? (
                    <Image
                        src={currentImage.src}
                        alt={currentImage.alt || `Image ${currentIndex + 1}`}
                        width={1200}
                        height={800}
                        className="object-contain max-h-[90vh] w-auto"
                    />
                ) : (
                    <img
                        src={currentImage}
                        alt={`Image ${currentIndex + 1}`}
                        className="object-contain max-h-[90vh] w-auto"
                    />
                )}
            </div>

            {/* Next Button */}
            {images.length > 1 && (
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-8 h-8 text-white" />
                </button>
            )}

            {/* Image Info */}
            {currentImage.title || currentImage.description && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                    {currentImage.title && (
                        <h3 className="text-xl font-bold mb-2">{currentImage.title}</h3>
                    )}
                    {currentImage.description && (
                        <p className="text-sm text-gray-300">{currentImage.description}</p>
                    )}
                </div>
            )}

            {/* Counter */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 px-4 py-2 rounded-full text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Click outside to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
            />
        </div>
    );
}
