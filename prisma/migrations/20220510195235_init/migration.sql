-- CreateTable
CREATE TABLE "missionCommander" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "mainStack" VARCHAR(255) NOT NULL,
    "currentEnrollment" BOOLEAN NOT NULL,
    "hasAzureCertification" BOOLEAN NOT NULL,

    CONSTRAINT "missionCommander_pkey" PRIMARY KEY ("id")
);
