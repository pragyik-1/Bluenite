import type { ActionReturn } from "svelte/action";
import { computePosition, flip, shift, offset, autoUpdate, size } from '@floating-ui/dom';

export function clickOutside(node: HTMLElement, handler: (e?: Event) => void): ActionReturn {
    const handleClick = (event: MouseEvent): void => {
        if (node && !node.contains(event.target as Node)) {
            handler()
        }
    }

    document.addEventListener('click', handleClick, true)

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true)
        }
    }
}

interface AnchorOptions {
    anchorElement: HTMLElement | null;
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end';
    offsetDistance?: number;
}

export function floatingAnchor(
    node: HTMLElement,
    options: AnchorOptions
): ActionReturn<AnchorOptions> {
    let cleanup: (() => void) | null = null;

    function updatePosition() {
        if (!options.anchorElement || !node) return;

        computePosition(options.anchorElement, node, {
            placement: options.placement || 'bottom-start',
            middleware: [
                offset(options.offsetDistance ?? 8),
                flip(),
                shift({ padding: 8 }),
                size({
                    apply({ rects }) {
                        Object.assign(node.style, {
                            width: `${rects.reference.width}px`,
                            boxSizing: 'border-box'
                        });
                    }
                })
            ]
        }).then(({ x, y }) => {
            Object.assign(node.style, {
                left: `${x}px`,
                top: `${y}px`,
                position: 'absolute'
            });
        });
    }

    function setup() {
        if (cleanup) cleanup();
        if (options.anchorElement) {
            cleanup = autoUpdate(options.anchorElement, node, updatePosition);
        }
    }

    setup();

    return {
        update(newOptions) {
            options = newOptions;
            setup();
        },
        destroy() {
            if (cleanup) cleanup();
        }
    };
}