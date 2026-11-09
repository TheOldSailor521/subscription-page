import {
    ActionIcon,
    Box,
    Container,
    Group,
    Image,
    Stack,
    Text,
    Title,
    useComputedColorScheme,
    useMantineColorScheme
} from '@mantine/core'
import { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'
import { IconMoon, IconSun } from '@tabler/icons-react'
import {
    AccordionBlockRenderer,
    CardsBlockRenderer,
    InstallationGuideConnector,
    MinimalBlockRenderer,
    RawKeysWidget,
    SubscriptionInfoCardsWidget,
    SubscriptionInfoCollapsedWidget,
    SubscriptionInfoExpandedWidget,
    SubscriptionLinkWidget,
    TimelineBlockRenderer
} from '@widgets/main'

import { Page, RemnawaveLogo } from '@shared/ui'
import { LanguagePicker } from '@shared/ui/language-picker/language-picker.shared'

import { useAppConfig, useAppConfigStoreActions, useCurrentLang } from '@entities/app-config-store'

import classes from './main.page.module.css'

interface IMainPageComponentProps {
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
}

const BLOCK_RENDERERS = {
    cards: CardsBlockRenderer,
    timeline: TimelineBlockRenderer,
    accordion: AccordionBlockRenderer,
    minimal: MinimalBlockRenderer
} as const

const SUBSCRIPTION_INFO_BLOCK_RENDERERS = {
    cards: SubscriptionInfoCardsWidget,
    collapsed: SubscriptionInfoCollapsedWidget,
    expanded: SubscriptionInfoExpandedWidget,
    hidden: null
} as const

export const MainPageComponent = ({ isMobile, platform }: IMainPageComponentProps) => {
    const config = useAppConfig()
    const currentLang = useCurrentLang()
    const { setLanguage } = useAppConfigStoreActions()

    const brandName = config.brandingSettings.title
    let hasCustomLogo = !!config.brandingSettings.logoUrl

    if (hasCustomLogo) {
        if (config.brandingSettings.logoUrl.includes('docs.rw')) {
            hasCustomLogo = false
        }
    }

    const hasPlatformApps: Record<TSubscriptionPagePlatformKey, boolean> = {
        ios: Boolean(config.platforms.ios?.apps.length),
        android: Boolean(config.platforms.android?.apps.length),
        linux: Boolean(config.platforms.linux?.apps.length),
        macos: Boolean(config.platforms.macos?.apps.length),
        windows: Boolean(config.platforms.windows?.apps.length),
        androidTV: Boolean(config.platforms.androidTV?.apps.length),
        appleTV: Boolean(config.platforms.appleTV?.apps.length)
    }

    const atLeastOnePlatformApp = Object.values(hasPlatformApps).some((value) => value)

    const SubscriptionInfoBlockRenderer =
        SUBSCRIPTION_INFO_BLOCK_RENDERERS[config.uiConfig.subscriptionInfoBlockType]

    const { setColorScheme } = useMantineColorScheme()
    const colorScheme = useComputedColorScheme('dark')
    const ru = currentLang === 'ru'

    return (
        <Page>
            <a className="skip-link" href="#subscription-content">
                {ru ? 'К содержимому' : 'Skip to content'}
            </a>
            <header className="header-wrapper">
                <Container className={classes.container}>
                    <Group justify="space-between" wrap="nowrap" h={80}>
                        <Group gap={12} wrap="nowrap" className={classes.brand}>
                            <Box className={classes.brandMark}>
                                {hasCustomLogo ? (
                                    <Image
                                        alt=""
                                        fit="contain"
                                        src={config.brandingSettings.logoUrl}
                                        w={28}
                                        h={28}
                                    />
                                ) : (
                                    <RemnawaveLogo c="var(--sp-accent)" size={28} />
                                )}
                            </Box>
                            <Text fw={650} size="lg" className={classes.brandName}>
                                {brandName}
                            </Text>
                        </Group>
                        <Group gap={8} wrap="nowrap">
                            <LanguagePicker
                                currentLang={currentLang}
                                locales={config.locales}
                                onLanguageChange={setLanguage}
                            />
                            <ActionIcon
                                aria-label={
                                    ru
                                        ? colorScheme === 'dark'
                                            ? 'Включить светлую тему'
                                            : 'Включить тёмную тему'
                                        : colorScheme === 'dark'
                                          ? 'Switch to light theme'
                                          : 'Switch to dark theme'
                                }
                                aria-pressed={colorScheme === 'light'}
                                onClick={() =>
                                    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
                                }
                                size={44}
                                variant="default"
                                radius="md"
                            >
                                {colorScheme === 'dark' ? (
                                    <IconSun size={20} />
                                ) : (
                                    <IconMoon size={20} />
                                )}
                            </ActionIcon>
                        </Group>
                    </Group>
                </Container>
            </header>

            <Container className={classes.container} id="subscription-content" tabIndex={-1}>
                <section className={classes.intro} aria-labelledby="subscription-title" data-enter>
                    <div>
                        <Text className={classes.eyebrow}>
                            {ru ? 'Личный кабинет' : 'Your account'}
                        </Text>
                        <Title id="subscription-title" order={1} className={classes.title}>
                            {ru ? 'Ваша подписка' : 'Your subscription'}
                        </Title>
                        <Text className={classes.description}>
                            {ru
                                ? 'Всё для подключения — в одном месте.'
                                : 'Everything you need to connect, in one place.'}
                        </Text>
                    </div>
                    <SubscriptionLinkWidget
                        hideGetLink={config.baseSettings.hideGetLinkButton}
                        supportUrl={config.brandingSettings.supportUrl}
                    />
                </section>

                <Stack gap={28} className={classes.content}>
                    {SubscriptionInfoBlockRenderer && (
                        <SubscriptionInfoBlockRenderer isMobile={isMobile} />
                    )}
                    {atLeastOnePlatformApp && (
                        <InstallationGuideConnector
                            BlockRenderer={
                                BLOCK_RENDERERS[config.uiConfig.installationGuidesBlockType]
                            }
                            hasPlatformApps={hasPlatformApps}
                            isMobile={isMobile}
                            platform={platform}
                        />
                    )}
                    <RawKeysWidget isMobile={isMobile} />
                </Stack>
                <footer className={classes.footer}>
                    <Text size="xs">{brandName}</Text>
                    <Text size="xs">{ru ? 'Страница подписки' : 'Subscription page'}</Text>
                </footer>
            </Container>
        </Page>
    )
}
