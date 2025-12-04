import { ThemeProvider, useTheme } from "styled-components";
import { darkTheme, lightTheme, StyledTheme } from "./Section";
import { Flex, FlexCenter } from "@/components/styled/flex.styled";
import { Heading, Paragraph } from "@/components/styled/text.styled";
import { themeColors } from "@/lib/styles/globalStyles";

export type SectionHeadingProps = {
    title: string;
    tagline: string;
    mode?: 'dark' | 'light';
    className?: string;
}


export default function SectionHeading({ mode, title, tagline, className }: SectionHeadingProps) {

    const theme = useTheme() as StyledTheme

    let selectedTheme = lightTheme;
    let invertedTheme = darkTheme;

    /* if dark mode selected */
    if ( (theme.mode && theme.mode === 'light') || mode === "light") {
        selectedTheme = darkTheme;
        invertedTheme = lightTheme;
    }

    return (
        <FlexCenter className={className} col custom={{ position: 'relative', zIndex: 11 }} customMobile={{ marginLeft: '0%', width: '100%', marginTop: '-1px', zIndex: 11, position: 'sticky', top: 0 }}>
            <ThemeProvider theme={selectedTheme}>
                {/* heading and square */}
                <FlexCenter bg={selectedTheme.bg} gap="10px" width="15%" custom={{ height: '7vh' }} customMobile={{ padding: "1rem 2rem 1rem 2rem",  height: '13vw', width: '55%' }}>
                    {/* scroll bar overlap area */}
                    <Flex
                        noMobile
                        height="0.6rem"
                        width="15%"
                        custom={{ position: 'absolute', top: 0, left: '42.5%', zIndex: 11 }}
                        customMobile={{ width: '100%', left: 0 }}
                        bg="#60b160"> </Flex>



                    <Flex bg={selectedTheme.color} height="1.4rem" width="1.5rem"
                        custom={{
                            transform: 'rotate(-20deg)'
                        }}></Flex>

                    <Heading as="h5"
                        font="secondary"
                        custom={{
                            fontSize: '1.5rem',
                            margin: '0'
                        }}
                        customMobile={{ fontSize: '1.7rem' }}> {title} </Heading>
                </FlexCenter>


                {/* tagline */}
                {/* <Paragraph noMobile color={selectedTheme.bg} font="regular" custom={{
                    padding: '5px 0 0 0',
                    fontSize: '1.4rem'
                }}
                    customMobile={{ fontSize: '1.2rem' }}>
                    {tagline}
                </Paragraph> */}
            </ThemeProvider>
        </FlexCenter >

    )
}