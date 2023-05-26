-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "project_cost_key" ON "project"("cost");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;
