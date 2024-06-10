import { useAuth, useSession } from "@clerk/clerk-react";

export const CurrentUser = async () => {
  try {
    const { userId } = useAuth();
    const session = useSession();

    if (!userId || !session) {
      return null;
    }

    return { userId, session };
  } catch (error) {
    console.log(error);
  }
};
