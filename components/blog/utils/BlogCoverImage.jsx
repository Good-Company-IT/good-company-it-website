"use client"

// Cover images come out of Cloudinary already force-cropped to a consistent
// 1200x630 (the "goco_blog_cover" upload preset), so a plain full-bleed cover
// fill is correct here — no letterboxing, no blur padding needed. The inline
// article image is a separate Cloudinary preset ("goco_blog_aux") that never
// crops, so text-heavy graphics keep their edges intact; that one renders at
// its natural size in the article body, not through this component.
export default function BlogCoverImage({ src, alt, heightClassName = 'h-64 md:h-80' }) {
  if (!src) return null;

  return (
    <div className={`relative overflow-hidden ${heightClassName}`}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
