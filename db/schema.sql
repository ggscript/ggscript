`CREATE TABLE IF NOT EXISTS "users" (
 "user_id" serial NOT NULL,
 "username" VARCHAR(50) NOT NULL UNIQUE,
 "display_name" VARCHAR(50) NOT NULL UNIQUE,
 "curr_level" REFERENCES "level_data",
 "points" integer NOT NULL,
 "pic" TEXT,
 "status_title" REFERRNCES "title_points",
 CONSTRAINT users_pk PRIMARY KEY ("user_id")
)

CREATE TABLE IF NOT EXISTS "level_data" (
 "level_name" VARCHAR(255) NOT NULL,
 "prompt" VARCHAR(255) NOT NULL,
 "description" VARCHAR(5000) NOT NULL,
 "hint_1" VARCHAR(255) NOT NULL,
 "hint_2" VARCHAR(255) NOT NULL,
 "hint_3" VARCHAR(255) NOT NULL,
 "level_number" serial NOT NULL,
 "heroic_level_code" VARCHAR(2550) NOT NULL,
 "mythic_level_code" VARCHAR(2550) NOT NULL,
 "heroic_level_code" VARCHAR(25500) NOT NULL,
 CONSTRAINT level_data_pk PRIMARY KEY ("level_number")
)

CREATE TABLE IF NOT EXISTS "games" (
 "game_id" serial NOT NULL,
 "user_id" REFERENCES "users",
 "game_code" TEXT NOT NULL,
 CONSTRAINT games_pk PRIMARY KEY ("game_id")
)

CREATE TABLE IF NOT EXISTS "template" (
 "id" serial NOT NULL,
 "template_code" TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS "title_points" (
 "id" serial NOT NULL,
 "points" VARCHAR(255) NOT NULL,
 "title" VARCHAR(255) NOT NULL,
 CONSTRAINT title_points_pk PRIMARY KEY ("id")
)`
