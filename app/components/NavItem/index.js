import { Flex, Icon, Link } from "@chakra-ui/react"

export default function ({ icon, link, children, ...rest }) {
  return (
    <Link
      href={link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="0"
        role="group"
        cursor="pointer"
        borderBottom={"1px"}
        borderColor={"gray.200"}
        _hover={{
          bg: 'gray.200'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={"4"}
            fontSize="16"
            as={icon}
          ></Icon>
        )}
        {children}
      </Flex>
    </Link>
  )
}