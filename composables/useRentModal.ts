import countries from 'world-countries';
const state = reactive({
  isOpen: false,
  formattedCountries: countries.map(country => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  }))
})



export const useRentModal = () => {

  const { isOpen, formattedCountries } = toRefs(state);


  const onOpen = () => {
    state.isOpen = true;
  }

  const onClose = () => {
    state.isOpen = false;
  }

  const getByValue = (value: string) => {
    return formattedCountries.value.find(item => item.value === value)
  }

  return {
    isOpen,
    onOpen,
    onClose,
    getByValue,
    countries: formattedCountries
  }
}
