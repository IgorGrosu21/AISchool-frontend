"use server";

import { IPersonProfile } from "@/interfaces";
import { Students } from "@/components";

interface ParentProfileProps {
  profile: IPersonProfile & { profileType: "parent" };
}

export async function ParentProfile({ profile }: ParentProfileProps) {
  return <Students students={profile.students} />;
}
