import { Box, Button, Text, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom";
const Admin = () => {
    return (
        <div>
               <Box borderWidth={2} p={3} rounded={5} width={400} mx={'auto'}>
          <Text textAlign="center" fontWeight="bold" fontSize="xx-large">
                Hai Admin, {user.name}
            </Text>
             <Flex justify="center" mb={6}>
          
            <Button onClick={logout} colorScheme="teal" mr={4}>Logout</Button>
          
        
        </Flex>
        </Box>
        </div>
    )
}

export default Admin;