import { createTheme, CSSVariablesResolver, v8CssVariablesResolver } from '@mantine/core'

import components from './overrides'

export const theme = createTheme({
    components,
    cursorType: 'pointer',
    fontFamily: 'Montserrat, Vazirmatn, Noto Sans SC, sans-serif',
    fontFamilyMonospace: 'Fira Mono, monospace',
    headings: { fontFamily: 'Montserrat, Vazirmatn, Noto Sans SC, sans-serif', fontWeight: '600' },
    focusRing: 'auto',
    defaultRadius: 'md',
    autoContrast: true,
    primaryColor: 'violet',
    primaryShade: 6,
    colors: {
        violet: [
            '#F3E8FF',
            '#E9D5FF',
            '#D8B4FE',
            '#C4B5FD',
            '#C084FC',
            '#B46AF8',
            '#A855F7',
            '#9333EA',
            '#7E22CE',
            '#581C87'
        ],
        green: [
            '#F0FDF4',
            '#DCFCE7',
            '#BBF7D0',
            '#86EFAC',
            '#4ADE80',
            '#22C55E',
            '#22C55E',
            '#15803D',
            '#166534',
            '#14532D'
        ],
        yellow: [
            '#FFFBEB',
            '#FEF3C7',
            '#FDE68A',
            '#FCD34D',
            '#FBBF24',
            '#F59E0B',
            '#F59E0B',
            '#B45309',
            '#92400E',
            '#78350F'
        ],
        orange: [
            '#FFFBEB',
            '#FEF3C7',
            '#FDE68A',
            '#FCD34D',
            '#FBBF24',
            '#F59E0B',
            '#F59E0B',
            '#B45309',
            '#92400E',
            '#78350F'
        ],
        red: [
            '#FEF2F2',
            '#FEE2E2',
            '#FECACA',
            '#FCA5A5',
            '#F87171',
            '#EF4444',
            '#EF4444',
            '#B91C1C',
            '#991B1B',
            '#7F1D1D'
        ]
    },
    radius: { xs: '6px', sm: '10px', md: '14px', lg: '20px', xl: '28px' },
    breakpoints: { xs: '25em', sm: '30em', md: '48em', lg: '64em', xl: '80em' }
})

export const cssVariablesResolver: CSSVariablesResolver = (theme) => {
    const legacy = v8CssVariablesResolver(theme)
    return {
        variables: {
            ...legacy.variables,
            '--sp-accent': '#A855F7',
            '--sp-success': '#22C55E',
            '--sp-warning': '#F59E0B',
            '--sp-error': '#EF4444'
        },
        dark: {
            ...legacy.dark,
            '--sp-bg': '#0F0A1A',
            '--sp-surface': '#1E1B2E',
            '--sp-text': '#FAF5FF',
            '--sp-muted': '#C4B5FD',
            '--sp-border': '#393047',
            '--sp-tint': '#292038',
            '--sp-accent-text': '#C4B5FD',
            '--mantine-color-body': '#0F0A1A',
            '--mantine-color-text': '#FAF5FF',
            '--mantine-color-dimmed': '#C4B5FD',
            '--mantine-color-default': '#1E1B2E',
            '--mantine-color-default-hover': '#292038',
            '--mantine-color-default-color': '#FAF5FF',
            '--mantine-color-default-border': '#393047',
            '--mantine-color-placeholder': '#C4B5FD'
        },
        light: {
            ...legacy.light,
            '--sp-bg': '#F3E8FF',
            '--sp-surface': '#FAF5FF',
            '--sp-text': '#581C87',
            '--sp-muted': '#7E22CE',
            '--sp-border': '#DDD0ED',
            '--sp-tint': '#EDE0FA',
            '--sp-accent-text': '#7E22CE',
            '--mantine-color-body': '#F3E8FF',
            '--mantine-color-text': '#581C87',
            '--mantine-color-dimmed': '#7E22CE',
            '--mantine-color-default': '#FAF5FF',
            '--mantine-color-default-hover': '#EDE0FA',
            '--mantine-color-default-color': '#581C87',
            '--mantine-color-default-border': '#DDD0ED',
            '--mantine-color-placeholder': '#7E22CE'
        }
    }
}
