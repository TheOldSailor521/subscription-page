import { Card, Group, Stack, Text, Title } from '@mantine/core'

import { getLocalizedText } from '@shared/utils/config-parser'

import { IBlockRendererProps } from '../renderer-block.interface'
import classes from './cards-block.module.css'

export const CardsBlockRenderer = ({
    blocks,
    isMobile,
    currentLang,
    renderBlockButtons
}: IBlockRendererProps) => {
    return (
        <div className={classes.steps}>
            {blocks.map((block, index) => {
                return (
                    <Card className={classes.root} key={index} p={0} radius="lg">
                        <Group align="flex-start" gap="md" className={classes.stepInner}>
                            <span className={classes.stepNumber}>
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <Stack gap={isMobile ? 'xs' : 'sm'} style={{ flex: 1, minWidth: 0 }}>
                                <Title
                                    c="var(--sp-text)"
                                    fw={600}
                                    order={3}
                                    style={{ wordBreak: 'break-word' }}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedText(block.title, currentLang)
                                        }}
                                    />
                                </Title>

                                <Text size="sm" style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedText(block.description, currentLang)
                                        }}
                                    />
                                </Text>

                                {renderBlockButtons(block.buttons, 'light')}
                            </Stack>
                        </Group>
                    </Card>
                )
            })}
        </div>
    )
}
