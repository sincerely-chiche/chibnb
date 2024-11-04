<template>
  <div class="relative">
    <div class="flex flex-row items-center gap-3">
      <div
        class="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition-all cursor-pointer"
      >
        Airbnb your home
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            size="sm"
            class="p-4 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md hover:bg-transparent transition-all"
          >
            <Icon name="jam:menu" size="25" />
            <div class="hidden md:block">
              <img
                v-if="user && user.image"
                :src="user.image"
                :alt="user.name"
                class="w-6 h-6 rounded-full"
              />
              <Icon v-else name="radix-icons:avatar" class="w-6 h-6" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <template v-if="user">
            <DropdownMenuLabel>{{ user?.email }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-for="link in links"
              :key="link.path"
              @click="navigateTo(link.path)"
            >
              <span> {{ link.name }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="logout">
              <Icon name="solar:logout-3-bold" class="mr-2 h-4 w-4" />
              Logout</DropdownMenuItem
            >
          </template>
          <template v-else>
            <DropdownMenuItem @click="onOpen"
              ><span>Register</span></DropdownMenuItem
            >
            <DropdownMenuItem @click="loginOnOpen"
              ><span>Login</span></DropdownMenuItem
            >
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<script setup>
const user = useUser();
const { onOpen } = useRegister();
const { onOpen: loginOnOpen } = useLogin();

const links = [
  {
    name: "My trips",
    path: "/trips",
  },
  {
    name: "Reservations",
    path: "/reservations",
  },
  {
    name: "My favorites",
    path: "/favorites",
  },
  {
    name: "My properties",
    path: "/properties",
  },
];

async function logout() {
  try {
    await $fetch("/api/auth/logout", {
      method: "POST",
    });
    user.value = null;
    await navigateTo("/login");
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped></style>
