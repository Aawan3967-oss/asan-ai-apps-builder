export const CHECK_LIMITS = {
  FREE: { webBuilds: 2, appExports: 0 },
  BASIC: { webBuilds: 10, appExports: 2 },
  PRO: { webBuilds: 9999, appExports: 9999 },
};

export function canUserBuild(userPlan: string, currentBuildCount: number) {
  const limit = CHECK_LIMITS[userPlan as keyof typeof CHECK_LIMITS]?.webBuilds || 0;
  return currentBuildCount < limit;
}
