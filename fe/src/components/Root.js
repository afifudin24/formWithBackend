import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Root = ({ user, setUser }) => {
    
    return (
        <div>
              <Box p={4}>
        <Flex justify="center" mb={6}>
          <Heading as="h1" size="lg">Welcome to Simple Auth With Chakra UI</Heading>
        </Flex>
        
        <Flex justify="center" mb={6}>
          <Link to="/login">
            <Button colorScheme="teal" mr={4}>Login</Button>
          </Link>
          <Link to="/register">
            <Button colorScheme="blue">Register</Button>
          </Link>
                </Flex>
                </Box>
        </div>
    )
}
export default Root;