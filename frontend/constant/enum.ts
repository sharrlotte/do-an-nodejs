export const userRoles = ['ADMIN', 'USER', 'EMPLOYEE', 'CANDIDATE', 'RECRUITER'] as const;

export type UserRole = (typeof userRoles)[number];
