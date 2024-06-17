CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(400) NOT NULL,
	"googleId" varchar(500),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
