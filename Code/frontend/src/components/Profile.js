import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Select, IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { getProfile, saveProfile } from '../../firebase/auth';
import { useAuth } from '../contexts/authContext';

const Profile = ({ setActiveSection }) => {
  const { currentUser } = useAuth();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dietType, setDietType] = useState('');
  const [macros, setMacros] = useState([{ name: 'Carbs', value: '' }, { name: 'Protein', value: '' }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const data = await getProfile(currentUser.uid);
        if (data) {
          setAge(data.age || '');
          setGender(data.gender || '');
          setHeight(data.height || '');
          setWeight(data.weight || '');
          setDietType(data.dietType || '');
          setMacros(Array.isArray(data.macros) ? data.macros : [{ name: 'Carbs', value: '' }, { name: 'Protein', value: '' }]);
        }
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [currentUser]);

  const handleSave = async () => {
    if (currentUser) {
      await saveProfile(currentUser.uid, { age, gender, height, weight, dietType, macros });
      alert('Profile saved successfully!');
    }
  };

  const handleMacroChange = (index, field, value) => {
    const newMacros = [...macros];
    newMacros[index][field] = value;
    setMacros(newMacros);
  };

  const addMacroField = () => {
    setMacros([...macros, { name: '', value: '' }]);
  };

  const removeMacroField = (index) => {
    const newMacros = macros.filter((_, i) => i !== index);
    setMacros(newMacros);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={5}>
      <FormControl id="age">
        <FormLabel>Age</FormLabel>
        <Input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
        />
      </FormControl>
      <FormControl id="gender" mt={4}>
        <FormLabel>Gender</FormLabel>
        <Select value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Select gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </Select>
      </FormControl>
      <FormControl id="height" mt={4}>
        <FormLabel>Height</FormLabel>
        <Input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter your height"
        />
      </FormControl>
      <FormControl id="weight" mt={4}>
        <FormLabel>Weight</FormLabel>
        <Input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight"
        />
      </FormControl>
      <FormControl id="dietType" mt={4}>
        <FormLabel>Type of Diet</FormLabel>
        <Select value={dietType} onChange={(e) => setDietType(e.target.value)} placeholder="Select diet type">
          <option value="gym_diet">Gym Diet</option>
          <option value="keto_diet">Keto Diet</option>
          <option value="bulk_diet">Bulk Diet</option>
        </Select>
      </FormControl>
      <FormControl id="macros" mt={4}>
        <FormLabel>Macros</FormLabel>
        {macros.map((macro, index) => (
          <Stack key={index} direction="row" align="center" mt={2}>
            <Input
              type="text"
              value={macro.name}
              onChange={(e) => handleMacroChange(index, 'name', e.target.value)}
              placeholder="Macro name"
            />
            <Input
              type="text"
              value={macro.value}
              onChange={(e) => handleMacroChange(index, 'value', e.target.value)}
              placeholder="Macro value"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => removeMacroField(index)}
              aria-label="Remove macro"
            />
          </Stack>
        ))}
        <Button onClick={addMacroField} leftIcon={<AddIcon />} mt={2}>
          Add Macro
        </Button>
      </FormControl>
      <Stack spacing={10} mt={4}>
        <Button onClick={handleSave} colorScheme="teal">
          Save
        </Button>
        <Button onClick={() => setActiveSection("search")} colorScheme="gray">
          Skip
        </Button>
      </Stack>
    </Box>
  );
};

export default Profile;