import { Ad, ComingSoon, NavigationContainer } from "@/components";

export default async function Page() {
  return <NavigationContainer segments={[]} last=''>
    <Ad>
      <ComingSoon />
    </Ad>
  </NavigationContainer>
}