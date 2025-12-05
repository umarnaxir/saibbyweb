import { CSSValues } from "@/lib/styles/globalStyles";
import { useTheme } from "styled-components";
import { Flex } from "@/components/styled/flex.styled";
import { Heading, Paragraph, Text } from "@/components/styled/text.styled";
import { StyledTheme } from "@/components/sub/Section";
import { Button } from "@/components/styled/button.styled";

export type WorkTextBlockProps = {
    number?: number;
    name: string;
    description: string;
    techStack: string[];
    className?: string;
    link?: string;
}

const projectNumberStyles: CSSValues = {
    color: '#d1d1d1',
    textAlign: 'left',
    fontSize: '90px',
    width: '300px',
    lineHeight: '90px'
}

const projectNameStyles: CSSValues = {
    textAlign: 'left',
    // fontSize: '80px',
    fontSize: "100px",
    width: '400px',
    lineHeight: '100px'

}

const paragraphStyles: CSSValues = {
    fontSize: '2rem',
    marginBottom: '10px'
}

const chipStyle: CSSValues = {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: '1.375rem',
    // margin: '0 2px',
    borderRadius: '7px',
    padding: '6.25px 15.75px'
}

const chipStyleMobile: CSSValues = {
    fontSize: '1rem',
    // margin: '0 2px',
    borderRadius: '5px',
    padding: '5px 10px'
}

const ParentStyles = (index: number): CSSValues => ({
    padding: '1% 3%',
    marginLeft: '2%',
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    display: 'flex',
    // Opacity, transform, and visibility will be controlled by GSAP
    zIndex: 2
})

const ParentStylesMobile: CSSValues = {
    // position: 'relative',
    padding: '12% 1%', 
    overflow: 'hidden', 
    width: '100%',
    justifyContent: 'center',
    opacity: 1,
    // aspectRatio: 1 / 1,
    transform: 'translateY(0)'
}


function WorkTextBlock({ number, name, description, techStack, className, link }: WorkTextBlockProps) {

    const pStyles = ParentStyles(number ? number - 1 : 0);
    const theme = useTheme() as StyledTheme;

    return (
        <Flex col className={className} custom={pStyles} customMobile={ParentStylesMobile}>
            {/* project number */}
            <Heading custom={projectNumberStyles} customMobile={{ fontSize: '4.5rem', lineHeight: '4.5rem' }}> 0{number} </Heading>
            {/* project name */}
            <Heading color={theme.color} custom={projectNameStyles} customMobile={{ fontSize: '4.3rem', lineHeight: '4.3rem' }}> {name}  </Heading>
            {/* project description */}
            <Paragraph color={theme.color} custom={paragraphStyles} customMobile={{ fontSize: '1.3rem' }}> {description} </Paragraph>
            {/* tech stack */}
            <Flex custom={{
                width: '500px',
                flexWrap: 'wrap',
                gap: '5px'
            }}
                customMobile={{
                    width: '100%'
                }}
            >
                {techStack.map((tech, index) => 
                <Text color={theme.bg} key={index} 
                custom={{...chipStyle, backgroundColor: theme.color}} 
                customMobile={chipStyleMobile} >{tech}</Text>)}
            </Flex>

            {/* learn more button for each project */}
            {link && (
                <Button
                    as="a"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="#white"
                    color="#6dd26d"
                    custom={{ marginTop: "2rem" }}
                    customMobile={{ marginTop: "1.5rem" }}
                >
                    Learn more
                </Button>
            )}

        </Flex>
    )
}

export default WorkTextBlock;