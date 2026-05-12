"use client";

import React, { useState } from "react";
import { GalleryItem } from "@/types";
import Image from "next/image";

interface GalleryItemProps {
  item: GalleryItem;
}

const getOptimizedImageUrl = (src: string, size: number) => {
  try {
    const url = new URL(src);

    // Only apply ImageKit transforms to ImageKit-hosted URLs.
    if (!url.hostname.includes("imagekit.io")) {
      return src;
    }

    url.searchParams.set("tr", `w-${size},h-${size},c-maintain_ratio`);
    return url.toString();
  } catch {
    return src;
  }
};

// Helper: get embed URL for videos
const getVideoEmbedInfo = (url: string) => {
  try {
    const urlObj = new URL(url);

    // YouTube
    if (
      urlObj.hostname.includes("youtube.com") ||
      urlObj.hostname.includes("youtu.be")
    ) {
      let videoId = "";
      if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.substring(1);
      } else {
        videoId = urlObj.searchParams.get("v") || "";
      }
      if (videoId) {
        return {
          platform: "youtube",
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }

    // Facebook
    if (
      urlObj.hostname.includes("facebook.com") ||
      urlObj.hostname.includes("fb.watch")
    ) {
      return {
        platform: "facebook",
        embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          url,
        )}`,
      };
    }

    // Instagram
    if (urlObj.hostname.includes("instagram.com")) {
      const postId = urlObj.pathname.match(/\/p\/([^\/]+)/)?.[1];
      if (postId) {
        return {
          platform: "instagram",
          embedUrl: `https://www.instagram.com/p/${postId}/embed/`,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
};

// Helper: get video thumbnail for grid
const getVideoThumbnail = (url: string) => {
  try {
    const urlObj = new URL(url);

    // YouTube
    if (
      urlObj.hostname.includes("youtube.com") ||
      urlObj.hostname.includes("youtu.be")
    ) {
      let videoId = "";
      if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.substring(1);
      } else {
        videoId = urlObj.searchParams.get("v") || "";
      }
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }

    // Facebook/Instagram: must use item.thumbnail
    return null;
  } catch {
    return null;
  }
};

const GalleryItemComponent: React.FC<GalleryItemProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Determine what to show in grid
  let displayImageSrc = "";
  let videoEmbedInfo = null;

  if (item.type === "image") {
    displayImageSrc = getOptimizedImageUrl(item.src, 900);
  } else if (item.type === "video" && item.videoUrl) {
    videoEmbedInfo = getVideoEmbedInfo(item.videoUrl);
    // Show thumbnail if provided, otherwise auto YouTube thumbnail
    displayImageSrc = item.thumbnail || getVideoThumbnail(item.videoUrl) || "";
  }

  // Skip if no src for image or video
  if (
    (item.type === "image" && !displayImageSrc) ||
    (item.type === "video" && !item.videoUrl)
  ) {
    return null;
  }

  return (
    <>
      {/* Gallery Card */}
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all bg-white"
        onClick={openModal}
      >
        <div className="relative w-full aspect-4/3">
          {" "}
          {/* maintains 4:3 aspect ratio */}
          {displayImageSrc ? (
            <Image
              src={displayImageSrc}
              alt={item.title || "Gallery item"}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-sm">
              No thumbnail
            </div>
          )}
        </div>

        {item.title && (
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Type Badge */}
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.type === "image"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {item.type === "image" ? "📷 Image" : "🎥 Video"}
              </span>

              {/* Title */}
              <h3 className="text-sm font-medium text-gray-800 wrap-break-word line-clamp-1 max-w-[70%]">
                {item.title}
              </h3>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeModal}
        >
          <button
            className="absolute cursor-pointer top-4 right-4 text-white text-4xl hover:text-gray-300 transition z-10"
            onClick={closeModal}
            aria-label="Close modal"
          >
            ×
          </button>
          <div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === "image" && item.src ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={getOptimizedImageUrl(item.src, 1600)}
                  alt={item.title || "Gallery image"}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            ) : item.type === "video" && videoEmbedInfo?.embedUrl ? (
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={videoEmbedInfo.embedUrl}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.title || "Video"}
                />
              </div>
            ) : item.type === "video" && item.videoUrl ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-white text-lg mb-4">
                  This video platform is not supported for embedding.
                </p>
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
                >
                  View on Original Platform
                </a>
              </div>
            ) : null}

            {item.title && (
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryItemComponent;
