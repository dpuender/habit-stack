CREATE TABLE `stack_status` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stack_id` integer NOT NULL,
	`status` integer NOT NULL,
	`date` text NOT NULL,
	FOREIGN KEY (`stack_id`) REFERENCES `stacks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `habit_status` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`habit_id` integer NOT NULL,
	`status` integer NOT NULL,
	`date` text NOT NULL,
	FOREIGN KEY (`habit_id`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stack_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	FOREIGN KEY (`stack_id`) REFERENCES `stacks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stacks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`trigger` text
);