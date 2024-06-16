CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"isCompleted" boolean,
	"note" text,
	CONSTRAINT "todos_name_unique" UNIQUE("name")
);
