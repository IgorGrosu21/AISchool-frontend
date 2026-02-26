import { SectionHeader, Card } from "@/ui";
import { WithMotion } from "../withMotion";
import { useTranslations } from "next-intl";

//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";

interface ContentProps {
  type: string;
  itemsLength: number;
  applyNumbering?: boolean;
}

export function Content({
  type,
  itemsLength,
  applyNumbering = false,
}: ContentProps) {
  const t = useTranslations(`animated_pages.help.${type}`);

  return (
    <WithMotion>
      <Stack
        gap={8}
        sx={{ py: 16, maxWidth: "lg", mx: "auto", minHeight: "85vh" }}
      >
        <SectionHeader text1={t("title")} text2={t("subtitle")} />
        <Grid2 container spacing={4}>
          {Array.from({ length: itemsLength }).map((_, index) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={index}>
              <Card index={index}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {applyNumbering
                    ? `${index + 1}. ${t(`items.${index + 1}.title`)}`
                    : t(`items.${index + 1}.title`)}
                </Typography>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </WithMotion>
  );
}
