import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Input,
  Textarea,
  ModalFooter,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputRightAddon,
  Image,
  Select,
} from '@chakra-ui/react';
import { ProductService } from '../../services';
import Swal from 'sweetalert2';

const AddProduct = ({ isOpen, onClose, setIsRefresh, isRefresh }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [weight, setWeight] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');

  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState(1);

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = categoryList.find(
      (option) => option.id === parseInt(selectedValue)
    );
    setCategory(selectedOption?.id);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getCategoryList()
      .then((data) => {
        setCategoryList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(categoryList, 'CATEGORY');

  const saveProduct = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('weight', weight);
    formData.append('categoryId', category);
    try {
      await axios.post('http://localhost:5000/products', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setIsRefresh(!isRefresh);
      onHandleClose();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Berhasil menamambahkan product baru',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleClose = () => {
    onClose();
    setPreview('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onHandleClose}>


      <ModalContent maxHeight={"xl"} overflow="auto">
        <ModalHeader>Tambah Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              placeholder="Product Name"
              size="md"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </FormControl>

          <FormControl isRequired mt={2}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="Description"
            />
          </FormControl>

          <FormControl isRequired mt={2}>
            <FormLabel>Price</FormLabel>
            <NumberInput min={1} onChange={(e) => setPrice(e)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isRequired mt={2}>
            <FormLabel>Stock</FormLabel>
            <NumberInput value={stock} min={1} onChange={(e) => setStock(e)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isRequired mt={2}>
            <FormLabel>Weight</FormLabel>
            <InputGroup>
              <Input
                type={'number'}
                placeholder="Weight"
                onChange={(e) => setWeight(e.currentTarget.value)}
                value={weight}
              />
              <InputRightAddon children="Gram" />
            </InputGroup>
          </FormControl>

          <FormControl isRequired mt={2}>
            <FormLabel>Category</FormLabel>
            <Select onChange={handleSelect} value={category}>
              {categoryList?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired mt={2}>
            <FormLabel>Image</FormLabel>
            <Input type={'file'} onChange={loadImage} />
          </FormControl>

          {preview ? <Image src={preview} alt="PreviewImage" /> : ''}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => saveProduct()}>
            Tambah
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProduct;
