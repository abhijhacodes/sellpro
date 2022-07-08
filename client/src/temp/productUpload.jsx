import { useState } from "react";
import {
  Box,
  Heading,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { isAuthenticated } from "../../apiCalls/auth";
import { uploadProduct } from "../../apiCalls/products";
import toast from "react-hot-toast";

const Allcategories = [
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
    console.log(formData);
    setValues({ ...values, loading: true });
    uploadProduct(user._id, token, formData).then((data) => {
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
        toast.success(`${data.name} uploaded successfully`);
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  return (
    <Center h="100vh" w="95vw">
      <Box width="60%" spacing="16">
        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired>
            <FormLabel>Enter name: </FormLabel>
            <Input
              type="text"
              required
              value={name}
              name="name"
              onChange={handleChange("name")}
            />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Enter description: </FormLabel>
            <Input
              type="text"
              required
              value={description}
              name="description"
              onChange={handleChange("description")}
            />
          </FormControl>
          <FormControl id="photo" isRequired>
            <FormLabel>Choose photo: </FormLabel>
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </FormControl>
          <FormControl id="price" isRequired>
            <FormLabel>Enter price: </FormLabel>
            <Input
              width="200px"
              type="number"
              required
              value={price}
              name="price"
              onChange={handleChange("price")}
            />
          </FormControl>
          <Select
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
          >
            Upload Product
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default UploadProduct;

<Center h="100vh">
  <form>
    <span>Post photo</span>
    <div>
      <input
        onChange={handleChange("photo")}
        type="file"
        name="photo"
        accept="image"
        placeholder="choose a file"
      />
    </div>
    <div>
      <input
        onChange={handleChange("name")}
        name="name"
        placeholder="Name"
        value={name}
      />
    </div>
    <div>
      <textarea
        onChange={handleChange("description")}
        name="description"
        placeholder="Description"
        value={description}
      />
    </div>
    <div>
      <input
        onChange={handleChange("price")}
        type="number"
        name="price"
        placeholder="Price"
        value={price}
      />
    </div>
    <div>
      <select
        name="category"
        onChange={handleChange("category")}
        placeholder="Category"
      >
        <option>Select</option>
        {categories.map((cate, index) => (
          <option key={index} value={cate}>
            {cate}
          </option>
        ))}
      </select>
    </div>
    <button type="submit" onClick={handleSubmit}>
      Upload Product
    </button>
  </form>
</Center>;
