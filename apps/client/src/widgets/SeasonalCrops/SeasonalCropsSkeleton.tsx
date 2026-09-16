import { Box, Card, CardContent, CardFooter } from "@/shared/ui";

export function SeasonalCropsSkeleton() {
  return (
    <Box className="w-full pt-4 pb-0 animate-pulse">
      <Box className="flex items-end justify-between gap-4 mb-6">
        <Box className="space-y-2">
          <Box className="h-4 w-32 bg-muted/60 rounded-md" />
          <Box className="h-8 w-72 sm:w-96 bg-muted/80 rounded-lg" />
          <Box className="h-4 w-60 sm:w-80 bg-muted/40 rounded-md" />
        </Box>
        <Box className="hidden sm:flex gap-2">
          <Box className="h-9 w-9 bg-muted/60 rounded-lg" />
          <Box className="h-9 w-9 bg-muted/60 rounded-lg" />
        </Box>
      </Box>

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((idx) => (
          <Card key={idx} className="h-full flex flex-col rounded-2xl border border-border/70 overflow-hidden bg-card shadow-xs">
            <Box className="relative w-full aspect-16/10 bg-muted/50">
              <Box className="absolute top-3 left-3 h-5 w-24 bg-muted/80 rounded-full" />
            </Box>

            <CardContent className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
              <Box className="space-y-2">
                <Box className="h-6 w-3/4 bg-muted/80 rounded-md" />
                <Box className="h-4 w-full bg-muted/50 rounded-md" />
                <Box className="h-4 w-2/3 bg-muted/40 rounded-md" />
              </Box>

              <Box className="space-y-2 pt-3 border-t border-border/60">
                <Box className="flex justify-between">
                  <Box className="h-3.5 w-24 bg-muted/50 rounded" />
                  <Box className="h-3.5 w-16 bg-muted/60 rounded" />
                </Box>
                <Box className="flex justify-between">
                  <Box className="h-3.5 w-28 bg-muted/50 rounded" />
                  <Box className="h-3.5 w-20 bg-muted/60 rounded" />
                </Box>
                <Box className="flex justify-between">
                  <Box className="h-3.5 w-20 bg-muted/50 rounded" />
                  <Box className="h-3.5 w-24 bg-muted/60 rounded" />
                </Box>
              </Box>
            </CardContent>

            <CardFooter className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
              <Box className="w-full h-10 bg-muted/60 rounded-xl" />
            </CardFooter>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
