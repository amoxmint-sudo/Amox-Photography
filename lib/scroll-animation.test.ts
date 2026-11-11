import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  classifyViewportPosition,
  getVariantAnimationStates,
  computeStaggerDelay,
  resolveActiveTimelineIndex,
} from './scroll-animation';

describe('scroll-animation pure logic', () => {
  it('classifies element entering from below on downward scroll as visible and resets when scrolled above', () => {
    const vh = 900;

    // Initially below viewport
    const belowPos = classifyViewportPosition(
      { top: 880, bottom: 1180, height: 300 },
      vh,
      false
    );
    assert.equal(belowPos, 'below');

    // Enters active viewport window while scrolling down
    const enteredPos = classifyViewportPosition(
      { top: 750, bottom: 1050, height: 300 },
      vh,
      false
    );
    assert.equal(enteredPos, 'visible');

    // Remains visible while partially near top edge (hysteresis)
    const nearTopEdgePos = classifyViewportPosition(
      { top: -250, bottom: 50, height: 300 },
      vh,
      true
    );
    assert.equal(nearTopEdgePos, 'visible');

    // Resets to 'above' once completely scrolled past the top of viewport
    const exitedAbovePos = classifyViewportPosition(
      { top: -320, bottom: -20, height: 300 },
      vh,
      true
    );
    assert.equal(exitedAbovePos, 'above');

    // Re-enters from top when scrolling back up!
    const reEnteredFromTopPos = classifyViewportPosition(
      { top: -180, bottom: 120, height: 300 },
      vh,
      false
    );
    assert.equal(reEnteredFromTopPos, 'visible');

    // Exits below when scrolling all the way back up to top of page
    const exitedBelowPos = classifyViewportPosition(
      { top: 920, bottom: 1220, height: 300 },
      vh,
      true
    );
    assert.equal(exitedBelowPos, 'below');
  });

  it('produces tailored animation states for heading, text, image-reveal, card, and section variants', () => {
    const headingBelow = getVariantAnimationStates('heading', 'below', false);
    assert.equal(headingBelow.animate.opacity, 0);
    assert.ok((headingBelow.animate.y ?? 0) > 0);

    const headingVisible = getVariantAnimationStates('heading', 'below', true);
    assert.equal(headingVisible.animate.opacity, 1);
    assert.equal(headingVisible.animate.y, 0);

    // Entering from above (scrolling back up) uses negative y offset so it glides down into place
    const headingAbove = getVariantAnimationStates('heading', 'above', false);
    assert.equal(headingAbove.animate.opacity, 0);
    assert.ok((headingAbove.animate.y ?? 0) < 0);

    // Image reveal includes discreet scale effect
    const imageHidden = getVariantAnimationStates('image-reveal', 'below', false);
    assert.equal(imageHidden.animate.opacity, 0);
    assert.equal(imageHidden.animate.scale, 0.965);

    const imageVisible = getVariantAnimationStates('image-reveal', 'below', true);
    assert.equal(imageVisible.animate.opacity, 1);
    assert.equal(imageVisible.animate.scale, 1);

    // Text reveal has smaller offset than heading for effortless reading
    const textHidden = getVariantAnimationStates('text', 'below', false);
    assert.ok(Math.abs(textHidden.animate.y ?? 0) < Math.abs(headingBelow.animate.y ?? 0));
  });

  it('computes bounded stagger delays for gallery and project cascades', () => {
    assert.equal(computeStaggerDelay(0, 0.065, 6), 0);
    assert.equal(computeStaggerDelay(1, 0.065, 6), 0.065);
    assert.equal(computeStaggerDelay(5, 0.065, 6), 0.325);
    // Wraps cleanly at batch size so items later in a long gallery never stall
    assert.equal(computeStaggerDelay(6, 0.065, 6), 0);
  });

  it('resolves active timeline item index during scroll and returns null when offscreen', () => {
    const vh = 900;

    // All items below active zone
    assert.equal(
      resolveActiveTimelineIndex(
        [
          { top: 820, bottom: 1060, height: 240 },
          { top: 1060, bottom: 1300, height: 240 },
          { top: 1300, bottom: 1540, height: 240 },
        ],
        vh
      ),
      null
    );

    // First item spans focal line (396px)
    assert.equal(
      resolveActiveTimelineIndex(
        [
          { top: 280, bottom: 520, height: 240 },
          { top: 520, bottom: 760, height: 240 },
          { top: 760, bottom: 1000, height: 240 },
        ],
        vh
      ),
      0
    );

    // Second item spans focal line as user scrolls down
    assert.equal(
      resolveActiveTimelineIndex(
        [
          { top: 40, bottom: 280, height: 240 },
          { top: 280, bottom: 520, height: 240 },
          { top: 520, bottom: 760, height: 240 },
        ],
        vh
      ),
      1
    );

    // Third item spans focal line as user scrolls further down
    assert.equal(
      resolveActiveTimelineIndex(
        [
          { top: -200, bottom: 40, height: 240 },
          { top: 40, bottom: 280, height: 240 },
          { top: 280, bottom: 520, height: 240 },
        ],
        vh
      ),
      2
    );

    // All items scrolled above active zone -> returns null so background resets
    assert.equal(
      resolveActiveTimelineIndex(
        [
          { top: -600, bottom: -360, height: 240 },
          { top: -360, bottom: -120, height: 240 },
          { top: -120, bottom: 100, height: 220 },
        ],
        vh
      ),
      null
    );
  });
});

