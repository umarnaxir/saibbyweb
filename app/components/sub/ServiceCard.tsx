import { CSSProperties } from "styled-components";
import { Flex, FlexCenter } from "@/components/styled/flex.styled";
import { Heading, Paragraph, Text } from "@/components/styled/text.styled";
import { Button } from "@/components/styled/button.styled";
import { themeColors } from "@/lib/styles/globalStyles";

export type SubService = {
    bit1: string;
    bit2: string;
    lastOne?: boolean;
};

export type ServiceDetails = {
    name: string;
    description: string;
    subServices: SubService[];
    image: string;
    onClick?:() => void;
};

const serviceContainerStyles: CSSProperties = {
    width: '57vw',
  //  height: '490px',
    height: '70vh',
    maxWidth: '800px',
    minWidth: '57vw',
    margin: '0 1rem',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    flexShrink: 0
}

/* mobile styles for service container */
const serviceCardMobileStyles: CSSProperties = {
    width: '100%',
    height: '630px',
    flexDirection: 'column-reverse'
}

/* sub service name */
function SubServiceName({ bit1, bit2, lastOne }: SubService) {
    return (
        <Paragraph
            key={bit1}
            textAlign="right"
            padding='0.6rem 1rem'
            custom={{ width: '100%', borderBottom: !lastOne ? '1px solid rgb(173, 173, 173)' : 'none' }}>
            <Text fontSize="1.8rem" color={themeColors.primary}> {bit1}</Text>
            <Text fontSize="1.8rem" color={themeColors.secondary}> {bit2}</Text>
        </Paragraph>
    )
}

/* text section sttles */
const textSectionStyles = {
    regular: {
        width: '45%',
        height: '100%'
    },
    mobile: {
        height: '45%',
        width: '100%'
    }
}
/* box container (no mobile) */
function BoxContainer() {
    return (<FlexCenter noMobile bg="white" custom={{ height: '100%', width: '25%', justifyContent: 'flex-end' }} customMobile={{ width: '10%' }}>
        {/* box */}
        <Flex bg={themeColors.secondary} custom={{ aspectRatio: '1/1', width: '35%', marginBottom: '120px' }} customMobile={{ width: '60%', marginBottom: '20px' }} />
    </FlexCenter>)
}

/* text and description */
function ServiceNameAndDescription({ name, description }: { name: string; description: string; }) {
    return (<FlexCenter onlyJustify col bg="white" padding="1rem 2rem" width="100%" custom={{ flexGrow: 5 }}>
        <Heading as="h4" color={themeColors.primary} fontSize="2.7rem" font="regular" customMobile={{
            fontSize: '2.5rem'
        }}> {name} </Heading>
        <Paragraph color="gray" fontSize="1.4rem" customMobile={{
            fontSize: '1.4rem'
        }}> {description}</Paragraph>
        <Button onlyBorder margin="0"> learn more </Button>
    </FlexCenter>)
}

function ServiceCard({ name, description, subServices, image, onClick}: ServiceDetails) {
    return (
        <Flex className="service-card reveal" custom={serviceContainerStyles} customMobile={serviceCardMobileStyles}>
            {/* text section */}
            <Flex col custom={textSectionStyles.regular} customMobile={textSectionStyles.mobile}>
                {/* text block */}
                <FlexCenter bg="white" custom={{ flexGrow: 1 }} onClick={onClick}>
                    {/* box container (no mobile) */}
                    <BoxContainer />
                    {/* service name and description */}
                    <ServiceNameAndDescription name={name} description={description} />
                </FlexCenter>


                {/* sub services list */}
                <Flex col bg="white" width="100%" custom={{ flexGrow: 0, justifyContent: 'flex-end' }}>
                    {subServices.map(({ bit1, bit2 }, index) =>
                        <SubServiceName key={bit1} bit1={bit1} bit2={bit2} lastOne={index === subServices.length - 1} />
                    )}
                </Flex>
            </Flex>
            {/* image section */}
            <Flex
                width="55%"
                bgImage={'/images/services/' + image}
                height="100%"
                custom={{backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
                customMobile={{ height: '55%', width: '100%' }}
            >
            </Flex>

        </Flex>)
}

export default ServiceCard;
