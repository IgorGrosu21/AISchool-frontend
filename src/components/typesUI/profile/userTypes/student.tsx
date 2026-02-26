"use server";

import { IPersonProfile } from "@/interfaces";
import { KlassLink } from "@/components";

//mui components
import Stack from "@mui/material/Stack";

interface StudentProfileProps {
  profile: IPersonProfile & { profileType: "student" };
}

export async function StudentProfile({ profile }: StudentProfileProps) {
  return <>
    {profile.klass && <Stack direction="row" sx={{ justifyContent: "center" }}>
      <KlassLink
        hrefTemplate={`/core/schools/${profile.klass.schoolSlug}/klasses`}
        klass={profile.klass}
        big
      />
    </Stack>}
  </>
}
