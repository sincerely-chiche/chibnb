<template>
  <AppModal
    v-if="isOpen"
    :isOpen="isOpen"
    title="Airbnb your home"
    description=""
    @on-close="onClose"
  >
    <div v-if="step === steps.CATEGORY" class="flex flex-col gap-8">
      <AppHeading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      ></AppHeading>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto mt-4"
      >
        <div
          class="col-span-1"
          v-for="item in categoriesList"
          :key="item.label"
        >
          <RentCategory
            @click="category = item.label"
            :label="item.label"
            :icon="item.icon"
            :selected="category === item.label"
          ></RentCategory>
        </div>
      </div>
    </div>
    <div v-if="step === steps.LOCATION" class="flex flex-col gap-8">
      <AppHeading
        title="Where is your place located?"
        subtitle="Help guests find you 🔦"
      ></AppHeading>
      <ClientOnly>
        <VueSelect v-model="location" name="location" :options="countries">
          <template v-slot:option="country">
            <div class="flex items-center gap-3 text-lg"></div>
            <div>{{ country.flag }}</div>
            <div>
              {{ country.label }}
              <span class="text-neutral-500 ml-1">{{ country.region }}</span>
            </div>
          </template>
        </VueSelect>
      </ClientOnly>
      <ClientOnly>
        <RentMap :center="location?.latlng"></RentMap>
      </ClientOnly>
    </div>
    <div v-if="step === steps.INFO" class="flex flex-col gap-8">
      <AppHeading
        title="Share some basics about your place"
        subtitle="What amenities do you have?🚿"
      ></AppHeading>

      <RentCounter
        title="Guests"
        subtitle="How many guests do you allow?"
        :value="guestCount"
        @change="(val) => (guestCount = val)"
      ></RentCounter>
      <RentCounter
        title="Rooms"
        subtitle="How many rooms do you have?"
        :value="roomCount"
        @change="(val) => (roomCount = val)"
      ></RentCounter>
      <RentCounter
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
        :value="bathCount"
        @change="(val) => (bathCount = val)"
      ></RentCounter>
    </div>
    <div v-if="step === steps.IMAGES" class="flex flex-col gap-8">
      <AppHeading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!📸"
      ></AppHeading>
    </div>

    <div class="flex flex-col gap-2 py-6">
      <div class="flex items-center gap-4 w-full">
        <Button
          v-if="secondaryActionLabel"
          :disabled="isLoading"
          @click="onBack"
          variant="outline"
          type="button"
          class="flex-1"
          >{{ secondaryActionLabel }}</Button
        >
        <Button
          :disabled="isLoading"
          class="flex-1"
          type="button"
          @click="onNext"
          >{{ actionLabel }}</Button
        >
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { useToast } from "../ui/toast";
import VueSelect from "vue-select";
const { isOpen, onClose, countries, getByValue } = useRentModal();
const { toast } = useToast();
const isLoading = ref(false);
const steps = reactive({
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
});
const step = ref(steps.CATEGORY);
const category = ref(categoriesList[0].label);
const location = ref(null);
const guestCount = ref(1);
const roomCount = ref(1);
const bathCount = ref(1);
const actionLabel = computed(() => {
  if (step.value === steps.PRICE) {
    return "Create";
  }
  return "Next";
});
const secondaryActionLabel = computed(() => {
  if (step.value === steps.CATEGORY) {
    return undefined;
  }
  return "Back";
});

function onBack() {
  step.value = step.value - 1;
}
function onNext() {
  step.value = step.value + 1;
}

function toggleForm() {
  onClose();
  onOpen();
}

async function onSubmit() {
  try {
  } catch (error) {
    console.log(error);
    return toast({
      title: error.message.toString(),
      variant: "destructive",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>
<style>
@import "vue-select/dist/vue-select.css";

:root {
  --vs-dropdown-option--active-bg: #ffe4e6;
  --vs-dropdown-option--active-color: #000;
}

.vs__selected {
  @apply text-lg;
}

.vs__dropdown-menu {
  overflow-x: hidden;
}
</style>
<style lang="scss" scoped></style>
