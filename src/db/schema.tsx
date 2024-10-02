import { pgTable, serial, varchar, integer, timestamp, text } from "drizzle-orm/pg-core";

export const utUploads = pgTable("ut_uploads", {
  userId: text("user_id").notNull(),
  fileId: text("file_id").primaryKey(),
  fileUrl: text("file_url").notNull(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  uploadDate: timestamp("upload_date").defaultNow().notNull(),
});

