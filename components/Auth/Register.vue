<template>
  <AppModal
    v-if="isOpen"
    :isOpen="isOpen"
    title="Welcome to ChiBnb"
    description="Create your account!"
    @on-close="onClose"
  >
    <form @submit="onSubmit">
      <div>
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Display name..."
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription> </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Email address..."
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription> </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Your password..."
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription> </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="flex flex-col gap-2 py-6">
        <div class="flex flex-row items-center gap-4 w-full">
          <Button type="submit" :disabled="isLoading" class="w-full">
            <AppLoader v-if="isLoading" />
            <span v-else> Sign up </span>
          </Button>
        </div>
        <div class="flex flex-col gap-4 mt-3">
          <hr />
          <Button variant="outline">
            <a href="/login/github" class="flex items-center">
              <Icon name="mdi:github" class="w-6 h-6 mr-2" /> Continue with
              Github</a
            >
          </Button>

          <div class="text-center mt-4 font-medium" @click="toggleForm">
            <p>
              Already have an account?
              <span class="text-primary cursor-pointer hover:underline"
                >Login</span
              >
            </p>
          </div>
        </div>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "@/components/ui/toast";

const { isOpen, onClose, RegisterSchema } = useRegister();
const { onOpen } = useLogin();
const { toast } = useToast();
const isLoading = ref(false);

const formSchema = toTypedSchema(RegisterSchema);

const registerForm = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: "",
    email: "",
    password: "",
  },
});

const onSubmit = registerForm.handleSubmit(async (values) => {
  try {
    isLoading.value = true;

    const { message, code } = await $fetch("/api/auth/signup", {
      method: "POST",
      body: {
        ...values,
      },
    });

    if (code !== 200) {
      return toast({
        title: "Oops!",
        description: message,
        variant: "destructive",
      });
    } else {
      onClose();
      await navigateTo("/");
    }
  } catch (error) {
    console.log(error);
    return toast({
      title: error.message.toString(),
      variant: "destructive",
    });
  } finally {
    isLoading.value = false;
  }
});

function toggleForm() {
  onClose();
  onOpen();
}
</script>

<style lang="scss" scoped></style>
