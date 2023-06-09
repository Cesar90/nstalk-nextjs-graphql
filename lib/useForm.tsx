import { useEffect, useState } from 'react';


export default function useForm<T>(initial:T) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState<T>(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  // {
  //   name: 'wes',
  //   description: 'nice shoes',
  //   price: 1000
  // }

  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { value, name, type } = event.target;
    if(event.target instanceof HTMLInputElement){
      if(event.target.files && type === 'file'){
        setInputs({
          ...inputs,
          [name]: event.target.files[0],
        });
      }
    }

    if(type === 'number'){
      setInputs({
        ...inputs,
        [name]: parseInt(value),
      });
    }

    if(type === 'password' || type === 'email'){
      setInputs({
        ...inputs,
        [name]: value,
      });
    }

    if(type === 'text' || event.target instanceof HTMLTextAreaElement){
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // const blankState = Object.fromEntries(
    //   Object.entries(inputs).map(([key, value]) => [key, ''])
    // );
    setInputs(initial);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}