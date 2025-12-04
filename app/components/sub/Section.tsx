import React, { ForwardedRef, forwardRef, Ref, useState } from "react"
import { ThemeProvider } from "styled-components";
import { Section as StyledSection } from "@/components/styled/section.styled"

export type StyledTheme = {
    color: string;
    bg: string;
    mode: 'light' | 'dark';
    secondary: string;
}

export const lightTheme: StyledTheme = {
    color: 'black',
    bg: 'white',
    mode: 'light',
    secondary: "#8d8d8d"
}

export const darkTheme: StyledTheme = {
    color: 'white',
    bg: 'black',
    mode: 'dark',
    secondary: "#8d8d8d"
}

type SectionProps = {
    children: React.ReactNode;
    mode?: 'dark' | 'light';
    className?: string;
    ref?: any;
    bg?: string;
}


const Section = React.forwardRef<HTMLDivElement, SectionProps>(({ children, mode, bg, className }, ref) => {

    const selectedTheme = mode && mode === 'dark' ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={selectedTheme}>
            <StyledSection id={className} ref={ref} className={className || undefined} bg={bg}>
                {children}
            </StyledSection>
        </ThemeProvider>
    )
});

export default Section;