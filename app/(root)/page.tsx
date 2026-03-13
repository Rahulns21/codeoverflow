import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";

const Home = async () => {
  const session = await auth();

  console.log(session);

  return (
    <>
      <form className="px-10 pt-25" action={async () => {
        "use server";

        await signOut({redirectTo: ROUTES.SIGN_IN });
      }}>
        <Button className="cursor-pointer" type="submit">Logout</Button>
      </form>
    </>
  );
};

export default Home;
