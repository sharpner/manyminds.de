#!/usr/bin/env python3
"""
Animate splash image using fal.ai image-to-video models.
"""

import os
import sys
import requests
import fal_client
import base64

if not os.environ.get("FAL_KEY"):
    print("Error: Set FAL_KEY environment variable")
    print("export FAL_KEY='your-api-key'")
    exit(1)

# Animation config
IMAGE_PATH = "images/splash-connected-minds.png"
OUTPUT_PATH = "images/splash-connected-minds-animated.mp4"

# Prompt describing desired motion
MOTION_PROMPT = """
Gentle, dreamy animation of abstract watercolor forms.
The translucent flowing shapes slowly drift and interweave,
suggesting minds connecting in harmony.
Soft, organic movement like ink dispersing in water.
Subtle luminosity pulses where forms meet.
Calm, meditative motion. No sudden changes.
Premium, sophisticated aesthetic.
"""

def image_to_data_uri(path: str) -> str:
    """Convert local image to data URI."""
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode()
    return f"data:image/png;base64,{data}"


def animate_with_kling(image_uri: str) -> str:
    """Use Kling 2.0 Master for high-quality animation."""
    print("\nUsing Kling 2.0 Master...")

    result = fal_client.subscribe(
        "fal-ai/kling-video/v2/master/image-to-video",
        arguments={
            "image_url": image_uri,
            "prompt": MOTION_PROMPT.strip(),
            "duration": "5",
            "aspect_ratio": "16:9"
        }
    )
    return result["video"]["url"]


def animate_with_minimax(image_uri: str) -> str:
    """Use MiniMax Hailuo for animation."""
    print("\nUsing MiniMax Hailuo...")

    result = fal_client.subscribe(
        "fal-ai/minimax/video-01-live/image-to-video",
        arguments={
            "image_url": image_uri,
            "prompt": MOTION_PROMPT.strip()
        }
    )
    return result["video"]["url"]


def animate_with_wan(image_uri: str) -> str:
    """Use Wan 2.5 for animation."""
    print("\nUsing Wan 2.5...")

    result = fal_client.subscribe(
        "fal-ai/wan-25-preview/image-to-video",
        arguments={
            "image_url": image_uri,
            "prompt": MOTION_PROMPT.strip()
        }
    )
    return result["video"]["url"]


def main():
    if not os.path.exists(IMAGE_PATH):
        print(f"Error: Image not found: {IMAGE_PATH}")
        exit(1)

    print(f"\nAnimating: {IMAGE_PATH}")
    print("=" * 60)

    # Convert to data URI for upload
    print("Encoding image...")
    image_uri = image_to_data_uri(IMAGE_PATH)

    # Select model (default: Kling 2.0 Master)
    model = sys.argv[1] if len(sys.argv) > 1 else "kling"

    try:
        if model == "kling":
            video_url = animate_with_kling(image_uri)
        elif model == "minimax":
            video_url = animate_with_minimax(image_uri)
        elif model == "wan":
            video_url = animate_with_wan(image_uri)
        else:
            print(f"Unknown model: {model}")
            print("Available: kling, minimax, wan")
            exit(1)

        # Download video
        print(f"\nDownloading video...")
        response = requests.get(video_url)

        with open(OUTPUT_PATH, "wb") as f:
            f.write(response.content)

        print(f"\nSaved: {OUTPUT_PATH}")
        print("=" * 60)

    except Exception as e:
        print(f"\nError: {e}")
        exit(1)


if __name__ == "__main__":
    main()
