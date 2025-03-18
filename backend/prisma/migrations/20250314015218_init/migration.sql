-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authority" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Authority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuthority" (
    "userId" INTEGER NOT NULL,
    "authorityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "UserAuthority_pkey" PRIMARY KEY ("userId","authorityId")
);

-- CreateTable
CREATE TABLE "RoleAuthority" (
    "roleId" INTEGER NOT NULL,
    "authorityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "RoleAuthority_pkey" PRIMARY KEY ("roleId","authorityId")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateIndex
CREATE INDEX "Account_providerId_idx" ON "Account"("providerId");

-- CreateIndex
CREATE INDEX "Account_provider_idx" ON "Account"("provider");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Authority_name_key" ON "Authority"("name");

-- CreateIndex
CREATE INDEX "Authority_name_idx" ON "Authority"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Role_name_idx" ON "Role"("name");

-- CreateIndex
CREATE INDEX "UserAuthority_authorityId_idx" ON "UserAuthority"("authorityId");

-- CreateIndex
CREATE INDEX "UserAuthority_userId_idx" ON "UserAuthority"("userId");

-- CreateIndex
CREATE INDEX "RoleAuthority_authorityId_idx" ON "RoleAuthority"("authorityId");

-- CreateIndex
CREATE INDEX "RoleAuthority_roleId_idx" ON "RoleAuthority"("roleId");

-- CreateIndex
CREATE INDEX "UserRole_roleId_idx" ON "UserRole"("roleId");

-- CreateIndex
CREATE INDEX "UserRole_userId_idx" ON "UserRole"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAuthority" ADD CONSTRAINT "UserAuthority_authorityId_fkey" FOREIGN KEY ("authorityId") REFERENCES "Authority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAuthority" ADD CONSTRAINT "UserAuthority_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RoleAuthority" ADD CONSTRAINT "RoleAuthority_authorityId_fkey" FOREIGN KEY ("authorityId") REFERENCES "Authority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RoleAuthority" ADD CONSTRAINT "RoleAuthority_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
