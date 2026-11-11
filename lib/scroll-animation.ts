export type RevealVariant =
  | 'fade-up'
  | 'fade-in'
  | 'heading'
  | 'text'
  | 'image-reveal'
  | 'card'
  | 'section'
  | 'slide-left'
  | 'slide-right';

export type ViewportPosition = 'above' | 'visible' | 'below';

export interface ElementRectLike {
  top: number;
  bottom: number;
  height: number;
}

export interface AnimationTargetState {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
}

export interface VariantTransitionConfig {
  initial: AnimationTargetState;
  animate: AnimationTargetState;
  defaultDuration: number;
  ease: [number, number, number, number];
}

export const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const IMAGE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Classifies an element's vertical position relative to the viewport with hysteresis:
 * - 'visible': Any meaningful part of the element is inside the active viewport trigger window,
 *   or the element is still partially on-screen once already revealed.
 * - 'above': The element has scrolled completely above the top of the viewport.
 * - 'below': The element is completely below the active bottom trigger line of the viewport.
 */
export function classifyViewportPosition(
  rect: ElementRectLike,
  viewportHeight: number,
  currentlyVisible: boolean
): ViewportPosition {
  if (viewportHeight <= 0) {
    return 'visible';
  }

  // Hysteresis: if already visible, stay visible until the element completely exits
  // the top or bottom of the viewport (prevents boundary flicker while reading).
  if (currentlyVisible) {
    if (rect.bottom <= -4) {
      return 'above';
    }
    if (rect.top >= viewportHeight + 4) {
      return 'below';
    }
    return 'visible';
  }

  // When not currently visible, trigger visibility as soon as the element enters
  // the active viewport window (from top 4% down to bottom 94% of viewport).
  const enterBottomLimit = viewportHeight * 0.94;
  const enterTopLimit = viewportHeight * 0.04;

  if (rect.bottom <= enterTopLimit) {
    return 'above';
  }
  if (rect.top >= enterBottomLimit) {
    return 'below';
  }
  return 'visible';
}

/**
 * Computes initial/hidden and animate/visible states for a given editorial variant
 * and the direction from which the element will enter ('above' when scrolling up,
 * 'below' when scrolling down).
 */
export function getVariantAnimationStates(
  variant: RevealVariant,
  offscreenPosition: Exclude<ViewportPosition, 'visible'> = 'below',
  isVisible: boolean = false
): VariantTransitionConfig {
  // Direction multiplier: +1 when entering from below (scrolling down),
  // -0.75 when entering from above (scrolling back up) for natural directional flow.
  const dir = offscreenPosition === 'above' ? -0.75 : 1;

  switch (variant) {
    case 'fade-in': {
      const hidden: AnimationTargetState = { opacity: 0 };
      const shown: AnimationTargetState = { opacity: 1 };
      return {
        initial: hidden,
        animate: isVisible ? shown : hidden,
        defaultDuration: 0.65,
        ease: EDITORIAL_EASE,
      };
    }

    case 'heading': {
      const yOffset = Math.round(22 * dir);
      const hidden: AnimationTargetState = { opacity: 0, y: yOffset };
      const shown: AnimationTargetState = { opacity: 1, y: 0 };
      return {
        initial: hidden,
        animate: isVisible ? shown : hidden,
        defaultDuration: 0.78,
        ease: EDITORIAL_EASE,
      };
    }

    case 'text': {
      const yOffset = Math.round(14 * dir);
      const hidden: AnimationTargetState = { opacity: 0, y: yOffset };
      const shown: AnimationTargetState = { opacity: 1, y: 0 };
      return {
        initial: hidden,
        animate: isVisible ? shown : hidden,
        defaultDuration: 0.66,
        ease: EDITORIAL_EASE,
      };
    }

    case 'image-reveal': {
      const yOffset = Math.round(18 * dir);
      const hidden: AnimationTargetState = {
        opacity: 0,
        y: yOffset,
        scale: 0.965,
      };
      const shown: AnimationTargetState = {
        opacity: 1,
        y: 0,
        scale: 1,
      };
      return {
        initial: hidden,
        animate: isVisible ? shown : hidden,
        defaultDuration: 0.86,
        ease: IMAGE_EASE,
      };
    }

    case 'card': {
      const yOffset = Math.round(20 * dir);
      const hidden: AnimationTargetState = {
        opacity: 0,
        y: yOffset,
        scale: 0.985,
      };
      const shown: AnimationTargetState = {
        opacity: 1,
        y: 0,
        scale: 1,
      };
      return {
        initial: hidden,
        animate: isVisible ? shown : hidden,
        defaultDuration: 0.68,
        ease: EDITORIAL_EASE,
      };
    }

    case 'section': {
      const yOffset = Math.round(20 * dir);
      const hidden: AnimationTargetState = {
        opacity: 0,
        y: yOffset,
      };
      const shown: AnimationTargetState = {
        opacity: 1,
        y: 0,
      };
      return {
        initial: hidden,
        animate: isVisible ? shown : hidden,
        defaultDuration: 0.8,
        ease: EDITORIAL_EASE,
      };
    }

    case 'slide-left': {
      const hidden: AnimationTargetState = { opacity: 0, x: -22, y: 0 };
      const shown: AnimationTargetState = { opacity: 1, x: 0, y: 0 };
      return {
        initial: hidden,
        animate: isVisible ? shown : hidden,
        defaultDuration: 0.72,
        ease: EDITORIAL_EASE,
      };
    }

    case 'slide-right': {
      const hidden: AnimationTargetState = { opacity: 0, x: 22, y: 0 };
      const shown: AnimationTargetState = { opacity: 1, x: 0, y: 0 };
      return {
        initial: hidden,
        animate: isVisible ? shown : hidden,
        defaultDuration: 0.72,
        ease: EDITORIAL_EASE,
      };
    }

    case 'fade-up':
    default: {
      const yOffset = Math.round(22 * dir);
      const hidden: AnimationTargetState = { opacity: 0, y: yOffset };
      const shown: AnimationTargetState = { opacity: 1, y: 0 };
      return {
        initial: hidden,
        animate: isVisible ? shown : hidden,
        defaultDuration: 0.72,
        ease: EDITORIAL_EASE,
      };
    }
  }
}

/**
 * Calculates a bounded stagger delay for grid/list items so cascades remain
 * crisp and never make the user wait too long on large galleries.
 */
export function computeStaggerDelay(
  index: number,
  stepSeconds = 0.065,
  batchSize = 6
): number {
  const safeIndex = Math.max(0, index);
  const slot = safeIndex % Math.max(1, batchSize);
  return Number((slot * stepSeconds).toFixed(3));
}

/**
 * Determines which chronological timeline item index is currently active in the
 * viewport during scrolling so the timeline node marker and text background
 * highlight stay synchronized.
 *
 * Returns `null` when no timeline item is within the active reading band.
 */
export function resolveActiveTimelineIndex(
  rects: ElementRectLike[],
  viewportHeight: number
): number | null {
  if (!rects.length || viewportHeight <= 0) {
    return null;
  }

  const topThreshold = viewportHeight * 0.14;
  const bottomThreshold = viewportHeight * 0.84;
  const focalY = viewportHeight * 0.44;

  let closestIndex: number | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (let i = 0; i < rects.length; i++) {
    const rect = rects[i];
    // Item must intersect the active reading zone of the viewport
    if (rect.bottom <= topThreshold || rect.top >= bottomThreshold) {
      continue;
    }

    // If the item directly spans the natural reading focal line, it is active
    if (rect.top <= focalY && rect.bottom >= focalY) {
      return i;
    }

    const center = (rect.top + rect.bottom) / 2;
    const distance = Math.abs(center - focalY);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
}

