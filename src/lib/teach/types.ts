import type { Board, Grade } from "@/lib/types";

/** A teacher account as stored on the server. The password is only kept as a salted scrypt hash. */
export type TeacherRecord = {
  id: string;
  username: string;
  name: string;
  board: Board;
  salt: string;
  hash: string;
  createdAt: string;
};

/** A class a teacher created. Students join it by typing its code on their Desk. */
export type ClassRecord = {
  code: string;
  teacherId: string;
  teacherName: string;
  name: string;
  grade: Grade;
  board: Board;
  createdAt: string;
};

export type DrawerFile = {
  name: string;
  type: string;
  size: number;
  /** The file is stored in this many chunks (see lib/teach/store.ts) */
  chunks: number;
};

/** Something a teacher put in a class Drawer: a note, a link, a file, a deadline, or any mix of these */
export type DrawerItem = {
  id: string;
  classCode: string;
  title: string;
  message: string;
  link: string | null;
  /** A due date as YYYY-MM-DD, or null */
  dueDate: string | null;
  file: DrawerFile | null;
  createdAt: string;
};

/** What a student sees about a class */
export type ClassSummary = Pick<ClassRecord, "code" | "name" | "grade" | "board" | "teacherName">;

/** What the browser is told about the signed-in teacher */
export type TeacherPublic = Pick<TeacherRecord, "username" | "name" | "board">;
