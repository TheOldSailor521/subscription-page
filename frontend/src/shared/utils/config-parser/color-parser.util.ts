const COLORS: Record<string, [number, number, number]> = {
    cyan: [168, 85, 247],
    teal: [34, 197, 94],
    green: [34, 197, 94],
    lime: [130, 201, 30],
    yellow: [245, 158, 11],
    orange: [245, 158, 11],
    red: [239, 68, 68],
    pink: [230, 73, 128],
    grape: [190, 75, 219],
    violet: [168, 85, 247],
    indigo: [92, 124, 250],
    blue: [168, 85, 247],
    gray: [134, 142, 150],
    dark: [55, 58, 64]
}

const DEFAULT_COLOR = COLORS.cyan

const hexToRgb = (hex: string): [number, number, number] | null => {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return match ? [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)] : null
}

const getRgb = (color: string): [number, number, number] =>
    COLORS[color] ?? hexToRgb(color) ?? DEFAULT_COLOR

export interface ColorGradientStyle {
    background: string
    border: string
    boxShadow?: string
}

export const getColorGradient = (color: string): ColorGradientStyle => {
    const [r, g, b] = getRgb(color)
    return {
        background: `linear-gradient(135deg, rgba(${r},${g},${b},0.15) 0%, rgba(${r},${g},${b},0.08) 100%)`,
        border: `1px solid rgba(${r},${g},${b},0.3)`
    }
}

export const getColorGradientSolid = (color: string): ColorGradientStyle => {
    const [r, g, b] = getRgb(color)
    return {
        background: `color-mix(in srgb, rgb(${r},${g},${b}) 12%, var(--sp-surface))`,
        border: `1px solid rgba(${r},${g},${b},0.3)`
    }
}
