import { useState } from "react";
import {
  Box,
  Heading,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
} from "@chakra-ui/react";
import { isAuthenticated } from "../../apiCalls/auth";
import { uploadProduct } from "../../apiCalls/products";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";

export const Allcategories = [
  "Tools",
  "Art",
  "Accessories",
  "Household",
  "FoodsAndBevarages",
  "Others",
];

const UploadProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    categories: Allcategories,
    category: "",
    loading: false,
    formData: new FormData(),
  });

  const { name, description, price, categories, category, loading, formData } =
    values;

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true });
    uploadProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, loading: false });
          toast.error(data.error);
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            loading: false,
          });
          toast.success(data.message);
        }
      })
      .catch((err) => {
        toast.error("Some error occured, please try again!");
      });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  return (
    <Center w="95vw">
      <VStack spacing="8" mt="20" mb="10">
        <Heading fontSize={{ base: "md", md: "xl", lg: "3xl" }}>
          Upload your product to sell on SellPro
        </Heading>
        <form onSubmit={handleSubmit}>
          <Box
            width="50vw"
            bgColor="gray.900"
            padding="12"
            borderRadius="2xl"
            boxShadow="2xl"
          >
            <FormControl id="name" isRequired>
              <FormLabel>Enter name: </FormLabel>
              <Input
                type="text"
                width="320px"
                required
                value={name}
                name="name"
                onChange={handleChange("name")}
                minLength="3"
                maxLength="32"
              />
            </FormControl>
            <FormControl mt="4" id="description" isRequired>
              <FormLabel>Enter description: </FormLabel>
              <Textarea
                size="sm"
                required
                value={description}
                name="description"
                onChange={handleChange("description")}
                minLength="6"
                maxLength="200"
              />
            </FormControl>
            <FormControl mt="4" id="photo" isRequired>
              <FormLabel>Choose photo: </FormLabel>
              <Input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="Choose product photo"
              />
            </FormControl>
            <FormControl mt="4" id="price" isRequired>
              <FormLabel>Enter price: </FormLabel>
              <Input
                width="200px"
                type="number"
                required
                value={price}
                name="price"
                onChange={handleChange("price")}
                minLength="1"
                maxLength="12"
              />
            </FormControl>
            <Select
              mt="4"
              width="320px"
              size={{ base: "sm", md: "md" }}
              placeholder="Select Category"
              variant="filled"
              onChange={handleChange("category")}
              name="category"
            >
              {categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </Select>
            <Button
              mt="4"
              type="submit"
              loadingText="Uploading product"
              isLoading={loading}
              size="lg"
              bg={"green.600"}
              color={"white"}
              _hover={{
                bg: "green.400",
              }}
              focus={{
                bg: "green.400",
              }}
              rightIcon={<AiOutlineCloudUpload />}
            >
              Upload Product
            </Button>
          </Box>
        </form>
      </VStack>
    </Center>
  );
};

export default UploadProduct;
