#!/bin/bash

# Performance Optimization Script for We Will Australia
# This script optimizes large media files for better web performance

echo "🚀 Starting performance optimization..."

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg is not installed. Please install it first:"
    echo "   brew install ffmpeg"
    exit 1
fi

# Create optimized directory
mkdir -p public/optimized

echo "📹 Converting large GIFs to optimized MP4 videos..."

# Convert polar.gif (8.1MB) to MP4
if [ -f "public/home/polar.gif" ]; then
    echo "Converting polar.gif..."
    ffmpeg -i public/home/polar.gif -c:v libx264 -pix_fmt yuv420p -movflags +faststart -crf 28 -vf "scale=min(800\,iw):-1" public/optimized/polar.mp4 -y
    echo "✅ polar.gif converted to polar.mp4"
fi

# Convert bipolar.gif (4MB) to MP4
if [ -f "public/home/bipolar.gif" ]; then
    echo "Converting bipolar.gif..."
    ffmpeg -i public/home/bipolar.gif -c:v libx264 -pix_fmt yuv420p -movflags +faststart -crf 28 -vf "scale=min(800\,iw):-1" public/optimized/bipolar.mp4 -y
    echo "✅ bipolar.gif converted to bipolar.mp4"
fi

echo "🎯 Optimization complete!"
echo ""
echo "📊 File size comparison:"
echo "Original polar.gif: $(du -h public/home/polar.gif 2>/dev/null | cut -f1 || echo 'N/A')"
echo "Optimized polar.mp4: $(du -h public/optimized/polar.mp4 2>/dev/null | cut -f1 || echo 'N/A')"
echo ""
echo "Original bipolar.gif: $(du -h public/home/bipolar.gif 2>/dev/null | cut -f1 || echo 'N/A')"
echo "Optimized bipolar.mp4: $(du -h public/optimized/bipolar.mp4 2>/dev/null | cut -f1 || echo 'N/A')"
echo ""
echo "💡 Next steps:"
echo "1. Update your components to use the optimized MP4 files"
echo "2. Add lazy loading to video elements"
echo "3. Consider using WebP format for static images"
